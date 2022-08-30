## Quick Start

#### Get your Builder.io private key

Head over to your [organization settings page](https://builder.io/account/organization?root=true) and create a
private key, copy the key for the next step.

- Visit the [organization settings page](https://builder.io/account/organization?root=true), or select
  an organization from the list 

![organizations drop down list](https://cdn.builder.io/api/v1/image/assets%2Fd3e7739f05c5462bad48687394709cb2%2F2367c6eb12fe44bdbf095f166744de69)

- Click "Account" from the left hand sidebar
- Click the edit icon for the "Private keys" row
- Copy the value of the auto-generated key, or create a new one with a name that's meaningful to you


![Example of how to get your private key](https://cdn.builder.io/api/v1/image/assets%2Faed6b584c866482d8b3bf8e7e0094c29%2Fda030852e03043e886b83a1b2d3c271a)

#### Initialize a Builder.io space

Next, replace `<private-key>` with the key you copied in the previous step, and change `<space-name>` to something that's
meaningful to you -- don't worry, you can change it later!

```
yarn install --global "@builder.io/cli"

builder create --key "<private-key>" --name "<space-name>" --debug
```


You will be greeted with a message that includes a public API key for your newly minted Builder.io space.

*Note: This command will also publish some starter builder.io cms
content from the ./builder directory to your new space when it's
created.*

``` bash
  ____            _   _       _                     _                    _   _ 
| __ )   _   _  (_) | |   __| |   ___   _ __      (_)   ___       ___  | | (_)
|  _ \  | | | | | | | |  / _` |  / _ \ | '__|     | |  / _ \     / __| | | | |
| |_) | | |_| | | | | | | (_| | |  __/ | |     _  | | | (_) |   | (__  | | | |
|____/   \__,_| |_| |_|  \__,_|  \___| |_|    (_) |_|  \___/     \___| |_| |_|

|████████████████████████████████████████| product-editorial: writing foo.json | 1/1
|████████████████████████████████████████| page: writing bar.json | 2/2


Your new space "my space" public API Key: 012345abcdef0123456789abcdef0123
```

copy your Public API Key and paste it into [site/config/builder.ts](site/config/builder.ts#L6:L6)

<img src="https://cdn.builder.io/api/v1/image/assets%2F1c3b72c36b194b318c40d99ec0a3bf75%2Fafd38ce9af0b4f25988759f8c5936fe5" alt="Screenshot of copying your API key">
</details>
