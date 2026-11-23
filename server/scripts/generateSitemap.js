const fs = require('fs');
const path = require('path');

async function buildSitemap() {
  console.log('Fetching active jobs from API...');
  const res = await fetch('https://jobopedia-backend.onrender.com/api/jobs?limit=500');
  const data = await res.json();
  const jobs = data.jobs || [];
  console.log('Total jobs fetched:', jobs.length);

  const today = '2026-11-23';

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  lines.push('        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');
  lines.push('        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">');
  lines.push('');
  lines.push('  <!-- Core Main Navigation Pages (Clean URLs) -->');

  const corePages = [
    { loc: 'https://jobopedia.in/', priority: '1.0', changefreq: 'daily', lastmod: today },
    { loc: 'https://jobopedia.in/govt', priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: 'https://jobopedia.in/private', priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: 'https://jobopedia.in/internships', priority: '0.8', changefreq: 'daily', lastmod: today },
    { loc: 'https://jobopedia.in/preparation', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { loc: 'https://jobopedia.in/mock-tests', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { loc: 'https://jobopedia.in/about', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: 'https://jobopedia.in/contact', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: 'https://jobopedia.in/privacy-policy', priority: '0.6', changefreq: 'monthly', lastmod: today }
  ];

  for (const page of corePages) {
    lines.push('  <url>');
    lines.push(`    <loc>${page.loc}</loc>`);
    lines.push(`    <lastmod>${page.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${page.changefreq}</changefreq>`);
    lines.push(`    <priority>${page.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('');
  lines.push('  <!-- Query Parameter View Mappings (Backward Compatibility & Crawler Fallbacks) -->');
  const viewUrls = [
    { loc: 'https://jobopedia.in/?view=govt-jobs', priority: '0.8', changefreq: 'daily' },
    { loc: 'https://jobopedia.in/?view=private-jobs', priority: '0.8', changefreq: 'daily' },
    { loc: 'https://jobopedia.in/?view=internships', priority: '0.7', changefreq: 'daily' },
    { loc: 'https://jobopedia.in/?view=preparation', priority: '0.7', changefreq: 'weekly' },
    { loc: 'https://jobopedia.in/?view=mock-tests', priority: '0.7', changefreq: 'weekly' },
    { loc: 'https://jobopedia.in/?view=about', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://jobopedia.in/?view=contact', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://jobopedia.in/?view=privacy-policy', priority: '0.5', changefreq: 'monthly' }
  ];

  for (const page of viewUrls) {
    lines.push('  <url>');
    lines.push(`    <loc>${page.loc.replace(/&/g, '&amp;')}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${page.changefreq}</changefreq>`);
    lines.push(`    <priority>${page.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('');
  lines.push(`  <!-- Active Verified Job Postings (${jobs.length} Listings) -->`);
  for (const job of jobs) {
    if (!job._id) continue;
    const jobDate = job.updatedAt ? job.updatedAt.split('T')[0] : (job.createdAt ? job.createdAt.split('T')[0] : today);
    lines.push('  <url>');
    lines.push(`    <loc>https://jobopedia.in/job/${job._id}</loc>`);
    lines.push(`    <lastmod>${jobDate}</lastmod>`);
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push('    <priority>0.7</priority>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  const xmlContent = lines.join('\n');

  const publicPath = path.resolve(__dirname, '../../client/public/sitemap.xml');
  const distPath = path.resolve(__dirname, '../../client/dist/sitemap.xml');

  fs.writeFileSync(publicPath, xmlContent, 'utf8');
  console.log(`Saved public sitemap to: ${publicPath} (${xmlContent.length} bytes, ${corePages.length + viewUrls.length + jobs.length} URLs)`);

  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, xmlContent, 'utf8');
    console.log(`Saved dist sitemap to: ${distPath}`);
  }
}

buildSitemap().catch(console.error);
