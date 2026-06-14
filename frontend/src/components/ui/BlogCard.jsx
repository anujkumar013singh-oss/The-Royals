import { Link } from 'react-router-dom';

function BlogCard({ slug, coverImage, title, date, excerpt, category, className = '' }) {
  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Link to={`/blog/${slug}`} className={`group block bg-royal-dark overflow-hidden ${className}`}>
      {coverImage && (
        <div className="relative overflow-hidden aspect-video">
          <img
            src={coverImage}
            alt={title || ''}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="font-ui text-[10px] uppercase tracking-wider text-royal-gold">{category}</span>
        )}
        {title && (
          <h3 className="font-heading text-xl text-white mt-2 mb-2 group-hover:text-royal-gold transition-colors duration-300">
            {title}
          </h3>
        )}
        {date && (
          <p className="font-ui text-xs text-royal-cream/50 mb-2">{formatDate(date)}</p>
        )}
        {excerpt && (
          <p className="font-body text-base text-royal-cream/70 leading-relaxed line-clamp-2">{excerpt}</p>
        )}
        <span className="inline-flex items-center gap-2 mt-4 font-ui text-xs uppercase tracking-wider text-royal-gold group-hover:gap-3 transition-all duration-300">
          Read More
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default BlogCard;
