# Century Convention Center Website

Premium, modern, and fully responsive website for Century Convention Center — a professional digital brochure for weddings, corporate events, conferences, and celebrations.

## Tech Stack

- **Next.js 15** with App Router
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** — animations
- **Swiper.js** — gallery sliders
- **shadcn/ui** — UI components
- **React Hook Form** + **Zod** — form validation
- **Resend** — contact form emails

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form |
| `CONTACT_EMAIL` | Email to receive inquiries |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |

## Site Structure

```
/           Home
/about      About Us
/services   Services
/facilities Facilities
/gallery    Gallery
/contact    Contact Us
```

## Deployment

Optimized for [Vercel](https://vercel.com). Connect your repository and set environment variables in the dashboard.

## Customization

Update venue details in `src/lib/site-config.ts` and content in `src/lib/data.ts`.
