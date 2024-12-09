import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';


export default function Show() {
    const { reservation } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Reservation
                </h2>
            }
        >
            <Head title={`${reservation.user.name}'s Reservation`} />
            <Link href={route("reservations.index")} className='text-white bg-orange-500 p-5 rounded-md hover:bg-orange-700'>Back</Link>
            <div className="p-4 bg-white shadow rounded-md">
                <h3 className="text-2xl font-bold mb-4">{`${reservation.user.name}'s Reservation`}</h3>
                <p className="mb-2">
                    <strong>ID / User ID:</strong> {`${reservation.id} / ${reservation.user_id}`} {/* Display the ID */}
                </p>
                <p className="mb-2">
                    <strong>Date:</strong> {reservation.reservation_date}
                </p>
                <p className="mb-2">
                    <strong>Time:</strong> {reservation.reservation_time}
                </p>
                <p>
                    <strong>Guests:</strong> {reservation.number_of_guests}
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
