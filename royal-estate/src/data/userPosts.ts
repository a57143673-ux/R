import { Property } from './mockData';

const USER_POSTS_KEY = 'safsaf_user_posts';

export function loadUserPosts(): Property[] {
  try {
    const raw = JSON.parse(localStorage.getItem(USER_POSTS_KEY) || '[]') as Array<Omit<Property, 'createdAt'> & { createdAt: string }>;
    return raw.map(post => ({ ...post, createdAt: new Date(post.createdAt) }));
  } catch {
    return [];
  }
}

export function saveUserPost(post: Property) {
  const posts = loadUserPosts();
  localStorage.setItem(USER_POSTS_KEY, JSON.stringify([post, ...posts].slice(0, 100)));
}
