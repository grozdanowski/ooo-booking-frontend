/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './MainGraphic.module.scss'

export default function MainGraphic ({ imgSrc, graphicType = 'fixed' }) {

  const [elementWidth, setElementWidth] = React.useState(0);
  const [animationGo, setAnimationGo] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setElementWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  React.useEffect(() => {
    setAnimationGo(true);
  }, [])

  const styleObj1 = {
    position: 'fixed',
    width: `${elementWidth}px`,
    backgroundImage: `url('${imgSrc}')`
  }

  const styleObj2 = {
    position: 'fixed',
    width: `${elementWidth}px`,
    backgroundImage: `url('/img/decorative/ooo-logo-graphic-decorative.svg')`
  }

  if (graphicType === 'article') {
    return (
      <div className={styles.mainGraphicContainer} id="site-graphic-wrapper">
        <div className={styles.articleGraphic} style={elementWidth ? styleObj1 : { backgroundImage: `url('${imgSrc}')` }} ref={ref} id="site-graphic-container" />
      </div>
    )
  } else {
    return (
      <div className={styles.mainGraphicContainer} id="site-graphic-wrapper">
        <div className={styles.fixedGraphic} style={elementWidth ? styleObj2 : { backgroundImage: `url('/img/decorative/ooo-logo-graphic-decorative.svg')` }} ref={ref} id="site-graphic-container">
          {imgSrc && [
            <img key='graphic-1' src={imgSrc} role='presentation' className={`${styles.artistMainImage} ${styles.imageClone1} ${animationGo && styles.go}`} />,
            <img key='graphic-2' src={imgSrc} role='presentation' className={`${styles.artistMainImage} ${styles.imageClone2} ${animationGo && styles.go}`} />,
            <img key='graphic-3' src={imgSrc} role='presentation' className={`${styles.artistMainImage} ${animationGo && styles.go}`} />
          ]}
        </div>
      </div>
    )
  }
}