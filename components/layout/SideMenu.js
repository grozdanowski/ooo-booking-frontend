import Link from 'next/link.js'
import { useRouter } from 'next/router.js'
import React from 'react'
import styles from './SideMenu.module.scss'

const testMenuItems = [
  {
    label: {
      hr: 'Naslovna',
      en: 'Home'
    },
    target: '/',
  },
  {
    label: {
      hr: 'Roster',
      en: 'Roster',
    },
    target: '/roster',
    children: [
      {
        label: {
          hr: 'ABOP',
          en: 'ABOP',
        },
        target: '/roster/abop',
      },
      {
        label: {
          hr: 'Elemental',
          en: 'Elemental',
        },
        target: '/roster/elemental',
      },
    ],
  },
  {
    label: {
      hr: 'Vijesti',
      en: 'News'
    },
    target: '/news',
  },
  {
    label: {
      hr: 'O nama',
      en: 'About us'
    },
    target: '/about',
  },
  {
    label: {
      hr: 'Kontakt',
      en: 'Contact us'
    },
    target: '/contact',
  },
]

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
      onClick={() => { item.children?.length && setItemExpanded(!itemExpanded) }}  
    >
      {item.children?.length ? (
        <span className={styles.itemLabel}>{item.label[router.locale]}</span>
      ) : (
        <Link href={item.target}><span className={styles.itemLabel}>{item.label[router.locale]}</span></Link>
      )}
      {item.children?.length && (
        <ul className={styles.submenuGroup}>
          {item.children.map((subItem, subIndex) => {
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

export default function SideMenu ({ menuItems = testMenuItems }) {

  const router = useRouter();
  console.log(router.locales)

  return (
    <nav className={styles.sideMenu}>
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
                <Link href='/' locale={locale}>
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