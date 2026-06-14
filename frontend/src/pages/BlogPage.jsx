import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import api from '../utils/api';
import PageWrapper from '../components/layout/PageWrapper';
import GoldRule from '../components/ui/GoldRule';
import SectionLabel from '../components/ui/SectionLabel';
import BlogCard from '../components/ui/BlogCard';

const categories = ['All', 'Events', 'Culinary', 'Behind the Scenes', 'Press'];

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  useEffect(() => {
    api.get('/blogs').then((res) => {
      const data = res.data?.data || res.data;
      setPosts(Array.isArray(data) ? data : []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase());

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') || '';

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="page-container">
          <div ref={headerRef} className="text-center mb-12">
            <SectionLabel>Journal</SectionLabel>
            <h1 className="font-heading text-4xl md:text-6xl text-white mt-3 mb-4">Our Journal</h1>
            <GoldRule align="center" />
            <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">Stories, insights, and culinary explorations</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-ui text-xs uppercase tracking-[0.15em] px-5 py-2 transition-all duration-300 ${
                  activeCategory === cat ? 'bg-royal-gold text-royal-black' : 'text-royal-cream/50 border border-royal-cream/20 hover:border-royal-gold/50 hover:text-royal-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <BlogCard
                  key={post._id || post.id || i}
                  slug={post.slug || post._id || post.id}
                  coverImage={post.coverImageUrl || post.coverImage}
                  title={post.title}
                  date={post.publishedAt || post.date || post.createdAt}
                  excerpt={stripHtml(post.content).slice(0, 150) + '...'}
                  category={post.category}
                />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-lg text-royal-cream/50 py-16">
              No journal entries yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

export default BlogPage;
