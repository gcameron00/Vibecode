---
title: Basic Setup — Getting a Vibe Coded Website Live
date: 2026-03-07
description: The tools you need and the steps to get your first AI-assisted website live from scratch.
---

Here's what I put in place to get a vibe coded website live, starting from nothing. This isn't a deep tutorial — just an account of the tools involved and the order that made sense.

## What you need

### GitHub

The website where I created an account to store and manage my code. Think of it as a home for your project that tracks every change you make.

### GitHub Desktop

A desktop app (Windows and Mac) that lets you sync code between GitHub and your local machine, without needing to use the command line.

### Cloudflare

Where I host the website. I used a feature called Pages, which connects directly to GitHub and automatically updates the live site whenever new code is pushed. Free tier is more than enough to get started.

### VS Code

The code editor. I used the desktop version. It's where you edit your local files, and where AI extensions like Copilot and Claude Code live.

### GitHub Copilot

An AI extension for VS Code that suggests and writes code as you type. Good for quick edits and completions.

### Claude Code

An AI extension for VS Code that works more conversationally — you describe what you want and it makes the changes. This is what I've been using most.

### ChatGPT / Claude.ai

The browser-based AI chat interfaces. Useful for asking questions when things go wrong — for example, I initially set up Cloudflare Pages incorrectly, pasted in a screenshot of the error, and got a clear explanation of what I'd done wrong.

---

## Getting started

Get each tool working independently, roughly in this order:

1. GitHub (create an account)
2. GitHub Desktop (connect it to your GitHub account)
3. Cloudflare (create an account, but you can set up Pages later)
4. VS Code (install it)
5. GitHub Copilot (install the VS Code extension)
6. Claude Code (can wait until you need it)

## Getting to your first website

Once everything is in place:

1. Create a new repository on GitHub
2. Add a `README.md` file to it
3. Use GitHub Desktop to sync (clone) the repo to your local machine
4. Open the folder in VS Code
5. Ask GitHub Copilot to turn it into a basic modern website
6. Commit and sync the files back to GitHub using GitHub Desktop
7. In Cloudflare, create a Pages project and connect it to your GitHub repo

If everything is wired up correctly, Cloudflare will give you a URL for your new live website.
