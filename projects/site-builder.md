---
title: Site Builder
date: 2026-05-10
description: Claude Code website builder automation
image: /projects/images/site-builder-cover.jpeg
tech: vibecoded
status: Live
repo: https://github.com/gcameron00/site-builder
---

I've been building a number of websites using the same flow recently. This project was to automate that process and also kick-start any site without needing to get into VS Code to request Claude to flesh out the template site.

Previously I was:
1. Creating a new GitHub repo based on a template
2. Starting a new Pages project in CloudFlare linked to that new repo
3. Cloning the repo to my cloud based Win11 machine with GitHub Desktop
4. Giving Claude Code a few prompts to first document an idea and then build it
5. Committing and pushing the cloned repo back to GitHub, which triggered CloudFlare to deploy

This project now fully automates that. It uses the ability to notify Claude Code to pickup an Issue in a repo. Claude works on a new branch that then gets merged back into main which CloudFlare deploys. The user of Site Builder gets back the (site).pages.dev URL where CloudFlare is hosting the new Pages project.

Some loose ends to tie up, but works smoothly. Added bonus that all the sites built this way can be updated from the GitHub iOS app by mentioning Claude in a new issues tagged as an 