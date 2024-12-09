import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';


export default function ReservationIndex() {
    const { reservations, Success } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Reservations
                </h2>
            }
        >
            <Head title="Reservations" />
            {Success && (
                <Message message={Success}></Message>
            )
            }

            <Link
                href={route('reservations.create')}
                className="text-white bg-green-500 p-5 rounded-md hover:bg-green-700"
            >
                Create New Reservation
            </Link>

            <ul className="space-y-2">
                {reservations.map((reservation) => (
                    <li
                        key={reservation.id}
                        className="p-4 border rounded-md shadow-sm bg-white"
                    >
                        <span>{reservation.user.name} / {reservation.reservation_date}</span>
                        <div className="mt-2 space-x-2">
                            <Link
                                href={route('reservations.show', reservation.id)}
                                className="text-green-500 hover:underline"
                            >
                                View Details
                            </Link>
                            <Link
                                href={route('reservations.edit', reservation.id)} // Navigate to edit route
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('reservations.destroy', reservation.id)}
                                method="delete" // Specify the HTTP method
                                as="button"     // Treat the link as a button
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout >
    );
}
