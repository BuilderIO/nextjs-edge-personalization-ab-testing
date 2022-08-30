# Next.js + Builder.io Edge Personalization Demo

This is a fork of [Next.js Commerce](https://github.com/vercel/commerce) with [Builder.io](https://www.builder.io) integrated and using [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) to personalize pages with great performance.

## Get Started

### Run Locally

After you clone this repo, from the project root:

#### Run the dev server

```bash
yarn # run this command in root folder of the mono repo
yarn dev
```

#### Connect Builder.io

To connect [Builder.io](https://www.builder.io), create a [free account](https://www.builder.io/signup), from your account settings copy your Public API Key and paste it into [site/config/builder.ts](site/config/builder.ts#L6:L6)

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fafd38ce9af0b4f25988759f8c5936fe5" alt="Screenshot of copying your API key">

#### Set your Preview URL

Next, head to [builder.io/models](https://builder.io/models) and choose the `page` model and enter `http://localhost:3000` as the [preview URL](https://www.builder.io/c/docs/guides/preview-url), and then hit `save` at the top right of the page.

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fb3bd5b2015e3450985cc69910e368c9d" alt="Screenshot of adding your Preivew URL in Builder.io">

#### Configure personalization attributes

Now, in Builder.io add some [targeting attributes](https://www.builder.io/c/docs/custom-targeting-attributes) to begin personalizing your content on. Head to [builder.io/account](https://builder.io/account) and click on the pencil next to `Custom targeting attributes` and add some attributes, for instance like you see here:

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fff38618c937a4adda2fbaba4a445a38c" alt="Screenshots of the targeting UI configuration">

Above, we create an attribute called `returnVisitor` that is a boolean that we set [here](site/pages/_app.tsx#L19) so it can be read by edge middleware, as well as an attribute called `audience` that is an `enum` of a couple made up segments like `shirt-shipper` and `jacket-shopper` that we set <a href="site/pages/product/%5Bslug%5D/%5B%5B...hash%5D%5D.tsx#L96:L104">here</a> via browsing history (could alternatively be set upon add to cart or other actions).

Note: generally `audiences` should come from a CDP, like

```js
myCdp.getAudiences().then((audiences) => {
  // assuming audiences is an array of strings, like ['shirt-shipper', 'jacket-shopper']
  Cookies.set('personalization.audience', JSON.stringify(audiences))
})
```

#### Create a page

Now, go to [builder.io/content](https://builder.io/content) and choose the `+ new` button, choose `page`, and drag and drop to create a page on your Next.js site with your React components!

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F4c04f8deda7d4f9d89868323d18d5310" alt="Image of creating a page and editing visually">

> :warning: **If you are having trouble connecting**: be sure you are running your dev server on `http://localhost:3000` by running `yarn dev` from this project root like shown [above](#run-the-dev-server)

#### Target and publish your page

At the top of the editor, you can configure which audiences should see this page variant, and publish.

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fe1d25b04a2914bcbb59912140939bf1a" alt="Screenshots of targeting your page">

### Deploy to Vercel

To get your site live, you can [deploy it to Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app/deploy). Be sure to use the following configuration:

- **Framework preset**: Next.js
- **Build command**: `cd .. && yarn build`

<img alt="Screenshot of the Vercel configuration" src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F2513e3f0ac804cc2b313a6e6e87876ba">

Once you deploy to vercel, you can update your Preview URL to use the live URL so now others on your team can create content on your new site with Builder.io.

E.g. if your site is now live at `https://my-site.vercel.app`, you can go back to [builder.io/models](https://builder.io/models), choose the `page` model, and update your Preview URL to `https://my-site.vercel.app` and save.

<img alt="Screenshot of updating your Preview URL" src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F09ab3eadebe5453883f77e60c97a9eba">

### Explore the code

Some key places to look

- [site/config/builder.ts](site/config/builder.ts) is where we configure Builder.io custom components and settings
- <a href="site/pages/[[...pages]].tsx">site/pages/[[...pages]].tsx</a> is where we integrate page building, including fetching data from Builder.io and rendering it
- [site/middleware.ts](site/middleware.ts) is where we create and configure the edge middleware for personalizing pages

### Next Steps

Learn more about

- Developing with [Builder.io](https://www.builder.io/c/docs/developers)
- Registering custom components with [Builder.io](https://www.builder.io/c/docs/custom-components-intro)
- Learn more about [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware) and [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)
- Learn more about the [Next.js personalization](https://github.com/BuilderIO/builder/blob/main/packages/personalization-utils/README.md) utils used in this example

### Troubleshooting

Run into any issues? [Chat with us in discord](https://discord.gg/TjSStcmuWN)!
