import dynamic from 'next/dynamic'
import { Builder, withChildren } from '@builder.io/react'

export default {
  // Put your Builder public API key here:
  apiKey: '1c3b72c36b194b318c40d99ec0a3bf75',
}

// Register some components to be used in the drag and drop editor
// https://www.builder.io/c/docs/custom-components-setup
Builder.registerComponent(
  // We dynamically import components so they are only downloaded in the browser
  // when used
  dynamic(() => import('../components/ui/Hero')),
  {
    name: 'Hero',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fa40b94ab257547c48e4ed8615d3c9d68',
    inputs: [
      {
        name: 'headline',
        type: 'text',
        defaultValue: 'I am the headline',
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: 'I am the description',
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(() => import('../components/common/Searchbar')),
  {
    name: 'Searchbar',
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff1dee4516d6f49439b6eca475e4e6848',
  }
)
Builder.registerComponent(
  dynamic(() => import('../components/ui/Rating')),
  {
    name: 'Rating',
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F086de4d35afb4b86970018a5c1f58df8',
    inputs: [
      {
        name: 'value',
        type: 'number',
        defaultValue: 4,
      },
    ],
  }
)
Builder.registerComponent(
  dynamic(() => import('../components/ui/ButtonLink')),
  {
    name: 'Button',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fadc7254196504a81b673f48f17185469',
    inputs: [
      {
        name: 'link',
        type: 'url',
        defaultValue: '',
        required: true,
      },
      {
        name: 'text',
        type: 'text',
        defaultValue: 'Click me',
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(async () =>
    withChildren((await import('../components/ui/Container')).default)
  ),
  {
    name: 'Container',
    canHaveChildren: true,
    defaultStyles: {
      minHeight: '100px',
    },
    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1acf9d437adb4130a6b15fcf761fcc98',
  }
)

Builder.registerComponent(
  dynamic(() => import('../components/common/ProductCell/ProductCell')),
  {
    name: 'Product Cell',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fbe08488e714c4db0ad3739261b671f42',
    inputs: [
      // Use an E-commerce integration for your platform to auto populate this list:
      // https://www.builder.io/c/docs/plugins-ecom-overview
      {
        name: 'slug',
        type: 'string',
        enum: ['new-short-sleeve-t-shirt', 'lightweight-jacket'],
        defaultValue: 'lightweight-jacket',
      },
      {
        name: 'variant',
        type: 'string',
        defaultValue: 'default',
        enum: ['default', 'slim', 'simple'],
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(async () =>
    withChildren(await (await import('../components/ui/Collapse')).default)
  ),
  {
    name: 'Collapse',
    canHaveChildren: true,
    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F8c248a867984405eb470b26978267528',
    inputs: [
      { name: 'title', type: 'text', defaultValue: 'Drop blocks inside me!' },
    ],
  }
)

// Register a custom insert menu to organize your custom componnets
// https://www.builder.io/c/docs/custom-components-visual-editor#:~:text=than%20this%20screenshot.-,organizing%20your%20components%20in%20custom%20sections,-You%20can%20create
Builder.register('insertMenu', {
  name: 'My Components',
  items: [
    { name: 'Hero' },
    { name: 'Button' },
    { name: 'Searchbar' },
    { name: 'Collapse' },
    { name: 'Rating' },
    { name: 'Container' },
    { name: 'Product Cell' },
  ],
})
