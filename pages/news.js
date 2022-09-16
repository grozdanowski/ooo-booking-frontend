import Head from 'next/head'
import NewsList from '../components/content/NewsList'
import groq from 'groq'
import SanityClient from '../utils/SanityClient'
import { BigOooTitle } from '/components/content/ContentBlocks'
import PublicPageWrapper from '/components/wrappers/PublicPageWrapper'
import { useRouter } from 'next/router'

export default function News({ menuItems, siteGlobalSettings, news }) {

  const router = useRouter();

  return (
    <PublicPageWrapper menuItems={menuItems} siteGlobalSettings={siteGlobalSettings}>
      <Head>
        <title>{router.locale === 'hr' ? 'Vijesti' : 'News'} | {siteGlobalSettings.siteTitle[router.locale]}</title>
        <meta name="description" content={siteGlobalSettings.siteDescription[router.locale]} />
      </Head>
      <BigOooTitle
        title={{
          en: 'News',
          hr: 'Vijesti',
        }}
        content={{
          en: 'Who, What, Where, When, Why and How is it performing?',
          hr: 'Tko, što, gdje, kada, zašto i kako svira?',
        }}
      />
      <NewsList news={news} showCta={false} />
    </PublicPageWrapper>
  )
}

export async function getStaticProps({ locale }) {
  const news = await SanityClient.fetch(groq`
    *[_type == "newsArticle" && language == "${locale}"]|order(_createdAt desc)
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
    },
    revalidate: 10,
  }
}