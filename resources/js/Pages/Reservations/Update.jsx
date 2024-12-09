import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ReservationCreate({ reservation, users }) {
    const { data, setData, put, errors } = useForm({
        user_id: reservation.user_id,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time.slice(0, 5),
        number_of_guests: reservation.number_of_guests
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('reservations.update', reservation.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Reservation
                </h2>
            }
        >
            <Head title="Create Reservation" />
            <Link href={route("reservations.index")} className='text-white bg-orange-500 p-5 rounded-md hover:bg-orange-700'>Back</Link>
            <div className="p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">User</label>
                        <select
                            className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm w-full"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && (
                            <span className="text-red-500 text-sm">{errors.user_id}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm w-full"
                            value={data.reservation_date}
                            onChange={(e) => setData('reservation_date', e.target.value)}
                        />
                        {errors.reservation_date && (
                            <span className="text-red-500 text-sm">{errors.reservation_date}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <input
                            type="time"
                            className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm w-full"
                            value={data.reservation_time}
                            onChange={(e) => setData('reservation_time', e.target.value)}
                        />
                        {errors.reservation_time && (
                            <span className="text-red-500 text-sm">{errors.reservation_time}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Number of Guests</label>
                        <input
                            type="number"
                            className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm w-full"
                            value={data.number_of_guests}
                            onChange={(e) => setData('number_of_guests', e.target.value)}
                        />
                        {errors.number_of_guests && (
                            <span className="text-red-500 text-sm">{errors.number_of_guests}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create Reservation
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
