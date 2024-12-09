import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Menu({ menuItems }) {
    const [showForm, setShowForm] = useState(false); // Toggle form visibility
    const [selectedItem, setSelectedItem] = useState(null); // Track selected menu item

    const { data, setData, reset } = useForm({
        menu_id: '',
        name: '',
        quantity: '',
        price: '',
    });

    const handleOrderClick = (item) => {
        setSelectedItem(item);
        setData({
            menu_id: item.id,
            name: item.name,
            quantity: 0,
            price: '', // Start with empty price
        });
        setShowForm(true);
    };

    const handleQuantityChange = (quantity) => {
        const totalPrice = quantity * selectedItem.price;
        setData({
            ...data,
            quantity,
            price: totalPrice.toFixed(2), // Ensure price is formatted to 2 decimals
        });
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();

        // Get existing orders from local storage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

        // Check if an order with the same menu_id already exists
        const existingOrderIndex = existingOrders.findIndex(
            (order) => order.menu_id === data.menu_id
        );

        if (existingOrderIndex !== -1) {
            // Update the existing order
            existingOrders[existingOrderIndex].quantity = data.quantity;
            existingOrders[existingOrderIndex].price = data.price;
        } else {
            // Add a new order
            const order = {
                menu_id: data.menu_id,
                name: data.name,
                quantity: data.quantity,
                price: data.price,
            };
            existingOrders.push(order);
        }

        // Save back to local storage
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // Reset and hide form
        reset();
        setShowForm(false);
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Orders
                </h2>
            }
        >
            <Head title={`Create Orders`} />
            <div className='flex flex-row space-x-3'>
                <Link
                    href={route('orders.index')}
                    className="text-white bg-orange-500 px-10 py-5 rounded-md hover:bg-orange-700"
                >
                    Back
                </Link>
                <Link
                    href={route('orders.create')}
                    className="text-white bg-green-500 px-10 py-5 rounded-md hover:bg-green-700"
                >
                    See Order
                </Link>
            </div>
            <div className="p-6 bg-white rounded shadow">
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Available Menu Items</h3>
                    <ul className="mt-4 space-y-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                className="p-4 border rounded-md shadow-sm bg-white"
                            >
                                <span>
                                    {item.name} - Rp {item.price}
                                </span>
                                <div className="mt-2 space-x-2">
                                    <Link
                                        href={route('menu-items.show', item.id)}
                                        className="text-green-500 hover:underline"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleOrderClick(item)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Add
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Order Form */}
                {showForm && selectedItem && (
                    <div className="mt-6 p-4 border rounded-md shadow-sm bg-gray-50">
                        <h4 className="text-lg font-semibold text-gray-800">Place Order</h4>
                        <form onSubmit={handleOrderSubmit}>
                            {/* Menu ID Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Menu ID
                                </label>
                                <input
                                    type="text"
                                    value={data.menu_id}
                                    readOnly
                                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100 shadow-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Menu name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    readOnly
                                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100 shadow-sm"
                                />
                            </div>

                            {/* Quantity Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    min="1"
                                    max="100"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Total Price Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Total Price
                                </label>
                                <input
                                    type="text"
                                    value={data.price}
                                    readOnly
                                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100 shadow-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    type="button"
                                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:ring focus:ring-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
