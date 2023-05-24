import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import '@algolia/autocomplete-theme-classic/dist/theme.css'
import React, { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'
import { ProductItem } from './ProductItem'

const searchClient = algoliasearch(
  '3D5DQ7NIQP',
  '476e5cbce98781b0ed3a8168558bc013'
)

function Autocomplete(props: any) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render },

      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div style={{ height: 56, borderRadius: 12 }} ref={containerRef} />
}

export function AlgoliaAutoComplete(props: any) {
  console.log('autocomplete props', props)
  return (
    <div style={{ width: props.width }}>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query = '' }) => [
          {
            sourceId: 'products',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'Retail_Catalog_ea08671f',
                    query,
                  },
                ],
              })
            },
            templates: {
              item({ item, components }) {
                return <ProductItem hit={item} components={components} />
              },
            },
          },
        ]}
      />
    </div>
  )
}

export default AlgoliaAutoComplete
