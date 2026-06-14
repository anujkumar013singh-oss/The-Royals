const defaultText = '★ BEST FINE DINING 2024 ★ MICHELIN STAR ★ AWARD WINNING CUISINE ★ EXQUISITE FLAVORS ★ IMPECCABLE SERVICE ★ ROYAL DINING EXPERIENCE ★';

function MarqueeBar({ text }) {
  const content = text || defaultText;

  return (
    <div className="relative overflow-hidden bg-royal-black py-4 border-y border-royal-gold/20">
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: 'fit-content', '--duration': '15s' }}>
        <span className="font-heading text-sm md:text-base uppercase tracking-[0.25em] text-royal-gold px-8 font-medium">{content}</span>
        <span className="font-heading text-sm md:text-base uppercase tracking-[0.25em] text-royal-gold px-8 font-medium">{content}</span>
      </div>
    </div>
  );
}

export default MarqueeBar;