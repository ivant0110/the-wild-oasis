import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		// mutationFn: (id) => deleteCabinApi(id),
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			toast.success('Booking successfully deleted');
			queryClient.invalidateQueries({
				queyKey: ['bookings'],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}

export { useDeleteBooking };
