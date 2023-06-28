import Head from 'next/head'
import groq from 'groq'
import SanityClient from 'utils/SanityClient'
import PublicPageWrapper from '/components/wrappers/PublicPageWrapper'
import { useRouter } from 'next/router'
import imageUrlBuilder from '@sanity/image-url'
import { ArtistHeader, ArtistTitle, ArtistBio, ArtistVideos, ArtistPhotos, ArtistGigs } from 'components/content/ContentBlocks'
const imageBuilder = imageUrlBuilder(SanityClient);

function urlFor(source) {
  return imageBuilder.image(source)
}

export default function StaticPage({ menuItems, siteGlobalSettings, artist, slug, allArtists }) {

  const router = useRouter();

  return (
    <PublicPageWrapper
      menuItems={menuItems}
      sideGraphic={urlFor(artist.cutoutPhoto).width(720).url()}
      siteGlobalSettings={siteGlobalSettings}
    >
      <Head>
        <title>{artist.artistName} | {siteGlobalSettings.siteTitle[router.locale]}</title>
        <meta name="description" content={siteGlobalSettings.siteDescription[router.locale]} />
      </Head>
    
      <ArtistHeader allArtists={allArtists || []} currentSlug={slug} />

      <ArtistTitle
        title={artist.artistName}
        genre={artist.artistGenre}
        webUrl={artist.artistWebsiteUrl}
        facebook={artist.artistFacebookUrl}
        instagram={artist.artistInstagramUrl}
        twitter={artist.artistTwitterUrl}
        youtube={artist.artistYouTubeUrl}
        soundcloud={artist.artistSoundcloudUrl}
        bandcamp={artist.artistBandcampUrl}
        tiktok={artist.artistTikTokUrl}
      />

      <ArtistBio
        content={artist.artistBio}
      />

      <ArtistVideos
        videos={artist.youtubeVideos || []}
      />

      <ArtistPhotos
        photos={artist.artistPhotos || []}
      />

      <ArtistGigs
        gigs={artist.artistGigs || []}
      />

    </PublicPageWrapper>
  )
}

const query = groq`*[_type == "artist" && slug.current == $slug][0]`;

export async function getStaticPaths({ locales }) {
  const slugs = await SanityClient.fetch(
    groq`*[_type == "artist" && defined(slug.current)][].slug.current`
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
  const artist = await SanityClient.fetch(query, { slug });
  const menuItems = await SanityClient.getDocument('siteMenu');
  const siteGlobalSettings = await SanityClient.getDocument('siteSettings');
  const allArtists = await SanityClient.fetch(
    groq`*[_type == "artist" && defined(slug.current)]{artistName, slug}`
  )

  if (!artist) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      artist: artist,
      siteGlobalSettings: siteGlobalSettings,
      menuItems: menuItems.menuItems,
      slug: slug,
      allArtists: allArtists,
    },
    revalidate: 1,
  }
}