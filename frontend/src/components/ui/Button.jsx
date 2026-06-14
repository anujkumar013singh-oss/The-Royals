import { forwardRef } from 'react'

const variants = {
  primary: 'bg-gold text-black hover:bg-gold-light border border-gold',
  ghost: 'bg-transparent text-text-primary border border-transparent hover:border-gold hover:text-gold',
  outline: 'bg-transparent text-gold border border-gold hover:bg-gold hover:text-black',
}

const sizes = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-md',
  lg: 'px-8 py-4 text-body-lg',
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', children, onClick, className = '', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-body font-medium tracking-wider uppercase
        transition-all duration-300 ease-out
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
