import { Client, Account, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID || '',
  collectionId: process.env.NEXT_PUBLIC_BLOG_COLLECTION_ID || '',
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID || '',
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
