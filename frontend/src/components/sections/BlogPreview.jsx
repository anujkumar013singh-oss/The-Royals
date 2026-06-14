import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import api from '../../utils/api';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';
import BlogCard from '../ui/BlogCard';

function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    api.get('/blogs').then((res) => {
      const data = res.data?.data || res.data;
      setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(gridRef.current?.querySelectorAll('.blog-preview-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [posts.length]);

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') || '';

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-black">
      <div className="page-container">
        <div ref={titleRef} className="text-center mb-16">
          <SectionLabel>Journal</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Latest Stories</h2>
          <GoldRule align="center" />
          <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
            Discover the stories behind our cuisine and events
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <div key={post._id || post.id || i} className="blog-preview-card">
                <BlogCard
                  slug={post.slug || post._id || post.id}
                  coverImage={post.coverImageUrl || post.coverImage}
                  title={post.title}
                  date={post.publishedAt || post.date || post.createdAt}
                  excerpt={stripHtml(post.content).slice(0, 120) + '...'}
                  category={post.category}
                />
              </div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="blog-preview-card bg-royal-dark overflow-hidden animate-pulse">
                <div className="aspect-video bg-royal-black" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-royal-black rounded w-1/4" />
                  <div className="h-5 bg-royal-black rounded w-3/4" />
                  <div className="h-4 bg-royal-black rounded w-full" />
                </div>
              </div>
            ))
          )}
        </div>
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/blog" className="group inline-flex items-center gap-2 font-ui text-sm uppercase tracking-[0.15em] text-royal-gold hover:text-[#e0c24a] transition-colors">
              Read All Stories
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPreview;
