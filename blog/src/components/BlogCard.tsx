import Link from 'next/link';
import { Models } from 'appwrite';

interface BlogCardProps {
    post: Models.Document;
}

const BlogCard = ({ post }: BlogCardProps) => {
    // Helper to strip HTML tags for excerpt
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    const excerpt = stripHtml(post.content).substring(0, 100) + '...';
    const date = new Date(post.publishedDate || post.$createdAt).toLocaleDateString();

    return (
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{date}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
                    <span className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Read more &rarr;
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;
