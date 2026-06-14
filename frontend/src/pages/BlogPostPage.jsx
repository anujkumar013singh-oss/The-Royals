import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import PageWrapper from '../components/layout/PageWrapper';

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/${slug}`).then((res) => {
      setPost(res.data?.data || res.data);
    }).catch(() => {
      setPost(null);
    }).finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <PageWrapper>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
          <div className="page-container max-w-3xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-1/4 bg-royal-dark" />
              <div className="aspect-video bg-royal-dark" />
              <div className="h-6 bg-royal-dark w-3/4" />
              <div className="h-4 bg-royal-dark w-full" />
              <div className="h-4 bg-royal-dark w-full" />
              <div className="h-4 bg-royal-dark w-2/3" />
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  if (!post) {
    return (
      <PageWrapper>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
          <div className="page-container text-center">
            <h1 className="font-heading text-4xl text-white mb-4">Post Not Found</h1>
            <p className="font-body text-lg text-royal-cream/70 mb-8">The blog post you are looking for does not exist.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 font-ui text-sm uppercase tracking-[0.15em] text-royal-gold border border-royal-gold px-6 py-3 hover:bg-royal-gold hover:text-royal-black transition-all">Back to Journal</Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="page-container max-w-3xl">
          <Link to="/blog" className="group inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em] text-royal-gold hover:text-[#e0c24a] transition-colors mb-8">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
            </svg>
            Back to Journal
          </Link>

          <article>
            {(post.coverImageUrl || post.coverImage) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspect-video overflow-hidden mb-8">
                <img src={post.coverImageUrl || post.coverImage} alt={post.title || ''} className="w-full h-full object-cover" />
              </motion.div>
            )}
            <div className="flex flex-wrap gap-4 mb-6 font-ui text-xs text-royal-cream/50 uppercase tracking-wider">
              {(post.publishedAt || post.date) && <span>{formatDate(post.publishedAt || post.date)}</span>}
              {post.category && <><span className="text-royal-gold">/</span><span className="text-royal-gold">{post.category}</span></>}
              {post.author && <><span className="text-royal-gold">/</span><span>By {post.author}</span></>}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl text-white mb-8">{post.title}</h1>

            {post.content ? (
              <div
                className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-p:font-body prose-p:text-royal-cream/80 prose-p:leading-relaxed prose-strong:text-royal-gold prose-a:text-royal-gold prose-a:no-underline hover:prose-a:underline prose-blockquote:border-royal-gold prose-blockquote:text-royal-cream/70 prose-li:text-royal-cream/70 prose-img:rounded"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="font-body text-lg text-royal-cream/70">{post.excerpt || ''}</p>
            )}

            <div className="mt-12 pt-8 border-t border-royal-cream/10">
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-royal-cream/40 mb-3">Share this post</p>
              <div className="flex gap-4">
                {['Twitter', 'Facebook', 'Copy Link'].map((s) => (
                  <button key={s} onClick={() => {
                    if (s === 'Copy Link') navigator.clipboard.writeText(window.location.href);
                  }} className="font-ui text-xs uppercase tracking-wider text-royal-cream/50 hover:text-royal-gold transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </PageWrapper>
  );
}

export default BlogPostPage;
