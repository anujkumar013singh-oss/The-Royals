import { Link } from 'react-router-dom';

function GoldButton({ children, onClick, href, className = '', variant = 'fill', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center px-8 py-3 font-ui text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300';

  const variantClasses = variant === 'outline'
    ? 'border border-royal-gold text-royal-gold bg-transparent hover:bg-royal-gold hover:text-royal-black'
    : 'bg-royal-gold text-royal-black hover:bg-[#e0c24a]';

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('#')) {
      return <a href={href} className={classes} {...props}>{children}</a>;
    }
    return <Link to={href} className={classes} {...props}>{children}</Link>;
  }

  return <button onClick={onClick} className={classes} {...props}>{children}</button>;
}

export default GoldButton;
