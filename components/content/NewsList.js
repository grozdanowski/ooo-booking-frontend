/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BlockWrapper } from './ContentBlocks'
import imageUrlBuilder from '@sanity/image-url'
import styles from './NewsList.module.scss'
import SanityClient from '../../utils/SanityClient'
import Moment from 'react-moment'

const imageBuilder = imageUrlBuilder(SanityClient);

function urlFor(source) {
  return imageBuilder.image(source)
}

const testNewsItems = [
  {
    article_photo: 'img/test/article240240.jpg',
    title: 'Edo Maajka to headline the Vodnjan Asparagus Festival',
    excerpt: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.',
    date: '07-07-2020',
    id: '1',
  },
  {
    article_photo: 'img/test/article240240.jpg',
    title: 'Edo Maajka to headline the Vodnjan Asparagus Festival',
    excerpt: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.',
    date: '07-07-2020',
    id: '2',
  },
]

export default function NewsList ({ news = testNewsItems, paginate = false, pages, currentPage, showCta = true }) {

  const router = useRouter();

  if (!news.length) {
    return
  }

  return (
    <BlockWrapper sectionName={(router.locale === 'hr') ? 'Vijesti' : 'News'}>
      <div className={styles.newsListContainer}>
        {news.map((article, index) => {
          return (
            <article
              key={`article-${index}`}
              className={styles.listItem}
            >
              <Link href={`/news/${article.slug.current}`}>
                <div className={styles.itemLeft}>
                  <div className={styles.imageLink}>
                    <img src={urlFor(article.mainImage).width(200).height(200).url()} alt={article.title} />
                  </div>
                  <span className={styles.articleDate}>
                    <Moment date={article._createdAt} format='DD.MM.YYYY.' />
                  </span>
                </div>
              </Link>
              <Link href={`/news/${article.slug.current}`}>
                <div className={styles.itemRight}>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                  <div className={styles.articleExcerpt}>{article.excerpt}</div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
      {paginate && (
        <div className={styles.pagination}>
          pagination
        </div>
      )}
      {showCta && (
        <div className={styles.ctaWrapper}>
          <Link href='/news'>
            <span className={styles.ctaButton}>
              {(router.locale === 'hr') ? 'Pogledaj sve vijesti' : 'View all News'}
            </span>
          </Link>
        </div>
      )}
    </BlockWrapper>
  )
}