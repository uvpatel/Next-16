'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { databases, account, appwriteConfig } from '@/lib/appwrite';
import { ID } from 'appwrite';
import ProtectedRoute from '@/components/ProtectedRoute';
import { slugify } from '@/lib/slugify';

function CreateBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!blogId);

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            blogId
          );
          setTitle(post.title);
          setContent(post.content);
          setIsPublished(post.isPublished);
          setSlug(post.slug);
        } catch (error) {
          console.error('Error fetching blog:', error);
          alert('Could not load blog for editing');
          router.push('/dashboard');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchBlog();
    }
  }, [blogId, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!blogId) { // Only auto-update slug on create
      setSlug(slugify(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await account.get();

      const payload = {
        title,
        content,
        isPublished,
        slug,
        authorId: user.$id,
        updatedDate: new Date().toISOString(),
      };

      if (blogId) {
        // Update
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          blogId,
          payload
        );
      } else {
        // Create
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          ID.unique(),
          {
            ...payload,
            publishedDate: new Date().toISOString(),
            views: 0
          }
        );
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving blog:', error);
      alert(`Failed to save blog: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center py-10">Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {blogId ? 'Edit Blog' : 'Create New Blog'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            required
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))} // Allow manual override but keep slugify
            className="mt-1 block w-full border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            rows={10}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div className="flex items-center">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white dark:bg-zinc-800 py-2 px-4 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateBlogContent />
      </Suspense>
    </ProtectedRoute>
  );
}
