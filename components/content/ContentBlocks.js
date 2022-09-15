/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { PortableText } from '@portabletext/react'
import styles from './ContentBlocks.module.scss'
import Moment from 'react-moment'
import { SocialIcon } from 'react-social-icons'
import SanityClient from 'utils/SanityClient'
import imageUrlBuilder from '@sanity/image-url'
import React from 'react'
import ModalImage from 'react-modal-image'
import Link from 'next/link'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
const imageBuilder = imageUrlBuilder(SanityClient);

function urlFor(source) {
  return imageBuilder.image(source)
}

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

export function StaticTitleSection ({ title, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.staticTitleSection} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <h1 className={`${styles.h1TitleFuzzy} ${styles.staticPageTitle}`}>
          {title[router.locale]}
        </h1>
      </div>
    </section>
  )
}

export function StaticRichtextSection ({ sectionName, content, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.staticRichtextSection} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        {sectionName && (
          <span className={styles.sectionLabel}>
            {sectionName[router.locale]}
          </span>
        )}
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <PortableText value={content[router.locale]} />
      </div>
    </section>
  )
}

export function NewsArticleHeader ({ author, dateTime, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.newsArticleHeader} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <strong>{author}</strong>  |  <Moment date={dateTime} format='DD/MM/YYYY' />
      </div>
    </section>
  )
}

export function NewsArticleTitle ({ title, reducedPadding = false }) {

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

export function ArtistHeader ({ allArtists, currentSlug, reducedPadding = false }) {

  const router = useRouter();

  const currentItemIndex = allArtists.findIndex((artist) => artist.slug.current === currentSlug);

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistHeader} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection} />
      <div className={styles.blockContent}>
        <div className={styles.artistsNav}>
          <div className={styles.menuLabel}>
            {router.locale === 'hr' ? 'Drugi artisti:' : 'Other artists:'}
          </div>
          <div className={styles.navItems}>
            <Link href={`/roster/${currentItemIndex === 0 ? allArtists[allArtists.length - 1].slug.current : allArtists[currentItemIndex - 1].slug.current}`}>
              <div className={styles.navItemInner}>
                <AiOutlineArrowLeft />
                <span>{`${currentItemIndex === 0 ? allArtists[allArtists.length - 1].artistName : allArtists[currentItemIndex - 1].artistName}`}</span>
              </div>
            </Link>
            <Link href={`/roster/${currentItemIndex === (allArtists.length - 1) ? allArtists[0].slug.current : allArtists[currentItemIndex + 1].slug.current}`}>
              <div className={styles.navItemInner}>
                <span>{`${currentItemIndex === (allArtists.length - 1) ? allArtists[0].artistName : allArtists[currentItemIndex + 1].artistName}`}</span>
                <AiOutlineArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ArtistTitle ({ title, genre, webUrl, facebook, instagram, twitter, youtube, soundcloud, bandcamp, tiktok, reducedPadding = false }) {

  const [renderIcons, setRenderIcons] = React.useState(false);

  React.useEffect(() => {
    setRenderIcons(true);
  }, [])

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistTitle} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          Basics
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <h1 className={styles.h1TitleFuzzy}>
          {title}
        </h1>
        <div className={styles.artistGenre}>
          {genre}
        </div>
        {webUrl && renderIcons && (
          <a href={webUrl} className={styles.artistWebLink} target='_blank' rel='noreferrer'>{webUrl}</a>
        )}
        <div className={styles.artistSocial}>
          {facebook && renderIcons && (
            <SocialIcon url={facebook} />
          )}
          {instagram && renderIcons && (
            <SocialIcon url={instagram} />
          )}
          {twitter && renderIcons && (
            <SocialIcon url={twitter} />
          )}
          {youtube && renderIcons && (
            <SocialIcon url={youtube} />
          )}
          {soundcloud && renderIcons && (
            <SocialIcon url={soundcloud} />
          )}
          {bandcamp && renderIcons && (
            <SocialIcon url={bandcamp} />
          )}
          {tiktok && renderIcons && (
            <SocialIcon url={tiktok} />
          )}
        </div>
      </div>
    </section>
  )
}

export function ArtistBio ({ content, reducedPadding = false }) {

  const [expanded, setExpanded] = React.useState(false);

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistBio} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          Bio
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <div className={`${styles.bioWrapper} ${expanded && styles.expanded}`}>
          <PortableText value={content[router.locale]} />
        </div>
        <span className={styles.expandTrigger} onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            router.locale === 'hr' ? 'Smanji' : 'Close'
          ) : (
            router.locale === 'hr' ? 'Pročitaj više' : 'Read more'
          )}
        </span>
      </div>
    </section>
  )
}

export function ArtistVideos ({ videos, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistVideos} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          Video
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <div className={styles.artistVideosInner}>
          {videos.map((video, index) => {
            return (
              <div
                key={`video-${index}`}
                className={styles.artistSingleVideo}
              >
                <div className={styles.embedContainer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    frameBorder='0'
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ArtistPhotos ({ photos, reducedPadding = false }) {

  const router = useRouter();

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistPhotos} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          {router.locale === 'hr' ? 'Fotografije' : 'Photos'}
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <div className={styles.artistPhotosInner}>
          {photos.map((photo, index) => {
            return (
              <ModalImage
                key={`image-${index}`}
                small={urlFor(photo).width(480).height(480).url()}
                large={urlFor(photo).height(960).url()}
                alt=''
                className={styles.artistSinglePhoto}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ArtistGigs ({ gigs, reducedPadding = false }) {

  const router = useRouter();

  const [sortedGigs, setSortedGigs] = React.useState([]);

  React.useEffect(() => {
    setSortedGigs(gigs.sort(
      (a, b) => b.label > a.label,
    ));
  }, [])

  return (
    <section className={`${styles.blockStandardSidebar} ${styles.artistGigs} ${reducedPadding && styles.blockReducedPadding}`}>
      <div className={styles.sidebarSection}>
        <span className={styles.sectionLabel}>
          {router.locale === 'hr' ? 'Datumi' : 'Dates'}
        </span>
        <span className={styles.sidebarLine} />
      </div>
      <div className={styles.blockContent}>
        <div className={styles.artistTourDates}>
          <ul className={styles.datesList}>
            <li className={styles.datesListHeader}>
              <div>
                {router.locale === 'hr' ? 'Datum' : 'Date'}
              </div>
              <div>
                Event
              </div>
              <div>
                {router.locale === 'hr' ? 'Lokacija' : 'Location'}
              </div>
              <div>

              </div>
            </li>
            {sortedGigs.map((gig, index) => {
              return (
                <li
                  className={styles.datesListItem}
                  key={`gig-${index}`}
                >
                  <div>
                    <Moment date={gig.label} format='DD-MM-YYYY' />
                  </div>
                  <div>
                    {gig.name}
                  </div>
                  <div>
                    {gig.location}
                  </div>
                  {gig.url ? (
                    <a href={gig.url} target='_blank' rel='noreferrer' className={styles.dateCta}>
                      {router.locale === 'hr' ? 'Info / Ulaznice' : 'Info / Tickets'}
                    </a>
                  ) : (
                    <span className={styles.dateNoCta}>
                      {router.locale === 'hr' ? 'Info / Ulaznice' : 'Info / Tickets'}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}