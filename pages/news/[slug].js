import Head from 'next/head'
import groq from 'groq'
import SanityClient from 'utils/SanityClient'
import PublicPageWrapper from '/components/wrappers/PublicPageWrapper'
import { useRouter } from 'next/router'
import { StaticRichtextSection, NewsArticleHeader, NewsArticleTitle } from 'components/content/ContentBlocks'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(SanityClient);

function urlFor(source) {
  return imageBuilder.image(source)
}

export default function Home({ menuItems, siteGlobalSettings, article, news, locale }) {

  const router = useRouter();

  let title = {};
  let content = {};
  title[locale] = article.title;
  content[locale] = article.content;

  return (
    <PublicPageWrapper
      menuItems={menuItems}
      sideGraphicType='article'
      sideGraphic={urlFor(article.mainImage).width(480).height(960).url()}
      siteGlobalSettings={siteGlobalSettings}
    >
      <Head>
        <title>{article.title} | {siteGlobalSettings.siteTitle[router.locale]}</title>
        <meta name="description" content={article.excerpt} />
      </Head>
      
      <NewsArticleHeader
        author={article.author}
        dateTime={article._createdAt}
      />
      <NewsArticleTitle
        title={title}
      />
      <StaticRichtextSection
        content={content}
      />
    </PublicPageWrapper>
  )
}


const query = groq`*[_type == "newsArticle" && slug.current == $slug][0]`;

export async function getStaticPaths({ locales }) {

  const slugsHr = await SanityClient.fetch(
    groq`*[_type == "newsArticle" && language == "hr" && defined(slug.current)][].slug.current`
  )

  const slugsEn = await SanityClient.fetch(
    groq`*[_type == "newsArticle" && language == "en" && defined(slug.current)][].slug.current`
  )

  let paths = [];

  slugsHr.forEach((slug) => (
    paths.push({ params: { slug: slug }, locale: 'hr' })
  ))

  slugsEn.forEach((slug) => (
    paths.push({ params: { slug: slug }, locale: 'en' })
  ))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const article = await SanityClient.fetch(query, { slug });
  const menuItems = await SanityClient.getDocument('siteMenu');
  const siteGlobalSettings = await SanityClient.getDocument('siteSettings');
  return {
    props: {
      article: article,
      siteGlobalSettings: siteGlobalSettings,
      menuItems: menuItems.menuItems,
      slug: slug,
      locale: context.locale,
    }
  }
}