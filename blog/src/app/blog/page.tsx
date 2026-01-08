import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";
import BlogCard from "@/components/BlogCard";

export const revalidate = 60;

async function getAllBlogs() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [
        Query.orderDesc("publishedDate"),
        Query.equal("isPublished", true)
      ]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getAllBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Blogs</h1>
      {posts.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {posts.map((post) => (
            <BlogCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blog posts found.</p>
      )}
    </div>
  );
}
