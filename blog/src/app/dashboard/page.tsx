'use client';

import { useEffect, useState } from 'react';
import { databases, account, appwriteConfig } from '@/lib/appwrite';
import { Models, Query } from 'appwrite';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
    const [blogs, setBlogs] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
                const response = await databases.listDocuments(
                    appwriteConfig.databaseId,
                    appwriteConfig.collectionId,
                    [
                        Query.equal('authorId', user.$id),
                        Query.orderDesc('$createdAt') // Added minimal ordering
                    ]
                );
                setBlogs(response.documents);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            try {
                await databases.deleteDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.collectionId,
                    id
                );
                setBlogs(blogs.filter((blog) => blog.$id !== id));
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Failed to delete blog');
            }
        }
    };

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        try {
            const updated = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collectionId,
                id,
                {
                    isPublished: !currentStatus
                }
            );
            setBlogs(blogs.map(blog => blog.$id === id ? updated : blog));
        } catch (error) {
            console.error("Error toggling publish status", error);
        }
    }

    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <Link
                        href="/dashboard/create"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                        Create New Blog
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="bg-white dark:bg-zinc-900 shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                            {blogs.map((blog) => (
                                <li key={blog.$id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xl font-medium text-indigo-600 truncate">{blog.title}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {blog.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    {blog.views || 0} views
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm sm:mt-0 space-x-4">
                                                <button
                                                    onClick={() => handleTogglePublish(blog.$id, blog.isPublished)}
                                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                                >
                                                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                                                </button>
                                                <Link
                                                    href={`/dashboard/create?id=${blog.$id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.$id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">
                        You haven't created any blogs yet.
                    </p>
                )}
            </div>
        </ProtectedRoute>
    );
}
