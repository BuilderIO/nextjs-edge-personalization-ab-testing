import React, { FC } from 'react'
import { Container } from '@components/ui'
import s from './Hero.module.css'
interface HeroProps {
  className?: string
  headline: string
  description: string
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="bg-accent-9 border-b border-t border-accent-2">
      <Container>
        <div className={s.root}>
          <h2 className={s.title}>{headline}</h2>
          <div className={s.description}>
            <p>{description}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
