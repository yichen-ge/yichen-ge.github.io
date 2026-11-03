# Yichen Ge’s personal homepage

Yichen Ge’s academic website, built with Jekyll and hosted on GitHub Pages.

## Publications

Add publication entries as Markdown files in `_publications/`.

```yaml
---
title: "Paper title"
category: conferences # manuscripts for journal articles
date: 2026-01-18
venue: "Conference or journal"
excerpt: "A short explanation of the research contribution."
authors: "Author One, Yichen Ge, Author Three" # optional
author_role: "Corresponding author" # optional
presentation: "Oral" # optional
paperurl: "https://example.com/paper" # optional
codeurl: "https://github.com/username/project" # optional
topics:
  - Text-to-motion
  - Generative models
---
```

Only nonempty `paperurl` and `codeurl` values produce **Paper** and **Code**
buttons. Omit these fields or leave them blank to hide the corresponding button.
An optional `projecturl: /MADM/` makes a paper’s title link to its standalone
project page. Papers are sorted newest first within their category.

## Local preview

```sh
bundle install
bundle exec jekyll serve
```

Shared styles live in `assets/css/academic.css`; homepage content lives in
`_pages/about.md`. Navigation is configured in `_data/navigation.yml`.

Based on [AcademicPages](https://github.com/academicpages/academicpages.github.io).
