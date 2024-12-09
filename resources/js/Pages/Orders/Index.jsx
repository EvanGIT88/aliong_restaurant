import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Message from '@/Components/Message';

export default function OrdersIndex({ orders, success, authUser }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Orders
                </h2>
            }
        >
            <Head title="Create Orders" />
            {success && (<Message message={success}></Message>)}
            <Link
                href={route('menu.pick')}
                className="text-white bg-green-500 p-5 rounded-md hover:bg-green-700"
            >
                Create
            </Link>
            <Head title="Orders" />
            <ul className='space-y-2'>
                {orders.map((order) => (
                    <li key={order.id} className="p-4 border rounded-md shadow-sm bg-white">
                        <span>{order.user ? order.user.name : 'N/A'} - Rp {order.total_price} - {order.status}</span>
                        <div className="mt-2 space-x-2">
                            <Link
                                href={route('orders.show', order.id)}
                                className="text-green-500 hover:underline"
                            >
                                View Details
                            </Link>
                            {authUser.role !== 'customer' && (
                                <>
                                    <Link
                                        href={route('orders.edit', order.id)} // Navigate to edit route
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('orders.destroy', order.id)}
                                        method="delete" // Specify the HTTP method
                                        as="button"     // Treat the link as a button
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </Link>
                                </>
                            )}
                        </div>

                    </li>
                ))}
            </ul>
        </AuthenticatedLayout >
    );
}
