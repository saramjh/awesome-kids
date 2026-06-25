# Contributing

Thanks for helping keep this list useful.

## What Belongs Here

Good additions should be:

- High-quality for kids, families, homeschoolers, libraries, or classrooms.
- Active or still clearly useful in the current year.
- Good value: free, library/school accessible, nonprofit, one-time purchase, or worth a paid subscription.
- Clear about age range and learning purpose.
- Reasonably safe: no major ad overload, dark patterns, weak privacy posture, or unmanaged social exposure.

## What Does Not Belong

Avoid adding:

- Generic entertainment with thin educational value.
- Abandoned apps, Flash-only sites, dead links, or unmaintained courses.
- Resources built mainly around ads, loot boxes, aggressive subscriptions, or social pressure.
- AI tools aimed at replacing a child's thinking instead of helping them learn.
- Anything that requires kids to publish personal information publicly.

## Pull Request Checklist

- Add the resource to the best-fit category.
- Include age range if the resource provides one or if it is obvious from context.
- Include a short value note, not marketing copy.
- Mention safety or pricing watch-outs when relevant.
- Run:

```sh
node scripts/check-links.mjs
```

If a link fails only because the site blocks automated requests, mention that in the pull request.
