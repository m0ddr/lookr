+++
title = "Simple Guides for Lookr"
date = 2025-06-11
description = "How to use this blog template."

[taxonomies]
tags = ["zola","blog"]

[extra]
toc = false
+++

This blog template is built with Zola. For the things that are not mentioned in this guide, you may find the answers in the [Zola Docs](https://www.getzola.org/documentation/getting-started/overview/).

## Front-matter of Posts

```yaml
+++
title = "My First Blog Post"
date = 2023-09-09
description = "This is the first post of my new Zola blog"

[extra]
toc = false
+++
```

| Attribute     | Description |
|---------------|-------------|
| title| The title of the post.|
| date| The date the post was published.| 
| description | A short description of the post. _Displayed on index_ page.|
| toc | Displays dynamic table of contents.|

## Where to Place the Post Files

Your post files should be placed in `src/content/` directory. You can also create sub-directories to better organize your posts and assets.

```
src/content/
└── post-1/
    ├── card.png
    ├── banner.png
    └── index.md
```
