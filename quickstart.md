## Quick Start

#### Clone repo and unzip the demo space files

The file `builder-demo-space.zip` contains the space clone that we're going to use to initialize your new space in the following steps.
```
git clone git@github.com:BuilderIO/nextjs-edge-personalization-demo.git
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
