import React from 'react';
import Link from 'next/link';
import sitemapItems from '@/utils/testsitemap'; // Assuming this includes blog/project slugs
import ScrollToHash from '@/components/ScrollHash';

const Sitemap = async () => {
  const items = await sitemapItems();

  return (
    <>
     <ScrollToHash />
     <div className="min-h-screen bg-black-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Sitemap</h1>

  
        {/* Dynamic Pages (e.g. blog or project posts) */}
        {items?.length > 0 && (
          <div className="bg-gray-900/80 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">Content Pages</h2>
            <ul className="space-y-4">
              {items.map((item: any) => (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className="text-white hover:text-blue-300 transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 text-gray-300">
          <p>
            This sitemap includes all important pages including blog posts and project case studies. 
            If you're looking for something specific, try the search bar or contact us.
          </p>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Sitemap;
