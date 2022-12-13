# Next.js + Builder.io Personalization & A/B Testing with Edge Middleware

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBuilderIO%2Fnextjs-edge-personalization-demo&project-name=nextjs-edge-personalization-builder-io&repository-name=nextjs-edge-personalization-builder-io&demo-title=Next.js%20Edge%20Personalization%20with%20Builder.io&demo-description=Visually%20build%20a%20personalized%20Next.js%20site%20using%20Edge%20Middleware%20and%20Builder.io&demo-url=https%3A%2F%2Fnextjs-edge-personalization-demo.vercel.app%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F844291%2F187518010-ac87a42e-74de-46a0-b0c1-c8e2d97af547.gif&build-command=cd%20..%20%;%20yarn%20build&root-directory=site)

This is a fork of [Next.js Commerce](https://github.com/vercel/commerce) with [Builder.io](https://www.builder.io) integrated and using [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) to personalize pages with targeting and a/b testing with great performance.

[Try it here](https://builder.io/demo/commerce?demoHost=nextjs-edge-personalization-demo-git-editor-demo-builder-io.vercel.app&demoModel=page)

![Video demo of personalized site](https://user-images.githubusercontent.com/844291/187516199-bd09d52b-f44e-4c41-8f00-2079ab8820bc.gif)

## Contents

- [Overview](#overview)
- [How this works](#how-this-works)
- [Get Started](#get-started)
- [Explore the code](#explore-the-code)
- [Next Steps](#next-steps)

## Overview

View an in depth overview of Builder.io + Vercel Edge Functions [here](https://www.youtube.com/watch?v=whn2o0LlJyA).

<a href="https://www.youtube.com/watch?v=whn2o0LlJyA">
<img width="600" alt="Video Thumbnail for the in depth overview of Builder.io + Vercel Edge Functions" src="https://user-images.githubusercontent.com/844291/188515922-f58cf541-5543-441d-85bf-dfb37427734f.png">
</a>


## How this works

<img alt="Diagram of the personalization strategy" src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4e7efe97686642f4805552bc075263e3">

In short, to personalize a page, we rewrite a basic path to a path + a hash of personalized attribtues.

For instance, if you have a `pages/page.tsx`, you can rename it to `pages/page/[hash].tsx`, and add it to be included into the rewriting [middleware](site/middleware.ts) to add the personalized hash at the end.

You can now have your page return personalized content based on what is in the hash, and this is purely automatic via what `personalization.*` cookies are present.

You can set them at any time to target off of, for instance:

```js
Cookies.set('personalization.returnVisitor', 'true')
```

And now your `/page` will be rewritten to `/page/returnVisitor=true` when that cookie is present, and be handled accordingly.

You can learn more about this technique [here](https://www.builder.io/blog/using-cookies-and-query-string-in-nextjs-static-pages).

Then, you can visually create and edit pages, sections, and data on your site with Builder.io's visual editor, dragging and dropping with your React components and publish unlimited variations to your site without any code or deploys needed:

![Example of editing in Builder.io](https://user-images.githubusercontent.com/844291/187518010-ac87a42e-74de-46a0-b0c1-c8e2d97af547.gif)

## Get Started

### Run Locally

#### Clone this repo

```bash
git clone https://github.com/BuilderIO/nextjs-edge-personalization-demo.git
cd nextjs-edge-personalization-demo
```

#### Run the dev server

Next, from the project root:

```bash
yarn # run this command in root folder of the mono repo
yarn dev
```

#### Connect Builder.io

To connect [Builder.io](https://www.builder.io), create a [free account](https://www.builder.io/signup), from your account settings copy your Public API Key and paste it into [site/config/builder.ts](site/config/builder.ts#L6:L6).

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fafd38ce9af0b4f25988759f8c5936fe5" alt="Screenshot of copying your API key">

#### Set your Preview URL

Next, head to [builder.io/models](https://builder.io/models) and choose the `page` model and enter `http://localhost:3000` as the [preview URL](https://www.builder.io/c/docs/guides/preview-url), and then hit `save` at the top right of the page.

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fb3bd5b2015e3450985cc69910e368c9d" alt="Screenshot of adding your Preivew URL in Builder.io">

#### Configure personalization attributes

Now, in Builder.io add some [targeting attributes](https://www.builder.io/c/docs/custom-targeting-attributes) to begin personalizing your content on. Head to [builder.io/account](https://builder.io/account) and click on the pencil next to `Custom targeting attributes` and add some attributes; for instance as in this next image:

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

### Deploy to Netlify

No work needed, just connect your repo to Netlify!

### Deploy to Vercel

To get your site live, you can [deploy it to Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app/deploy). Be sure to use the following configuration:

- **Framework preset**: Next.js
- **Build command**: `cd .. && yarn build`

<img alt="Screenshot of the Vercel configuration" src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F2513e3f0ac804cc2b313a6e6e87876ba">

Once you deploy to vercel, you can update your Preview URL to use the live URL so now others on your team can create content on your new site with Builder.io.

For example, if your site is now live at `https://my-site.vercel.app`, you can go back to [builder.io/models](https://builder.io/models), choose the `page` model, and update your Preview URL to `https://my-site.vercel.app` and save.

<img alt="Screenshot of updating your Preview URL" src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F09ab3eadebe5453883f77e60c97a9eba">

## Explore the code

Some key places to look in the codebase:

- [site/config/builder.ts](site/config/builder.ts) is where we configure Builder.io custom components and settings.
- <a href="site/pages/[[...pages]].tsx">site/pages/[[...pages]].tsx</a> is where we integrate page building, including fetching data from Builder.io and rendering it.
- [site/middleware.ts](site/middleware.ts) is where we create and configure the edge middleware for personalizing pages.

<img width="620" alt="Diagram of the tech stack used" src="https://user-images.githubusercontent.com/844291/187518090-e112e48c-e76e-41b5-9f81-8ecbf10a18c6.png">

## Next Steps

Learn more about:

- [Developing with Builder.io](https://www.builder.io/c/docs/developers)
- [Registering Custom Components with Builder.io](https://www.builder.io/c/docs/custom-components-intro)
- [Using Query Params and Cookies in Next.js Static Pages](https://www.builder.io/blog/using-cookies-and-query-string-in-nextjs-static-pages)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [Next.js personalization utils](https://github.com/BuilderIO/builder/blob/main/packages/personalization-utils/README.md) used in this example

### Troubleshooting

Run into any issues? [Chat with us in discord](https://discord.gg/TjSStcmuWN)!
