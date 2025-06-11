+++
title = "OpenGraph Test Post"
date = 2025-02-11
description = "Example post with Opengraph functionality"

[extra] 
banner_label = "A little crab"
show_banner_on_index = true
toc = false
+++

## This post works with opengrah

In order for opengraph funtionality to work, you need to include a `card.png` in your post directory:

```
Rusty post
  ├── banner.png
  ├── card.png
  └── index.md
```
If done correcty you should be able to see the posts accordingly on social media:
{% figure(src="images/opengraph.png") %} Example cards for Facebook and X (Twitter){% end %}
For Open Graph cards it's suggested to use high-quality images with dimensions of at least 1,200 x 630 pixels, while keeping the file size under 8 MB (If the file was to exceed this size, your card.png will not be rendered on the cards)