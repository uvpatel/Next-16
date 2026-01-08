'use client';

import { useEffect } from 'react';
import { databases, appwriteConfig } from '@/lib/appwrite';

export default function ViewIncrementer({ id, views }: { id: string; views: number }) {
    useEffect(() => {
        const incrementView = async () => {
            try {
                await databases.updateDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.collectionId,
                    id,
                    {
                        views: views + 1
                    }
                );
            } catch (error) {
                console.error('Error incrementing view:', error);
            }
        };

        incrementView();
    }, [id, views]);

    return null;
}
