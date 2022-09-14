/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header () {

  return (
    <header className={styles.oooHeader}>
      <button className={styles.mobileMenuTrigger} id="mobile-menu-trigger">
        <span className={styles.triggerLine} id="trigger-line-1"></span>
        <span className={styles.triggerLine} id="trigger-line-2"></span>
        <span className={styles.triggerLine} id="trigger-line-3"></span>
      </button>
      <Link href='/'>
        <div className={styles.headerLogo}>
          <img className={styles.headerLogoDesktop} src='img/logos/ooo-logo-variant-main.svg' alt='OutOfOffice Booking Homepage' />
          <img className={styles.headerLogoMobile} src='img/logos/ooo-logo-alt-2.svg' alt='OutOfOffice Booking Homepage' />
        </div>
      </Link>
    </header>
  )
}