import { account } from './appwrite';
import { ID, Models } from 'appwrite';

export async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        console.error('Appwrite service :: getCurrentUser :: error', error);
        return null;
    }
}

export async function logout() {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        console.error('Appwrite service :: logout :: error', error);
        throw error;
    }
}

export async function login(email: string, password: string) {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}

export async function register(email: string, password: string, name: string) {
    try {
        const result = await account.create(ID.unique(), email, password, name);
        if (result) {
            return await login(email, password);
        }
    } catch (error) {
        throw error;
    }
}
