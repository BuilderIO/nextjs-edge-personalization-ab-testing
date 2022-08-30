import { BuilderContent } from '@builder.io/react'
import commerce from '@lib/api/commerce'
import { getAsyncProps } from '@builder.io/utils'

// Add async props to the components used in Builder for server side rendering
// More info: https://github.com/BuilderIO/builder/tree/main/packages/utils#getasyncprops
export async function addAsyncProps(content: BuilderContent) {
  if (!content) {
    return
  }

  await getAsyncProps(content as any, {
    // Prefetch the `product` prop for server side rendering
    'Product Cell': async (props: { slug: string }) => {
      return {
        product: await commerce
          .getProduct({
            variables: { slug: props.slug },
          })
          .then(({ product }: any) => product),
      }
    },
  })
}
