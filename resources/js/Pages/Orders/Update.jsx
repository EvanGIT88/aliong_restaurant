import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Order({ order, menuItems }) {
    const { data, setData, put, errors } = useForm({
        user_id: order.user.id,
        status: order.status,
        total_price: order.total_price,
        order_items: order.order_items.map((item) => ({
            id: item.id,
            menu_item_id: item.menu_item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.menu_item.name
        })),
    });

    const [newOrderItems, setNewOrderItems] = useState([]);

    const addMenuItem = (menuItemId) => {
        setNewOrderItems([
            ...newOrderItems,
            { menu_item_id: menuItemId, quantity: 1, price: 0 },
        ]);
    };

    const updateNewItem = (index, key, value) => {
        const updatedItems = [...newOrderItems];
        updatedItems[index][key] = value;
        setNewOrderItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('order_items', [...data.order_items, ...newOrderItems]);
        put(route('orders.update', order.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Order
                </h2>
            }
        >
            <Head title={`Edit Order #${order.id}`} />
            <div className="p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData({ ...data, status: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Total Price</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
                            value={data.total_price}
                            onChange={(e) => setData('total_price', e.target.value)}
                            readOnly
                        />
                    </div>
                    <h5 className="mt-4 font-semibold">Order Items:</h5>
                    <ul className="mt-2 space-y-2">
                        {data.order_items.map((item, index) => (
                            <li key={item.id} className="p-3 border rounded bg-gray-50">
                                <p>Menu Item: {item.menu_item_id}</p>
                                <p>Menu Name: {item.name}</p>
                                <div className="mt-2">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 border rounded"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            setData('order_items', [
                                                ...data.order_items.slice(0, index),
                                                { ...item, quantity: e.target.value },
                                                ...data.order_items.slice(index + 1),
                                            ])
                                        }
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 border rounded"
                                        value={item.price}
                                        onChange={(e) =>
                                            setData('order_items', [
                                                ...data.order_items.slice(0, index),
                                                { ...item, price: e.target.value },
                                                ...data.order_items.slice(index + 1),
                                            ])
                                        }
                                    />
                                </div>
                            </li>
                        ))}
                        {newOrderItems.map((item, index) => (
                            <li key={`new-${index}`} className="p-3 border rounded bg-green-50">
                                <p>New Menu Item: {item.menu_item_id}</p>
                                <div className="mt-2">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 border rounded"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateNewItem(index, 'quantity', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 border rounded"
                                        value={item.price}
                                        onChange={(e) =>
                                            updateNewItem(index, 'price', e.target.value)
                                        }
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h5 className="mt-4 font-semibold">Add Menu Items:</h5>
                    <ul className="mt-2 space-y-2">
                        {menuItems.map((menuItem) => (
                            <li
                                key={menuItem.id}
                                className="p-3 border rounded bg-gray-100 flex justify-between"
                            >
                                <span>{menuItem.name}</span>
                                <button
                                    type="button"
                                    className="px-2 py-1 text-white bg-blue-500 rounded"
                                    onClick={() => addMenuItem(menuItem.id)}
                                >
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="submit"
                        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
