import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Use the canonical URL from environment or default to codio.co.in
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codio.co.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
