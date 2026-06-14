import { Link } from 'react-router-dom';

function GhostButton({ children, onClick, href, className = '', ...props }) {
  const classes = `inline-flex items-center justify-center px-8 py-3 font-ui text-sm uppercase tracking-[0.15em] font-medium border border-royal-gold text-royal-gold bg-transparent hover:bg-royal-gold hover:text-royal-black transition-all duration-300 ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('#')) {
      return <a href={href} className={classes} {...props}>{children}</a>;
    }
    return <Link to={href} className={classes} {...props}>{children}</Link>;
  }

  return <button onClick={onClick} className={classes} {...props}>{children}</button>;
}

export default GhostButton;
