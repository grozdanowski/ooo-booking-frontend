/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header ({ mobileMenuActive, setMobileMenuActive }) {

  return (
    <header className={styles.oooHeader}>
      <button className={`${styles.mobileMenuTrigger} ${mobileMenuActive && styles.active}`} onClick={() => setMobileMenuActive(!mobileMenuActive)}>
      <span className={`${styles.triggerLine} ${styles.triggerLine1}`}></span>
        <span className={`${styles.triggerLine} ${styles.triggerLine2}`}></span>
        <span className={`${styles.triggerLine} ${styles.triggerLine3}`}></span>
      </button>
      <Link href='/'>
        <div className={styles.headerLogo}>
          <img className={styles.headerLogoDesktop} src='/img/logos/ooo-logo-variant-main.svg' alt='OutOfOffice Booking Homepage' />
          <img className={styles.headerLogoMobile} src='/img/logos/ooo-logo-alt-2.svg' alt='OutOfOffice Booking Homepage' />
        </div>
      </Link>
    </header>
  )
}