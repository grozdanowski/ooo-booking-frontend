/* eslint-disable @next/next/no-img-element */
import styles from './Footer.module.scss'

export default function Footer () {

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerCopyright}>
        Copyright © {new Date().getFullYear()} OOO Booking.<br />All rights reserved.
      </div>
      <div className={styles.footerReferral}>
        <span className={styles.footerReferralLabel}>design&code nibbled by</span>
        <a href="https://www.bytepanda.io" target="_blank" rel="noreferrer">
          <img src="/img/logos/bytepanda-logo-hor.svg" alt="BytePanda" />
        </a>
      </div>
    </footer>
  )
}