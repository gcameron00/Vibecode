export async function onRequest({ request }) {
  const origin = new URL(request.url).origin;

  // Fetch post index
  const indexRes = await fetch(`${origin}/posts/index.json`);
  if (!indexRes.ok) {
    return new Response('Could not load posts', { status: 500 });
  }
  const posts = await indexRes.json();

  // Fetch markdown for each post (cap at 20)
  const items = await Promise.all(
    posts.slice(0, 20).map(async (post) => {
      try {
        const mdRes = await fetch(`${origin}/posts/${post.slug}.md`);
        const md = mdRes.ok ? await mdRes.text() : '';
        const body = stripFrontmatter(md);
        const html = mdToHtml(body);
        return { ...post, html };
      } catch {
        return { ...post, html: '' };
      }
    })
  );

  const xml = buildFeed(origin, items);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// ---------------------------------------------------------------------------
// RSS builder
// ---------------------------------------------------------------------------

function buildFeed(origin, posts) {
  const siteTitle = 'All About the Vibes';
  const siteDescription = 'A blog about the journey with AI-assisted vibe coding.';
  const feedUrl = `${origin}/feed.xml`;

  const items = posts.map((post) => {
    const link = `${origin}/post/?slug=${encodeURIComponent(post.slug)}`;
    const pubDate = post.date ? new Date(post.date + 'T00:00:00Z').toUTCString() : '';
    return `
    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      ${post.description ? `<description>${xmlEscape(post.description)}</description>` : ''}
      <content:encoded><![CDATA[${post.html}]]></content:encoded>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(siteTitle)}</title>
    <link>${origin}</link>
    <description>${xmlEscape(siteDescription)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${origin}/favicon.png</url>
      <title>${xmlEscape(siteTitle)}</title>
      <link>${origin}</link>
    </image>
    ${items}
  </channel>
</rss>`;
}

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

function stripFrontmatter(md) {
  return md.replace(/^---[\s\S]*?---\n?/, '').trim();
}

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(xmlEscape(lines[i]));
        i++;
      }
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      out.push(`<h${level}>${inlineToHtml(hMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      out.push('<hr>');
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(inlineToHtml(lines[i].slice(2)));
        i++;
      }
      out.push(`<blockquote><p>${quoteLines.join('<br>')}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        listItems.push(`<li>${inlineToHtml(lines[i].replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${listItems.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        listItems.push(`<li>${inlineToHtml(lines[i].replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${listItems.join('')}</ol>`);
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph — collect until blank line or block-level element
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,4}\s|[-*]\s|\d+\.\s|>|```|---)/.test(lines[i])
    ) {
      paraLines.push(inlineToHtml(lines[i]));
      i++;
    }
    if (paraLines.length) {
      out.push(`<p>${paraLines.join(' ')}</p>`);
    }
  }

  return out.join('\n');
}

function inlineToHtml(text) {
  return text
    // Inline code (before bold/italic to avoid conflicts)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${xmlEscape(c)}</code>`)
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Escape remaining bare < > (not already part of a tag)
    .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');
}

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
