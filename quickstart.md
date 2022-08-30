## Quick Start

You can use the Builder.io CLI to spin up your Builder space, fully configured, faster than from scratch.

#### Clone repo and unzip the demo space files

The file `builder-demo-space.zip` contains the space clone that we're going to use to initialize your new space in the following steps.

```bash
git clone https://github.com/BuilderIO/nextjs-edge-personalization-demo.git
cd nextjs-edge-personalization-demo
unzip builder-demo-space.zip
```

#### Get your Builder.io private key

Head over to your [organization settings page](https://builder.io/account/organization?root=true) and create a
private key, copy the key for the next step.

<img alt="Copying your private key screenshot" src="https://cdn.builder.io/api/v1/image/assets%2F1acd978ac4f64052bbfa787026e93509%2Fc1e3e3e6721f44808ecc1f064585603d">

#### Initialize a Builder.io space

Next, replace `<private-key>` with the key you copied in the previous step

```
npm install --global "@builder.io/cli"

builder create --key "<private-key>" --name "Next.js Personalization" --debug
```

You will be greeted with a message that includes a public API key for your newly minted Builder.io space.

```bash
Your new space "my space" public API Key: 012345abcdef0123456789abcdef0123
```

#### Add your Builder.io public key to this project

Finally, copy your Public API Key and paste it into [site/config/builder.ts](site/config/builder.ts#L6:L6)

#### Set your Preview URL

Once you deploy to vercel, you can update your Preview URL to use the live URL so now others on your team can create content on your new site with Builder.io.

E.g. if your site is now live at `https://my-site.vercel.app`, you can go back to [builder.io/models](https://builder.io/models), choose the `page` model, and update your Preview URL to `https://my-site.vercel.app` and save.

<img alt="Screenshot of updating your Preview URL" src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2F09ab3eadebe5453883f77e60c97a9eba">

> Alternatively, you can use local URLs as described [here](./README.md#set-your-preview-url).

Additionally, you may want to update your `Site Url` over in your [account settings](https://builder.io/account/) to use this URL as well
