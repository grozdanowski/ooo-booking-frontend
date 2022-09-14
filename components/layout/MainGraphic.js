/* eslint-disable @next/next/no-img-element */
import styles from './MainGraphic.module.scss'

export default function MainGraphic ({ imgSrc, graphicType = 'fixed' }) {

  if (graphicType === 'article') {
    return (
      <div className={styles.mainGraphicContainer} id="site-graphic-wrapper">
        <div className={styles.articleGraphic} id="site-graphic-container" style={{ backgroundImage: `url('img/test/testarticlesideimage.jpg')` }} />
      </div>
    )
  } else {
    return (
      <div className={styles.mainGraphicContainer} id="site-graphic-wrapper">
        <div className={styles.fixedGraphic} id="site-graphic-container" style={{ backgroundImage: `url('img/decorative/ooo-logo-graphic-decorative.svg')` }}>
          {imgSrc && [
            <img key='graphic-1' src="img/test/remi--720px.png" alt="{{page.title}}" className={`${styles.artistMainImage} ${styles.imageClone1} ${styles.go}`} />,
            <img key='graphic-2' src="img/test/remi--720px.png" alt="{{page.title}}" className={`${styles.artistMainImage} ${styles.imageClone2} ${styles.go}`} />,
            <img key='graphic-3' src="img/test/remi--720px.png" alt="{{page.title}}" className={`${styles.artistMainImage} ${styles.go}`} />
          ]}
        </div>
      </div>
    )
  }
}