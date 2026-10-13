# VexoraTube

**A video-sharing community built for discovery, creativity, and connection.**

VexoraTube is a social video platform frontend built with React and TypeScript, with Supabase planned as its backend.

## Tech stack

- **Vite** — development server and production bundler
- **React 18** — UI
- **TypeScript** — strict type checking
- **Tailwind CSS** — utility-first styling
- **React Router v6** — client-side routing
- **TanStack Query v5** — server-state management
- **Zustand** — client-state management
- **Supabase JS** — backend client
- **React Hook Form + Zod** — forms and validation
- **date-fns** — date utilities
- **lucide-react** — icons

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)

## Getting started

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/ameerhassank1han-boop/VexoraTube.git
   cd VexoraTube
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your local environment file from the example:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Supabase project URL and anon/publishable key, along with the app settings:

   ```dotenv
   VITE_SUPABASE_URL=https://jlotcayacovixvycosom.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
   VITE_APP_NAME=VexoraTube
   VITE_APP_URL=http://localhost:5173
   ```

   Keep `.env` local; it is ignored by Git. Never put a Supabase service-role key or other secret in a Vite `VITE_*` variable.

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL printed by Vite (normally http://localhost:5173).

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project checks and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript project checks |

## Project status

The initial frontend scaffold and routing are in place. The home route currently displays a “coming soon” page. Supabase schema, policies, and backend setup are managed separately; the frontend still needs its feature screens and data integration.

## License

No license has been specified yet.
