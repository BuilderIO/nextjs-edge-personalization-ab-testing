import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import { parsePersonalizedURL } from '@builder.io/personalization-utils/next'
import { useIsPreviewing, BuilderComponent, builder } from '@builder.io/react'
import builderConfig from '../../../config/builder'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { addAsyncProps } from '../../../lib/add-async-props'

builder.init(builderConfig.apiKey)

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string; hash?: string[] }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise

  const { attributes } = parsePersonalizedURL(params?.hash || [])
  const builderSection =
    (await builder
      .get('product-editorial', {
        userAttributes: {
          ...attributes,
          product: params?.slug,
        },
      })
      .promise()) || null

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  if (builderSection) {
    await addAsyncProps(builderSection)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories,
      builderSection,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  }
}

export default function ProductPage({
  product,
  relatedProducts,
  builderSection,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewingInBuilder = useIsPreviewing()

  useEffect(() => {
    if (router.query.slug?.includes('jacket')) {
      Cookies.set(
        'personalization.audience',
        JSON.stringify(['jacket-shopper'])
      )
    }
    if (router.query.slug?.includes('shirt')) {
      Cookies.set('personalization.audience', JSON.stringify(['shirt-shopper']))
    }
  })

  return router.isFallback && !isPreviewingInBuilder ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <ProductView product={product} relatedProducts={relatedProducts} />
      {(builderSection || isPreviewingInBuilder) && (
        <BuilderComponent model="product-editorial" content={builderSection} />
      )}
    </>
  )
}

ProductPage.Layout = Layout
