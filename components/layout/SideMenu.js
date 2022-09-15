import Link from 'next/link.js'
import { useRouter } from 'next/router.js'
import React from 'react'
import styles from './SideMenu.module.scss'

const localesMap = {
  'hr': {
    label: 'Hrvatski',
  },
  'en': {
    label: 'English',
  }
}

function MainMenuItem ({ item, index }) {

  const [itemExpanded, setItemExpanded] = React.useState(false);

  const router = useRouter();

  return (
    <li
      className={`${styles.mainItem} ${itemExpanded && styles.itemExpanded}`}
      onClick={() => { item.childItems?.length && setItemExpanded(!itemExpanded) }}  
    >
      {item.childItems?.length ? (
        <span className={styles.itemLabel}>{item.label[router.locale]}</span>
      ) : (
        <Link href={item.target}><span className={styles.itemLabel}>{item.label[router.locale]}</span></Link>
      )}
      {item.childItems?.length && (
        <ul className={styles.submenuGroup}>
          {item.childItems.map((subItem, subIndex) => {
            return (
              <li key={`item-${index}-${subIndex}`} className={styles.mainItem}>
                <Link href={subItem.target}><span className={styles.subitemLabel}>{subItem.label[router.locale]}</span></Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default function SideMenu ({ menuItems, mobileMenuActive }) {

  const router = useRouter();

  return (
    <nav className={`${styles.sideMenu} ${mobileMenuActive && styles.menuActive}`}>
      <ul className={styles.mainNavGroup}>
        {menuItems.map((item, index) => {
          return (
            <MainMenuItem key={`item-${index}`} item={item} index={index} />
          )
        })}
        <li className={styles.menuSpacer}></li>
        {router.locales.map((locale) => {
          if (router.locale !== locale) {
            return (
              <li key={`locale-${locale}`} className={styles.mainItem}>
                <Link href={router.asPath} locale={locale}>
                  <span className={styles.itemLabel}>{localesMap[locale].label}</span>
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}