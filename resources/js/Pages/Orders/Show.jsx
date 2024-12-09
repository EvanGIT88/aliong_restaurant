import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Order({ order }) {
    console.log(order);

    if (!order) {
        return <p>No order found.</p>;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Orders
                </h2>
            }
        >
            <Head title={`Order #${order.id}`} />
            <div className="p-6 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">
                    Order # {order.id} - Status: {order.status}
                </h3>
                <p>Customer: {order.user.name}</p>
                <p>Total Price: Rp {order.total_price}</p>
                <h5 className="mt-3 font-semibold">Order Items:</h5>
                <ul className="mt-2 space-y-2">
                    {order.order_items.map((item) => (
                        <li
                            key={item.id}
                            className="p-3 border rounded bg-gray-50"
                        >
                            <p>Name: {item.menu_item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rp {item.price}</p>
                            <p>Description: {item.menu_item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
