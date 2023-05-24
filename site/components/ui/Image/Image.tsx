import { Builder } from '@builder.io/react'
import React from 'react'

export default function Image(props: any) {
  return (
    <img
      alt={props.cloudinaryOptions?.alt || ''}
      {...props.attributes}
      src={
        props.cloudinaryOptions?.url ||
        'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a'
      }
      style={{
        aspectRatio: `1 / ${props.aspectRatio || 0.5}`,
        objectFit: props.fit,
      }}
    />
  )
}
