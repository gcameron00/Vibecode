---
title: Building the MCP-enabled add-blog
date: 2026-08-29
description: A CloudFlare-hosted blogging platform with its own MCP server — built to save on hosting and explore what MCP looks like in the wild.
---

I feel it is about time to give some updates on All About the Vibes, so expect a few posts in the coming days. I'll start with a mini-project that was my primary spare-time focus from late July to mid-August. The project was [add-blog](https://allaboutthevibes.blog/project/?slug=add-blog), as you can guess it is a vibe-coded blogging solution.

There are enough blogging platforms out there, in fact I have an account with a hosting company where I can create as many WordPress instances as I like, so what the hell was I doing creating something similar, but less featured?

Well, that hosting account was one of the drivers. I'd already created All About the Vibes and was running that for free on CloudFlare and I knew the hosting account bill was going to come due in late Autumn, so why not save some money?

There was another reason, I wanted to experiment with MCP. I'd already created a basic local server and added some Connectors to Claude, but I wanted to be able to see what worked and what didn't with a server exposed over the web.

This is what Add-Blog enables, it is a reasonably functional blogging platform that supports multiple blogs and is very simple to add to any existing CloudFlare hosted domain. It exposes two URLs, say blog.example.com and blogadmin.example.com and you can publish what you want, including media library, tagging, and RSS feed. There is even a basic WordPress import.

Obviously the special feature is the ability to use the MCP server. Once configured, the admin portal provides a URL that you can paste into your MCP client to add a custom MCP Server, or a Connector in Claude's terminology. Once the Connector is added, 13 tools become available to Claude, giving the ability to list or read posts, create a new draft, and work with media and tags. It is worth pointing out that the Connector is per blog. So if you use add-blog to manage multiple blogs you can choose which ones to work on with Claude.

Here's where it gets fun: I ask Claude to create a draft post about all my July workouts from Strava and it pulls the data, via their Connector, straight into a draft visible in the blog admin interface. No, I don't think you should just go ahead and publish that, but it does make it easy to kick start and have the data nicely formatted.

If you have got this far maybe you are asking, is All About the Vibes using Add-Blog? No, not yet, Add-Blog doesn't yet support what it would take to migrate the All About the Vibes profile page, and certainly not the very specific way the projects on the profile page are maintained. It is on my list. If you are interested in the documentation or code, take a look [on GitHub](https://github.com/gcameron00/add-blog).