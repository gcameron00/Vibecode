const SITE_NAME = 'All About the Vibes';
const SITE_DESCRIPTION = 'A blog about my journey with AI-assisted vibe coding';
const DEFAULT_OG_IMAGE = '/assets/og-image.png';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Skip non-page assets — let them pass through untouched
  if (/\.(json|md|css|js|png|jpe?g|gif|webp|svg|ico|xml|txt|woff2?)$/i.test(url.pathname)) {
    return next();
  }

  const response = await next();

  // Only rewrite HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const origin = url.origin;
  const ogData = await resolveOgData(url, origin);

  return new HTMLRewriter()
    .on('head', {
      element(el) {
        el.append(buildMetaTags(ogData), { html: true });
      },
    })
    .transform(response);
}

async function resolveOgData(url, origin) {
  const base = {
    siteName: SITE_NAME,
    type: 'website',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    pageUrl: url.href,
    image: `${origin}${DEFAULT_OG_IMAGE}`,
  };

  const path = url.pathname;
  const slug = url.searchParams.get('slug');

  if (path.startsWith('/post/') && slug) {
    try {
      const res = await fetch(`${origin}/posts/index.json`);
      const posts = await res.json();
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        return {
          ...base,
          type: 'article',
          title: `${post.title} | ${SITE_NAME}`,
          description: post.description || base.description,
        };
      }
    } catch {}
    return base;
  }

  if (path.startsWith('/project/') && slug) {
    try {
      const res = await fetch(`${origin}/projects/index.json`);
      const projects = await res.json();
      const project = projects.find((p) => p.slug === slug);
      if (project) {
        return {
          ...base,
          title: `${project.title} | ${SITE_NAME}`,
          description: project.description || base.description,
          image: project.image ? `${origin}${project.image}` : base.image,
        };
      }
    } catch {}
    return base;
  }

  if (path === '/about/' || path === '/about') {
    return {
      ...base,
      title: `About | ${SITE_NAME}`,
      description: 'About me and this vibe coding blog.',
    };
  }

  if (path === '/portfolio/' || path === '/portfolio') {
    return {
      ...base,
      title: `Portfolio | ${SITE_NAME}`,
      description: 'Projects built with AI-assisted vibe coding.',
    };
  }

  return base;
}

function buildMetaTags(og) {
  const e = htmlEscape;
  return `
    <meta property="og:site_name" content="${e(og.siteName)}" />
    <meta property="og:type" content="${e(og.type)}" />
    <meta property="og:title" content="${e(og.title)}" />
    <meta property="og:description" content="${e(og.description)}" />
    <meta property="og:url" content="${e(og.pageUrl)}" />
    <meta property="og:image" content="${e(og.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(og.title)}" />
    <meta name="twitter:description" content="${e(og.description)}" />
    <meta name="twitter:image" content="${e(og.image)}" />`;
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
