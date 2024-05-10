# nmdb-client

## Next Movie DB - Final Year Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

Before running the project, make sure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

### Running the Development Server

First, install the project dependencies:

```bash
npm install
# or
yarn install

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting Up Authentication Locally

To set up authentication for local development, follow the guide provided by AuthJS:

- [AuthJS OAuth Guide](https://authjs.dev/getting-started/authentication/oauth)

This guide will help you configure OAuth authentication, which is essential for logging in to the application locally.

Ensure you have created OAuth credentials (Client ID and Client Secret) in your OAuth provider's console and have set up the necessary redirect URIs pointing to your local development environment, typically `http://localhost:3000/api/auth/callback/provider-name`.

#### Environment Variables

Add the following environment variables to your `.env.local` file:

```plaintext
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
```

Replace `your_oauth_client_id` and `your_oauth_client_secret` with your actual OAuth credentials.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

For more details on deploying to Vercel, visit:

- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
