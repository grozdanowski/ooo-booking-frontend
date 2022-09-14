import { useRouter } from 'next/router'
import styles from './ContentBlocks.module.scss'

export function BlockWrapper ({ reducedPadding = false, sectionName, children }) {

  return (
    <section className={`${styles.blockStandardSidebar} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          {sectionName}
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        {children}
      </div>
    </section>
  )
}

export function BigOooTitle ({ title, content, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.bigOooTitle} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <h1 className={styles.h1TitleFuzzy}>
          {title[router.locale]}
        </h1>
        <div className={styles.subtitle}>
          {content[router.locale]}
        </div>
      </div>
    </section>
  )
}

export function StaticTitleSection ({ title, content, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.staticTitleSection} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <h1 className={styles.h1TitleFuzzy}>
          {title[router.locale]}
        </h1>
        <div className={styles.largerParagraph}>
          {content[router.locale]}
        </div>
      </div>
    </section>
  )
}

export function StaticRichtextSection ({ sectionName, content, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.staticRichtextSection} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          {sectionName[router.locale]}
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        {content[router.locale]}
      </div>
    </section>
  )
}

export function NewsArticleHeader ({ author, dateTime }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.newsArticleHeader} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <strong>{author}</strong>  |  {dateTime}
      </div>
    </section>
  )
}

export function NewsArticleTitle ({ title }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.newsArticleTitle} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <h1>{title[router.locale]}</h1>
      </div>
    </section>
  )
}