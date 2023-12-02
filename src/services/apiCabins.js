import supabase, { supabaseUrl } from './supabase';

///////////////////////
// GET CABINS
async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

///////////////////////
// CREATE / EDIT CABIN
async function createEditCabin(newCabin, id) {
	console.log(newCabin, id);
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/Edit Cabin
	let query = supabase.from('cabins');

	// a) Create cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// b) Edit cabin
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be created');
	}

	// 2. Upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// 3. Delete the cabin if there was an error uploading image

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

///////////////////////
// DELETE CABIN
async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be deleted');
	}
}

export { getCabins, createEditCabin, deleteCabin };
