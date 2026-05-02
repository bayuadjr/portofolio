import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // Use CDN for read-only queries
  apiVersion: '2024-05-01', // Update to current date for API version
});

// Setup image builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
