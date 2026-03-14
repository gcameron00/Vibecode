# All About the Vibes

A blog documenting my journey with AI-based vibe coding, live at [allaboutthevibes.blog](https://allaboutthevibes.blog).

## Structure

```
/
├── index.html              # Homepage — lists posts dynamically
├── post/
│   └── index.html          # Single post renderer (/post/?slug=my-post)
├── about/
│   └── index.html          # About page
├── posts/
│   ├── index.json          # Post manifest (source of truth for listing)
│   └── hello-world.md      # Post files (one .md per post)
└── assets/
    └── css/
        └── styles.css
```

## Writing a post

1. Create a markdown file in `posts/`:

   ```
   posts/my-post-slug.md
   ```

   Optionally include frontmatter (it will be stripped before rendering):

   ```markdown
   ---
   title: My Post Title
   date: 2026-03-07
   description: A short summary shown on the homepage.
   ---

   Post content here...
   ```

2. Add an entry to `posts/index.json`:

   ```json
   {
     "slug": "my-post-slug",
     "title": "My Post Title",
     "date": "2026-03-07",
     "description": "A short summary shown on the homepage."
   }
   ```

Posts are listed on the homepage in the order they appear in `posts/index.json`, so put the newest at the top.

## Tech

- Static HTML/CSS, no build step
- Markdown rendered client-side with [marked](https://marked.js.org/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/) at [allaboutthevibes.blog](https://allaboutthevibes.blog)

## Local development

Serve the root directory with any static file server:

```bash
npx serve .
```

Then open `http://localhost:3000`.
