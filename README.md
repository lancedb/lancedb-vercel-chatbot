# LanceDB Chatbot - Vercel NextJS Template
Use an AI chatbot with website context retrieved from a vector store like LanceDB. LanceDB is lightweight and can be embedded directly into NextJS, with data stored on-prem.

## One click deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flancedb%2Flancedb-vercel-chatbot&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key%20for%20chat%20completion.&project-name=lancedb-vercel-chatbot&repository-name=lancedb-vercel-chatbot&demo-title=LanceDB%20Chatbot%20Demo&demo-description=Demo%20website%20chatbot%20with%20LanceDB.&demo-url=https%3A%2F%2Flancedb.vercel.app&demo-image=https%3A%2F%2Fi.imgur.com%2Fy1mhH9F.png)

![Demo website landing page](https://i.imgur.com/y1mhH9F.png)

## Development

First, rename `.env.example` to `.env.local`, and fill out `OPENAI_API_KEY` with your OpenAI API key. You can get one [here](https://openai.com/blog/openai-api).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about LanceDB or Next.js, take a look at the following resources:

- [LanceDB Documentation](https://lancedb.github.io/lancedb/) - learn about LanceDB, the developer-friendly serverless vector database.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## LanceDB on NextJS and Vercel

Since LanceDB contains a prebuilt Node binary, you must configure `next.config.js` to exclude it from webpack. In order to deploy it on Vercel, you need to make sure this binary is included in the output for the serverless functions.
```js
/** @type {import('next').NextConfig} */
module.exports = ({
  experimental: {
    outputFileTracingIncludes: {
      "src/app/api/**": [
          "node_modules/@lancedb/vectordb-linux-x64-gnu",
      ],
  },
  },
  webpack(config, { isServer }) {
    config.externals.push({ vectordb: 'vectordb' })
    return config;
  }
})
```

To deploy on Vercel, include the binary in serverless functions via the functions property of `vercel.json` as well.
```json
{
  "functions": {
    "src/app/api/**": {
      "includeFiles": "node_modules/@lancedb/vectordb-linux-x64-gnu/**"
    }
  }
}
```