'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '@/lib/auth';
import { Models } from 'appwrite';

const Navbar = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };

        fetchUser();
    }, [pathname]);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push('/');
    };

    return (
        <nav className="bg-white border-b border-gray-100 dark:bg-zinc-900 ignored-dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center font-bold text-xl text-indigo-600">
                            BlogApp
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800">
                                Home
                            </Link>
                            <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800">
                                Blogs
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-gray-900 border-gray-900 dark:text-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
