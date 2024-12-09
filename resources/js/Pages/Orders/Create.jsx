import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Orders({ authUser, users }) {
    const [orders, setOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data, setData, post } = useForm({
        user_id: authUser.id, // Default to the current user's ID
        status: 'pending',
        total_price: 0,
        orders: [],
    });

    // Load orders from local storage on mount
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);

        // Calculate total price
        const total = storedOrders.reduce((sum, order) => sum + parseFloat(order.price), 0);
        setData({
            ...data,
            total_price: total.toFixed(2),
            orders: storedOrders,
        });
    }, []);

    const handleDeleteOrder = (menuId) => {
        const updatedOrders = orders.filter((order) => order.menu_id !== menuId);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        const total = updatedOrders.reduce((sum, order) => sum + parseFloat(order.price), 0);
        setData({ ...data, total_price: total.toFixed(2), orders: updatedOrders });
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setShowForm(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedOrders = orders.map((order) =>
            order.menu_id === selectedOrder.menu_id ? selectedOrder : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        const total = updatedOrders.reduce((sum, order) => sum + parseFloat(order.price), 0);
        setData({ ...data, total_price: total.toFixed(2), orders: updatedOrders });
        setShowForm(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (orders.length === 0) {
            return;
        }
        console.log(data);
        post(route('orders.store'), {
            onSuccess: () => {
                // Clear local storage and reset orders
                localStorage.removeItem('orders');
                setOrders([]);
            },
            onError: (errorResponse) => {
                console.log("Validation errors:", errorResponse);
            },
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Orders
                </h2>
            }
        >
            <Head title="Manage Orders" />
            <Link
                href={route('menu.pick')}
                className="text-white bg-orange-500 p-5 rounded-md hover:bg-orange-700"
            >
                Back
            </Link>
            <div className="p-6 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">Orders</h3>
                <ul className="mt-4 space-y-2">
                    {orders.map((order) => (
                        <li
                            key={order.menu_id}
                            className="p-4 border rounded-md shadow-sm bg-gray-100 flex justify-between items-center"
                        >
                            <div className='flex flex-row space-x-3'>
                                <p>Name: {order.name}</p>
                                <p>Quantity: {order.quantity}</p>
                                <p>Price: {order.price}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEditOrder(order)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteOrder(order.menu_id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Edit Form */}
                {showForm && selectedOrder && (
                    <div className="mt-6 p-4 border rounded-md shadow-sm bg-gray-50">
                        <h4 className="text-lg font-semibold">Edit Order</h4>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    value={selectedOrder.quantity}
                                    onChange={(e) =>
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            quantity: e.target.value,
                                            price: (e.target.value * selectedOrder.price / selectedOrder.quantity).toFixed(2),
                                        })
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    type="text"
                                    value={selectedOrder.price}
                                    readOnly
                                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Submit Form */}
                <div className="mt-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">User</label>

                            {authUser.role === 'customer' ? (
                                // Read-only input for customers
                                <input
                                    type="text"
                                    value={authUser.id}
                                    readOnly
                                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
                                />
                            ) : (
                                // Select input for admins
                                <select
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value={authUser.id}>Yourself (Admin)</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Total Price</label>
                            <input
                                type="text"
                                value={data.total_price}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={orders.length === 0}
                                className={`px-4 py-2 rounded-md text-white ${orders.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
                                    }`}
                            >
                                Submit Orders
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
