'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Models } from 'appwrite';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
