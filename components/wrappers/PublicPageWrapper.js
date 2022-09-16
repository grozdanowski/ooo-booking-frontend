import TransitionEffect from '/utils/PageTransitionWrapper'
import styles from './PublicPageWrapper.module.scss'
import Head from 'next/head'
import Header from '../layout/Header'
import SideMenu from '../layout/SideMenu'
import MainGraphic from '../layout/MainGraphic'
import React from 'react'
import Footer from '../layout/Footer'
import Script from 'next/script'

export default function PublicPageWrapper({ sideGraphic, sideGraphicType, menuItems, siteGlobalSettings, children }) {

  const [mobileMenuActive, setMobileMenuActive] = React.useState(false);

  return (
    <div className={styles.oooBodyWrapper}>
      <Head>
        {/* add more */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="favicon/favicon-128.png" sizes="128x128" />
        <link rel="shortcut icon" href="favicon/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="favicon/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="favicon/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="favicon/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="favicon/mstile-310x310.png" />
      </Head>
      {siteGlobalSettings.googleAnalyticsCode && (
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '${siteGlobalSettings.googleAnalyticsCode}', 'auto');
            ga('send', 'pageview');
          `}
        </Script>
      )}

      <div className={styles.oooMainSidebar}>
        <Header mobileMenuActive={mobileMenuActive} setMobileMenuActive={setMobileMenuActive} />
        <SideMenu menuItems={menuItems} mobileMenuActive={mobileMenuActive} setMobileMenuActive={setMobileMenuActive} />
      </div>

      <main className={styles.oooMainContent}>
        {children}
      </main>

      <MainGraphic imgSrc={sideGraphic} graphicType={sideGraphicType} />

      <Footer />

    </div>
  )
}