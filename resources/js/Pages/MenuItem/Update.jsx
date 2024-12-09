import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Edit() {
    const { menuItem } = usePage().props;
    // Use Inertia's useForm hook to manage form state
    const { data, setData, put, errors } = useForm({
        name: menuItem.name || '',
        description: menuItem.description || '',
        price: menuItem.price || '',
        available_stock: menuItem.available_stock || '',
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('menu-items.update', menuItem.id)); // Send PUT request to the update route
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Menu Item
                </h2>
            }
        >
            <Head title="Edit Menu Item" />
            <Link href={route("menu-items.index")} className='text-white bg-orange-500 p-5 rounded-md hover:bg-orange-700'>Back</Link>
            <div className="p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.description && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Price Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            step="500"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.price && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    {/* Available Stock Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Available Stock
                        </label>
                        <input
                            type="number"
                            value={data.available_stock}
                            onChange={(e) => setData('available_stock', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.available_stock && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.available_stock}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
