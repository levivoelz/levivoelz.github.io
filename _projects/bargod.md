---
layout: post
name: BarGod
short_description: Drink Recipes in Your POS Terminal-ish
title: "BarGod: Drink Recipes in Your POS Terminal-ish"
featured_image: /images/projects/bargod-terminal-ui.png
hero: /images/projects/bargod-logo.png
description: BarGod – Get drink recipes right in your terminal. Sorta... When a good idea isn\'t good enough to merit moving mountains.
date: 2/5/2019
---

Every once in a while there's a problem worth going to great lengths to solve, but most of the time not so much. If you are addicted to problem-solving then it may not matter if the problem is worth solving or not. You just need to get your fix. I kind of felt like that while working on this project because my friend and I tried really hard to solve a problem that likely wasn't big enough to merit the time we spent on it. However, we had to try in order to learn why it wasn't worth it.

I am not a bartender, but my friend was. Now, he manages a busy restaurant in downtown Scottsdale, AZ. It's a nice place and they serve upscale martinis and cocktails. It's their specialty. Most customers drink whatever is on the menu, but a few want something they don't typically make. If the bartender has made it a few times before they know the recipe and can whip it up. Otherwise, they have to look up the recipe on their phone or in a book. It's not very professional to look up recipes on your phone or even in a book. People want to feel confident you know what you are an expert and make great drinks. So, rather than look up recipes the old fashioned way, why not look them up in the POS terminal? Well, it's a good idea and my friend and I spent some time working on the problem.

It all started with a database of around 10,000 cocktail recipes my buddy got from a liquor rep he knew. He'd been sitting on the database for years and had some ideas of what to do with it but he's not a developer and getting someone to work on it within his budget was challenging. A few years later, I offered to help build his app called BarGod and we embarked on a short journey. It was a lot of fun and we met a bunch of people trying to solve similar problems—apps in POS terminals. At the time, I didn't know that most POS companies were dinosaurs and had completely closed systems. If you wanted to develop anything on their platform you had to pay big bucks to get a developer license and access to their APIs (if they had any). My friend's restaurant uses Micros and we figured if we could crack Micros we would be in everywhere. The thing was, if we managed to crack his Micros then we'd have to crack any potential customer's Micros as well, which would've added to our overhead.

<figure>
  <a href='/images/projects/bargod-terminal-ui.png'><img src='/images/projects/bargod-terminal-ui.png' /></a>
</figure>

So, Micros is built on Microsoft Windows and they have a bunch of different systems that operate on different versions of Windows. I don't know all the versions of Micros, but the one my friend's restaurant had was a terminal and server setup with all data being stored on-site, and the only outside connection permitted through the firewall was to handle payment transactions through their provider. They had a half dozen terminals and one server sitting in the manager's office. The way the arrangement works with the Micros platform is you work with a third-party rep that manages the system for you. The restaurant manager has basic access to modify things like menu items and pricing, but if you want to add a screen or move a button you gotta dial up the rep and have one of their specialists come over to do that for you. It's what you pay for—the service. In fact, we learned that even if you had your own specialist, the rep won't give you the keys to do anything beyond what I just mentioned. We learned that the hard way. If you want superuser access to Micros, you gotta pay.

So, pay we did. But not Micros. We paid a guy we found online who knew how to hack Micros and we got access to my friend's own system. They do own it, btw. Anyway, the reason we needed root access is that we wanted to change the firewall settings so that we could embed a new window in the terminal that contained our app. We wanted the bartender to be able to hit a button on the screen next to the menu button called "Recipes" and the app would pop up allowing them to search. After getting root access, we learned a lot about the firewall setup. It was actually pretty simple to open a browser window within the Micros application and have our app load up since all we needed to do was open port 80 in the firewall. The rest of the functionality was already baked-in inside Micros. We were concerned about violating PCI Compliance, so we limited traffic to our domain only, which made us feel ok about it. We tried it out and everything worked. We could pop up our app! Now the issue was that the terminal didn't have a keyboard so we couldn't actually search anything, but that's a simple problem to solve.

<figure>
  <a href='/images/projects/bargod-micros-port-80.jpg'><img src='/images/projects/bargod-micros-port-80.jpg' /></a>
  <figcaption>Port 80 Open</figcaption>
</figure>

We had BarGod working in a terminal. That was great. Micros was one of the largest POS companies and we knew if we could crack them we could crack others. But at what cost? We learned how to open up our Micros but would our potential customers be ok with us messing with theirs? What about their third-party service providers? Would they be cool with it? If it was my restaurant and my hardware I wouldn't.

Plus, that was just Micros. What about the others? There are hundreds of POS companies out there and each has its own proprietary and _closed_ system. The only company coming close to having an open system is Square and they don't let you build apps on their platform, they just give you access to their data through their public API and you can integrate it into your external app.

We spent a lot of time culling the database and improving the quality of the recipes after I built a GUI for my buddy and another friend who was helping with recipes. We made a lot of progress on that front and had a pretty slick terminal UI but in the end, we felt like even though it would be _nice to have_ drink recipes available in POS terminals, it wasn't really practical or advisable to hack all of our customer's systems. We could do it, but it wouldn't be worth it.

---
_Another idea would be to create an **open** point of sales platform so that developers could build apps right in the system and intergrated more tightly with the terminal software._
