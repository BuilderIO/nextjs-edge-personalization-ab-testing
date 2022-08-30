import Button from '../Button/Button'
import Link from '../Link'

export interface ButtonLinkProps {
  link: string
  text: string
}

const ButtonLink: React.FC<ButtonLinkProps> = (props: ButtonLinkProps) => {
  return (
    <Button Component={Link} href={props.link}>
      {props.text}
    </Button>
  )
}

export default ButtonLink
