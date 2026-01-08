import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";
import { notFound } from "next/navigation";
import ViewIncrementer from "@/components/ViewIncrementer";
import { Metadata } from "next";

export const revalidate = 60;

async function getBlogBySlug(slug: string) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [Query.equal("slug", slug)]
    );
    return response.documents[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.authorId], // Assuming authorId is meaningful or fetching author name would be better
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <ViewIncrementer id={post.$id} views={post.views || 0} />
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-500 space-x-4">
          <time dateTime={post.publishedDate}>
            {new Date(post.publishedDate).toLocaleDateString()}
          </time>
          <span>•</span>
          <span>{post.views || 0} views</span>
        </div>
      </header>

      {/* Basic Content Rendering - In a real app, use a Markdown renderer */}
      <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
