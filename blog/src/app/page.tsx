import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";
import BlogCard from "@/components/BlogCard";
import Link from 'next/link';

// Revalidate data every 60 seconds
export const revalidate = 60;

async function getLatestBlogs() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [
        Query.orderDesc("publishedDate"),
        Query.limit(6),
        Query.equal("isPublished", true)
      ]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestBlogs();

  return (
    <div className="space-y-10">
      <section className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Welcome to <span className="text-indigo-600">BlogApp</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover the latest stories, ideas, and expertise from writers.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link href="/blog" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              Read Blogs
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-200 dark:border-zinc-800 pt-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Posts</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {posts.map((post) => (
              <BlogCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blog posts found. Check back later!</p>
        )}
      </div>
    </div>
  );
}
