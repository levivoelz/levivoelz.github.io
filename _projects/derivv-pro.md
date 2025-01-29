---
layout: post
name: Derivv Pro Cross-Platform Desktop App
short_description: A nifty solution to a fairly common problem—<i>multiple sizes of the same image</i>.
title: My new desktop app, Derivv Pro
featured_image: /images/projects/derivv-pro-desktop.png
hero: /images/projects/derivv-pro-desktop-800x800.png
description: Mega ultra fast image resizing for Mac, Windows, and Linux.
category: Software
tags: software tauri rust typescript react sqlite
date: 28/1/2025
---

Over the past 10 years or so, I've gotten a lot of positve feedback from people who use [derivv.com](https://derivv.com){:target="_blank"} and tons of suggestions for new features. Unfortunately, I've never been able to find the time to implement said features. Until now.

Before jumping in and building [Derivv Pro](https://derivv.hatchmatter.com){:target="_blank"}, I spent a quite a while thinking about how I could make it more user friendly and modern looking. I also wanted to make it faster, more reliable, and more feature-rich—a real pro version. And, I really wanted to make it good enough that I could feel comfortable charging for it. Not necessarily because I want to get rich, but because I think it validates the idea if people are willing to break out their wallets. Also, I've always wanted to build a sustainable business, and the thing I know best is building great software products.

I spent nearly as much time researching new technologies as I did building the app and wanted to make sure I was using the best tools for the job. I tossed around a few ideas, like building a progressive web app, building a native app with Electron, and even building a native app with Swift. I ended up picking [Tauri](https://tauri.app){:target="_blank"} due to it's speed, simplicity, small build size, cross-platform support, and the fact that it's written in Rust. I'm really happy with the results.

If you don't know what Tauri is, it's a framework for building cross-platform desktop and mobile applications that bundles web technologies and is written in Rust. It's a bit like Electron but it's much more lightweight. It compiles your web app into a native executable and hooks into your system's [WebView](https://en.wikipedia.org/wiki/WebView) rather than bundling Chromium. I've also been looking for an excuse to learn Rust, so it was a win accross the board.

As with my other projects, I've tried to pair them down to their bare-bones essentials so it's something I can manage on my own. This means focussing on core features and thinking about a business model that makes sense not only for me, but for my customers. Running a SaaS business on my own isn't something I feel like I can manage, so I've decided to make Derivv Pro a one-time purchase. This fits in line with some principles I align with, like [local first](https://localfirstweb.dev/){:target="_blank"} and 37 Signals' [ONCE](https://once.com/){:target="_blank"}.

There were a lot of other technologies I considered, but I ended up sticking with mostly familiar ones so that I could ship quickly and start gathering valuable feedback. When I gain a bit of traction, I'll start looking into other technologies and maybe adjust the business model.

Stuff I considered but didn't use:

- [Electron](https://www.electronjs.org/){:target="_blank"}
- [Next.js](https://nextjs.org/){:target="_blank"}
- [Swift](https://developer.apple.com/swift/){:target="_blank"} (not cross-platform, but I've been wanting to learn it)
- [Electric SQL](https://electric-sql.com/){:target="_blank"}
- [PGlite](https://github.com/electric-sql/pglite){:target="_blank"}

Stuff I used in this project:

- [Tauri](https://tauri.app){:target="_blank"}
- [React](https://reactjs.org/){:target="_blank"}
- [SQLite](https://www.sqlite.org/){:target="_blank"}
- [Tailwind CSS](https://tailwindcss.com/){:target="_blank"}
- [Vite](https://vitejs.dev/){:target="_blank"}
- [shadcn/ui](https://ui.shadcn.com/){:target="_blank"}
- [lucide](https://lucide.dev/){:target="_blank"}
- [Turborepo](https://turbo.build/){:target="_blank"}

Overall, the developer experience with Tauri was great. The biggest frustration I had was not with Tauri itself, but with distributing the app. Codesigning and notarizing the app in CI was a bit of a pain, and setting everything up for automatic updates took much longer than I expected. Things we take for granted in the web world are much harder to do with desktop apps.

For more info about Derivv Pro and to join the beta testing group, check out the [product page](https://derivv.hatchmatter.com){:target="_blank"}.


