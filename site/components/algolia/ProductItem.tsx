import React from 'react'

export function ProductItem({ hit, components }: any) {
  return (
    <a href={`/product/${hit.objectID}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="ep_name" />
        </div>
      </div>
    </a>
  )
}
