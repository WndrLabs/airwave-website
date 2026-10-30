# Skywave website

The landing page of [Skywave](https://apps.apple.com/app/id6822921195) (English, French, German), a
page per station with a mini player, and a page per country. The 200 most popular stations have a
page of their own (`STATIC_PAGES` in `src/catalog.mjs`, in the sitemap); the others are made in the
browser: GitHub Pages answers their link with `404.html`, which reads the station list and renders
the same template (`src/dynamic.mjs`). Static HTML, built by `build.mjs` from
the weekly station list ([airwaves-stations](https://github.com/WndrLabs/airwaves-stations)) and
deployed to GitHub Pages every day.

```sh
node build.mjs                                            # into dist/, stations from the CDN
STATIONS_FILE=../airwaves/data/stations.json SITE_URL=http://localhost:4173 node build.mjs
npm run serve                                             # http://localhost:4173, 404.html as on GitHub Pages
```

## Station links

Every station has one link, `/radio/<name>-<key>/`, e.g. `/radio/skyrock-01b61e49/`. The key is the
start of the station's id (`src/links.mjs`); the app builds the same links to share a station and
reads them back to play it (`src/domain/links.ts` in the app). Keep both in step.

When someone opens a station link:

- **Skywave installed** (universal links): iOS opens the app, which plays the station.
- **Not installed**: the station's page, with a mini player, Apple's Smart App Banner and
  "Listen in Skywave", which opens the app (`skywave://radio/<slug>`) or else the App Store.

## Setup

1. **Pages**: Settings › Pages › Source: *GitHub Actions*.
2. **Domain** (needed for universal links): Apple reads
   `https://<domain>/.well-known/apple-app-site-association` at the root of a domain, which a
   project page (`wndrlabs.github.io/airwave-website`) doesn't have. Point a domain at GitHub Pages,
   then set the repository variable `SITE_URL` (e.g. `https://skywave.example`); the build writes
   the `CNAME` file. Use the same address in the app (`SITE_URL` in `src/domain/links.ts`) and add
   `applinks:<domain>` to its associated domains.
3. **Team ID**: set the repository variable `APPLE_TEAM_ID` (Apple Developer › Membership). It's
   public (it's in every signed app), not a secret.
