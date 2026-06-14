function SectionLabel({ children, className = '' }) {
  return (
    <span className={`font-ui text-xs tracking-[0.2em] uppercase text-royal-gold font-medium ${className}`}>
      {children}
    </span>
  );
}

export default SectionLabel;
