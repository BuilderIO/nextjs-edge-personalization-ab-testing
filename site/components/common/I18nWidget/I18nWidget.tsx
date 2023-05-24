import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import s from './I18nWidget.module.css'
import { Cross, ChevronUp } from '@components/icons'
import ClickOutside from '@lib/click-outside'
import Cookies from 'js-cookie'
interface LOCALE_DATA {
  name: string
  img: {
    filename: string
    alt: string
  }
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  'fr-FR': {
    name: 'French',
    img: {
      filename:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1599px-Flag_of_France.svg.png',
      alt: '',
    },
  },
  'en-US': {
    name: 'English',
    img: {
      filename: 'flag-en-us.svg',
      alt: 'US Flag',
    },
  },
}

const I18nWidget: FC = () => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [display, setDisplay] = useState(false)
  const {
    locale,
    locales,
    defaultLocale = 'en-US',
    asPath: currentPath,
  } = useRouter()

  const currentLocale =
    (Cookies.get('personalization.locale') &&
      JSON.parse(Cookies.get('personalization.locale')!)) ||
    locale ||
    defaultLocale
  const options = locales?.filter((val) => val !== currentLocale)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  const flagFile = LOCALES_MAP[currentLocale].img.filename

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav className={s.root}>
        <div
          className="flex items-center relative"
          onClick={() => setDisplay(!display)}
        >
          <button className={s.button} aria-label="Language selector">
            <img
              width="20"
              height="20"
              className="block mr-2 w-5"
              src={flagFile.startsWith('https://') ? flagFile : `/${flagFile}`}
              alt={LOCALES_MAP[currentLocale].img.alt}
            />
            {options && (
              <span className="cursor-pointer">
                <ChevronUp className={cn(s.icon, { [s.active]: display })} />
              </span>
            )}
          </button>
        </div>
        <div className="absolute top-0 right-0">
          {options?.length && display ? (
            <div className={s.dropdownMenu}>
              <div className="flex flex-row justify-end px-6">
                <button
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel"
                  className={s.closeButton}
                >
                  <Cross className="h-6 w-6" />
                </button>
              </div>
              <ul>
                {options.map((locale) => (
                  <li key={locale}>
                    <div
                      className={cn(s.item)}
                      onClick={() => {
                        Cookies.set(
                          'personalization.locale',
                          JSON.stringify(locale)
                        )
                        location.reload()
                      }}
                    >
                      {LOCALES_MAP[locale].name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </ClickOutside>
  )
}

export default I18nWidget
