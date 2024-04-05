import { NextResponse, NextRequest } from 'next/server'
import { getPersonalizedURL } from '@builder.io/personalization-utils/next'

// Any page not included in here needs to handle the personalization rewrite
const noPersonalizePaths = [
  '/api',
  '/_next',
  '/search',
  '/orders',
  '/profile',
  '/search',
  '/wishlist',
  '/favicon',
]

const shouldRewrite = (pathname: string) => {
  for (const path of noPersonalizePaths) {
    if (pathname.startsWith(path)) {
      return false
    }
  }
  // don't rewrite for asset requests (has a file extension)
  return !pathname.includes('.')
}

export default function middleware(request: NextRequest) {
  if (shouldRewrite(request.nextUrl.pathname)) {
    const sourcePath = request.nextUrl.pathname
    const rewrite = getPersonalizedURL(request, {
      cookiesPrefix: 'personalization',
    })

    // Log the rewrite that occured
    console.info(
      'rewrote',
      sourcePath,
      'to',
      rewrite.pathname,
      'with params',
      atob(rewrite.pathname.split('/').at(-1)!)
    )

    return NextResponse.rewrite(rewrite)
  }
  return NextResponse.next()
}
