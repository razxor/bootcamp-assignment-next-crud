'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AddProduct({ onCancel, onProductAdded }) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://crud.teamrabbil.com/api/v1/CreateProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Failed to add product: ${response.status}`);
            }

            const result = await response.json();
            toast.success('Product added successfully');
            onProductAdded(data)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="Img" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        id="Img"
                        type="text"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('Img', { required: 'Image URL is required' })}
                    />
                    {errors.Img && <p className="text-red-500 text-sm mt-1">{errors.Img.message}</p>}
                </div>

                <div>
                    <label htmlFor="ProductCode" className="block text-sm font-medium text-gray-700">Product Code</label>
                    <input
                        id="ProductCode"
                        type="text"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('ProductCode', { required: 'Product Code is required' })}
                    />
                    {errors.ProductCode && <p className="text-red-500 text-sm mt-1">{errors.ProductCode.message}</p>}
                </div>

                <div>
                    <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        id="ProductName"
                        type="text"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('ProductName', { required: 'Product Name is required' })}
                    />
                    {errors.ProductName && <p className="text-red-500 text-sm mt-1">{errors.ProductName.message}</p>}
                </div>

                <div>
                    <label htmlFor="Qty" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        id="Qty"
                        type="number"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('Qty', {
                            required: 'Quantity is required',
                            valueAsNumber: true,
                        })}
                    />
                    {errors.Qty && <p className="text-red-500 text-sm mt-1">{errors.Qty.message}</p>}
                </div>

                <div>
                    <label htmlFor="TotalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
                    <input
                        id="TotalPrice"
                        type="number"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('TotalPrice', {
                            required: 'Total Price is required',
                            valueAsNumber: true,
                        })}
                    />
                    {errors.TotalPrice && <p className="text-red-500 text-sm mt-1">{errors.TotalPrice.message}</p>}
                </div>

                <div>
                    <label htmlFor="UnitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <input
                        id="UnitPrice"
                        type="number"
                        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('UnitPrice', {
                            required: 'Unit Price is required',
                            valueAsNumber: true,
                        })}
                    />
                    {errors.UnitPrice && <p className="text-red-500 text-sm mt-1">{errors.UnitPrice.message}</p>}
                </div>

                <div className="flex justify-between space-x-4">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}
