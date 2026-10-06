# RASAVATT

Connected fashion website adapted from all 80 supplied mobile screens. Desktop layouts support 1920x1080 and responsive mobile widths. /screens provides the complete numbered screen directory.

Guest pages include collections, designers, inspiration, reviews and onboarding. Member pages include saved preferences, measurement profiles, moodboards, a custom design brief, studio versions, checkout, orders, reviews and account settings. Protected journeys retain their destination through sign-in.

The visual library contains 13 distinct AI-generated couture, casualwear, designer and atelier photographs, encoded as WebP. Original images and exact prompts are preserved in the adjacent generated-assets directory.

## Development

Requires Node 22.13 or newer. Run npm ci, then npm run dev. Production artifact: npm run build. Type checking: node node_modules/typescript/bin/tsc --noEmit.

## Persistence

ChatGPT sign-in establishes server identity. Authenticated workspaces save to owner-scoped D1 records with validation and optimistic revisions. Private uploads save to owner-scoped R2 objects. Anonymous local previews use browser storage. Demo password and OTP screens demonstrate the UI; they are not production password or SMS services.

Migration: drizzle/0000_smiling_omega_flight.sql. Hosting applies production migrations when publishing. Preview customer data is not shipped in source.

## Verification

scripts/qa-desktop-journeys.mjs checks all 80 screens at desktop and mobile widths, guest/member gating, quiz, search, checkout, delivery and saved reviews. scripts/qa-cloud-studio.mjs checks authenticated persistence, private uploads, measurements, studio versions, the custom design journey, validation, unauthorized access and revision conflicts. Browser scripts use installed Windows Edge.

## Service boundaries

Catalogue, quotes and order milestones are demonstrations. Payments are explicitly simulated. Designer chat, courier tracking, AI body measurements, OTP and external social sign-in require production providers before commercial use. User reviews and workspaces persist; catalogue ratings are illustrative.

The Site preserves its existing owner-only access policy.

Vercel: vercel.json selects Next.js and build:vercel (next build --webpack). Vercel runs a browser-storage demonstration without the Sites dispatcher, D1 or R2. Cloudflare/Sites builds continue to use npm run build. Vercel must not trust visitor-supplied Sites identity headers.
