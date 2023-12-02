import supabase from './supabase';

async function getSettings() {
	const { data, error } = await supabase.from('settings').select('*').single();

	if (error) {
		console.error(error);
		throw new Error('Settings could not be loaded');
	}
	return data;
}

// We expect a newSetting object that looks like {setting: newValue}
async function updateSetting(newSetting) {
	const { data, error } = await supabase
		.from('settings')
		.update(newSetting)
		.eq('id', 1)
		.single();
	// There is only ONE row of settings, and it has the ID=1, and so this is the updated one

	if (error) {
		console.error(error);
		throw new Error('Settings could not be updated');
	}
	return data;
}

export { getSettings, updateSetting };
