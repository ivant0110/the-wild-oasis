import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// mutationFn: (id) => deleteCabinApi(id),
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success('Cabin successfully deleted');
			queryClient.invalidateQueries({
				queyKey: ['cabins'],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}

export { useDeleteCabin };
