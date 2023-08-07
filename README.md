# LanceDB Chatbot - NextJS Template
Use an AI chatbot with website context retrieved from a vector store like LanceDB. LanceDB is lightweight and can be embedded directly into NextJS, with data stored on-prem.

![Demo website landing page](https://i.imgur.com/Hk7tXgu.png)

## Deployment
 You can find deployment options for NextJS [here](https://nextjs.org/docs/pages/building-your-application/deploying). Note that currently we do not support deployment on Vercel, due to the `50 mb` serverless function code limit.

To deploy this template, you will need to set environment variables `OPENAI_API_KEY` and `BASE_URL`. You can get an OpenAI AI key [here](https://openai.com/blog/openai-api). The `BASE_URL` is the url to your deployed website.

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

## LanceDB on NextJS

Since LanceDB contains a prebuilt Node binary, you must configure `next.config.js` to include the following (this is already done in this template):
```js
/** @type {import('next').NextConfig} */
module.exports = ({
  webpack(config, { isServer }) {
    if (isServer) {
      config.module.rules.push({
        test: /[/\\]node_modules[/\\]vectordb[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
        }
      })
    }
    return config;
  }
})
```