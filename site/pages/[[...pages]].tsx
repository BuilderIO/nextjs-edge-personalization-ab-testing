import commerce from '@lib/api/commerce'
import { NextSeo } from 'next-seo'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import builderConfig from '../config/builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { parsePersonalizedURL } from '@builder.io/personalization-utils/next'
import { Layout } from '@components/common'
import { useEffect } from 'react'
import { addAsyncProps } from '../lib/add-async-props'

builder.init(builderConfig.apiKey)

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }
  const { categories } = await commerce.getSiteInfo({ config, preview })
  const { attributes } = parsePersonalizedURL(params!.pages || [])
  const page =
    (await builder
      .get('page', {
        apiKey: builderConfig.apiKey,
        userAttributes: attributes!,
        cachebust: true,
      })
      .promise()) || null

  if (page) {
    await addAsyncProps(page)
  }

  return {
    props: {
      page,
      categories,
      attributes: attributes,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function Pages({
  page,
  attributes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isPreviewingInBuilder = useIsPreviewing()

  useEffect(() => {
    builder.setUserAttributes(attributes!)
  }, [])

  const { title, description } = page?.data || {}
  return (
    <>
      <Head>
        {!page && <meta name="robots" content="noindex" />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title,
          description,
        }}
      />
      {isPreviewingInBuilder || page ? (
        <BuilderComponent model="page" content={page} />
      ) : (
        <DefaultErrorPage statusCode={404} />
      )}
    </>
  )
}

Pages.Layout = Layout
