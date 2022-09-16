import Head from 'next/head'
import groq from 'groq'
import SanityClient from 'utils/SanityClient'
import { BigOooTitle } from '/components/content/ContentBlocks'
import PublicPageWrapper from '/components/wrappers/PublicPageWrapper'
import { useRouter } from 'next/router'
import { StaticRichtextSection, StaticTitleSection } from 'components/content/ContentBlocks'

export default function StaticPage({ menuItems, siteGlobalSettings, pageContent, slug }) {

  const router = useRouter();

  return (
    <PublicPageWrapper
      menuItems={menuItems}
      siteGlobalSettings={siteGlobalSettings}
    >
      <Head>
        <title>{pageContent.title[router.locale]} | {siteGlobalSettings.siteTitle[router.locale]}</title>
        <meta name="description" content={siteGlobalSettings.siteDescription[router.locale]} />
      </Head>
      <StaticTitleSection title={pageContent.title} />
      <StaticRichtextSection content={pageContent.content} />
    </PublicPageWrapper>
  )
}

const query = groq`*[_type == "staticPage" && slug.current == $slug][0]`;

export async function getStaticPaths({ locales }) {
  const slugs = await SanityClient.fetch(
    groq`*[_type == "staticPage" && defined(slug.current)][].slug.current`
  )

  let paths = [];

  slugs.forEach((slug) => (
    locales.forEach((locale) => (
      paths.push({ params: { slug: slug }, locale: locale })
    ))
  ));

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pageContent = await SanityClient.fetch(query, { slug });
  const menuItems = await SanityClient.getDocument('siteMenu');
  const siteGlobalSettings = await SanityClient.getDocument('siteSettings');
  return {
    props: {
      pageContent: pageContent,
      siteGlobalSettings: siteGlobalSettings,
      menuItems: menuItems.menuItems,
      slug: slug,
    },
    revalidate: 10,
  }
}