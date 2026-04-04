---
title: Digging out of a hole
date: 2026-04-04
description: Can Claude code figure out it needs to step back and rethink?
---

I've had a few instances when Claude appears to be happy to try things, but despite repeated failures to fix some code, it won't suggest or enact an alternative way of understanding what is going on.

In addition to my default pattern of get Claude to plan a set of work and then implement it step by step with a chance for feedback, I've added to my approach trying to quickly detect these moments when Claude is just digging a hole. The way out obviously depends on the situation, but I like suggesting that Claude implements some kind of metric collection or debug feature to gather the information needed to make better decisions.

For example, today I was struggling to get a web site to look consistent across iOS and Windows, there was obviously something different in the way the different browsers were handling the stylesheet, but I can Claude had no idea what.

I requested a /trouble page on the website to collect the metrics being used in the layout. Handing the resulting metrics back to Claude resulted in a first time fix.

![](/posts/images/digging-out-of-a-hole-1775318761364.jpeg)/trouble results