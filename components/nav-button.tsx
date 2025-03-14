import Link from 'next/link'

import styles from './nav-button.module.scss'

type ButtonProps = React.LinkHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
  className?: string
  href: string
}

export default function NavButton({ children, className, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${className}`}>
      {children}
    </Link>
  )
}
