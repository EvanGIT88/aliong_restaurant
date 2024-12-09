import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function MenuItem() {
    const { menuItems, Success } = usePage().props; // Ensure correct prop names

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu Items
                </h2>
            }
        >
            <Head title="Menu Items" />
            {Success && (<Message message={Success}></Message>)}
            <Link
                href={route('menu-items.create')}
                className="text-white bg-green-500 p-5 rounded-md hover:bg-green-700"
            >
                Create
            </Link>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className="p-4 border rounded-md shadow-sm bg-white"
                    >
                        <span>{item.name} - Rp {item.price}</span>
                        <div className="mt-2 space-x-2">
                            <Link
                                href={route('menu-items.show', item.id)}
                                className="text-green-500 hover:underline"
                            >
                                View Details
                            </Link>
                            <Link
                                href={route('menu-items.edit', item.id)} // Navigate to edit route
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('menu-items.destroy', item.id)}
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

        </AuthenticatedLayout>
    );
}
