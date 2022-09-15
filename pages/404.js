import Head from 'next/head'
import NewsList from '../components/content/NewsList'
import groq from 'groq'
import SanityClient from '../utils/SanityClient'
import { BigOooTitle } from '/components/content/ContentBlocks'
import PublicPageWrapper from '/components/wrappers/PublicPageWrapper'
import { useRouter } from 'next/router'

export default function FourOuFour({ menuItems, siteGlobalSettings, pageContent, news }) {

  const router = useRouter();

  return (
    <PublicPageWrapper
      menuItems={menuItems}
      siteGlobalSettings={siteGlobalSettings}
      sideGraphic='/img/decorative/404-googly.png'
    >
      <Head>
        <title>404 | {siteGlobalSettings.siteTitle[router.locale]}</title>
        <meta name="description" content={siteGlobalSettings.siteDescription[router.locale]} />
      </Head>
      <BigOooTitle
        title={{
          en: `Sorry, we can't find that page!`,
          hr: `Hm, izgleda da stranica koju tražiš ne postoji :/`,
        }}
        content={{
          en: `How about trying a different one?`,
          hr: `Možda da probaš neku drugu?`,
        }}
      />
    </PublicPageWrapper>
  )
}

export async function getStaticProps({ locale }) {
  const news = await SanityClient.fetch(groq`
    *[_type == "newsArticle" && language == "${locale}"]|order(_createdAt desc)[0..2]
  `)
  const menuItems = await SanityClient.getDocument('siteMenu');
  const siteGlobalSettings = await SanityClient.getDocument('siteSettings');
  const pageContent = await SanityClient.getDocument('indexPage');
  return {
    props: {
      pageContent: pageContent,
      siteGlobalSettings: siteGlobalSettings,
      menuItems: menuItems.menuItems,
      news: news,
    }
  }
}