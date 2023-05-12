---
layout: post
name: Auto-GPT for 3d Printing
short_description: Get Auto-GPT to Generate STL Files for 3d Printing
title: "Auto-GPT for 3d Printing"
featured_image: 
hero: ""
description: It's not very good, but Auto-GPT can generate STL files.
date: 18/4/2023
category: Software
tags: auto-gpt 3d-printing
---

There's been a lot of hype around Auto-GPT and the potential of it. It's the first AI project I've been interested in contributing to and while kicking the tires I thought it might be fun to see if it could 3d print something. Of course, getting it to go from a text description to a printed object might be a tall ask, but what could it hurt to try?

At first, I was a little too ambitious. I set some goals around 3d printing and it failed miserably. It wanted to create jpegs of 3d objects and kept going around and around while failing to install related software. When I decided to simplify things it started to do some cool stuff.

Here's how I actually got it to create a model in STL file format:

<iframe width="560" height="315" src="https://www.youtube.com/embed/RqoqGz98ssU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

And the goals prompt that generated it:

```yaml
# ai_settings.yaml

ai_goals:
  - Research ASCII STL file format and use that information to generate STL files from scratch
  - Create a cube in STL format and save to disk as cube.stl
  - Create a tetrahedron in STL format and save to disk as tetrahedron.stl
  - Create a dodecahedron in STL format and save to disk as dodecahedron.stl
ai_name: STL-BUILDER
ai_role: an autonomous ai assistant that gives examples of STL format for use in 3d printing
```

Another prompt I tried was a little more general but it kept wanting to create a Python script and execute it:

```yaml
ai_goals:
  - Create a 10cm diameter cube in STL format and save to disk as cube.stl
  - Create a 10cm diameter tetrahedron in STL format and save to disk as tetrahedron.stl
# - Create a 10cm diameter dodecahedron in STL format and save to disk as dodecahedron.stl
ai_name: STL-BUILDER
ai_role: an autonomous ai assistant that creates STL files of polyhedra for use in 3d printing
```

It was successful in creating the script but it threw an error when trying to execute it due to not having the ability to install dependencies like `numpy-stl`. I suppose Auto-GPT will be updated in the next few days or weeks to allow for that so I will try again when that happens.
