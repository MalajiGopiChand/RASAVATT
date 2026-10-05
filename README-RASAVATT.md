# RASAVATT website

Responsive customer fashion marketplace built with React, TypeScript, Vinext/Vite and custom responsive CSS. This is a website; there is no native mobile application.

## Run locally

Use Node 22.13 or newer. Install dependencies with `npm install`, then run `npm run dev`. The default local URL is http://127.0.0.1:5173. On a machine with a broken npm shell shim, `node scripts/run-framework.mjs dev --host 127.0.0.1` starts the installed project directly.

Run `node node_modules/typescript/bin/tsc --noEmit` to check types and `node scripts/run-framework.mjs build` to create the production build.

## Connected journeys

- Storefront: home, collections, search and filters, product details, wishlist, cart, checkout, payment outcomes.
- Designers: discovery, profiles, portfolios, packages, reviews and chat.
- Custom fashion: brief introduction, occasion, garment, inspiration upload, fabric, colours, design details, budget, deadline, measurements, brief review, matching and quote.
- Collaboration: canvas notes/images/colours/fabrics, drawing points, undo/redo, moodboard, saved versions, comparison, restoration and design approval.
- Orders: overview, production, quality approval, alteration request, shipping, delivery and reviews.
- Account: login/sign-up/OTP previews, onboarding preferences, profile, measurement profiles, addresses, payment nicknames, reviews, referrals, inspiration, moodboards, notifications and settings.
- Support: story, contact, help centre, support chat, problem reporting, size guide, camera permission preview, offline and website refresh states, draft policies.

## Database integration

`lib/rasavatt/data.ts` defines data models and sample catalogue entries. `lib/rasavatt/service.ts` is the persistence adapter. Replace its localStorage operations with your API/database implementation, then separate entity operations as the API is introduced. The key is `rasavatt.website.v1`.

The current demo uses browser storage only. It is not multi-user or cross-device. Uploaded files are stored as data URLs with a 3 MB per-file limit and are subject to browser storage capacity. Move uploads to object storage and save asset references in the database for production.

## Live services to connect later

Authentication, OTP delivery, Google/Apple sign-in, payments, chat delivery, support email, referral rewards, and courier tracking are not live. Demo login creates a local profile and never saves the password. OTP is `123456`. Payment forms are explicitly simulated. Do not enter real card data. Camera preview does not calculate body measurements. Currency/language choices are saved preferences; the current interface remains English/INR.

Replace sample designer/product information and imagery with approved product assets before commercial launch. Contact details and commercial policies require the business owner's final details. Reference imagery comes from the eight user-supplied design images.

## Verification

Browser smoke tests checked 82 routes at 390 px width with no runtime errors or horizontal overflow. Ready-made purchase and custom-design journeys were exercised through simulated payment and saved orders. Cart and theme persistence were checked. Desktop and mobile home layouts were visually reviewed. Test scripts are in `scripts/qa.mjs` and `scripts/qa-custom.mjs`; they require Playwright and a local Edge executable. QA image outputs are ignored by Git.

## Main source files

`components/rasavatt/Website.tsx` owns the website shell and navigation. Page families are split into Storefront, Commerce, Create, Studio, Auth, Account and Information. Shared UI lives in `ui.tsx`; all theme and responsive styling is in `app/globals.css`. `app/[[...slug]]/page.tsx` serves the browser routes, including direct navigation and refresh.
