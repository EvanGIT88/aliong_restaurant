import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show() {
    const { menuItem } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Menu Item
                </h2>
            }
        >
            <Head title={menuItem.name} />
            <Link href={route("menu-items.index")} className='text-white bg-orange-500 p-5 rounded-md hover:bg-orange-700'>Back</Link>
            <div className="p-4 bg-white shadow rounded-md">
                <h3 className="text-2xl font-bold mb-4">{menuItem.name}</h3>
                <p className="mb-2">
                    <strong>ID:</strong> {menuItem.id} {/* Display the ID */}
                </p>
                <p className="mb-2">
                    <strong>Description:</strong> {menuItem.description}
                </p>
                <p className="mb-2">
                    <strong>Price:</strong> Rp {menuItem.price}
                </p>
                <p>
                    <strong>Available Stock:</strong> {menuItem.available_stock}
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
