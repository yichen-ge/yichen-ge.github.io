---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

<p class="muted">Explore the site, or view the <a href="{{ '/sitemap.xml' | relative_url }}">XML sitemap</a>.</p>
<ul class="sitemap-list">
  <li><a href="{{ '/' | relative_url }}">About me</a></li>
  <li><a href="{{ '/publications/' | relative_url }}">Publications</a>
    <ul>{% assign papers = site.publications | sort: 'date' | reverse %}{% for paper in papers %}<li><a href="{{ '/publications/#' | append: paper.slug | relative_url }}">{{ paper.title }}</a></li>{% endfor %}</ul>
  </li>
  <li><a href="{{ '/MADM/' | relative_url }}">MADM project page</a></li>
</ul>
