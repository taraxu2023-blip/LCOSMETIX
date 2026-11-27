import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getLatestNews } from "../data/news";

export default function LatestNews() {
  const news = getLatestNews();
  return <section className="latest-news content-width" id="latest-news" aria-labelledby="latest-news-heading">
    <div className="latest-news-heading">
      <p className="eyebrow">FROM L COSMETIX</p>
      <h2 id="latest-news-heading">Latest<br />news.</h2>
    </div>
    <div className="latest-news-list">{news.map((item) => <article key={item.id}>
      <a className="news-story-link" href={item.href}>
        <div className="news-story-image"><img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" /></div>
        <div className="news-story-copy">
          <div className="news-story-meta"><span>{item.category}</span>{item.dateLabel && (item.publishedAt ? <time dateTime={item.publishedAt}>{item.dateLabel}</time> : <span>{item.dateLabel}</span>)}</div>
          <h3>{item.title}</h3><p>{item.summary}</p>
        </div>
        <ArrowUpRight className="news-story-arrow" size={20} aria-hidden="true" />
      </a>
    </article>)}</div>
  </section>;
}
