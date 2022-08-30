import { useEffect, useState } from 'react'
import type { Product } from '@commerce/types/product'
import { LoadingDots } from '../../ui'
import { ProductCard } from '../../product'

export interface ProductCellProps {
  slug: string
  product?: Product
  variant?: 'default' | 'slim' | 'simple'
}

export default function ProductCell(props: ProductCellProps) {
  const [localProduct, setLocalProduct] = useState(null)

  const product = props.product || localProduct

  useEffect(() => {
    if (props.slug && !props.product) {
      fetch(`/api/products/${props.slug}`)
        .then((res) => res.json())
        .then(({ product }) => {
          setLocalProduct(product)
        })
    }
  }, [props.slug, props.product])
  return !product ? (
    <LoadingDots />
  ) : (
    <ProductCard variant={props.variant} product={product} />
  )
}
