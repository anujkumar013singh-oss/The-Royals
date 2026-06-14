import { useState } from 'react'
import { motion } from 'framer-motion'

function Card({ image, title, description, price, tags, className = '', onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        group relative bg-surface-card rounded-sm overflow-hidden
        border-t border-gold/20 hover:border-gold/60
        transition-all duration-500 cursor-pointer
        ${className}
      `}
    >
      {image && (
        <div className="relative overflow-hidden aspect-[4/3]">
          <div className={`absolute inset-0 bg-surface-dark ${imgLoaded ? 'hidden' : 'block'}`} />
          <img
            src={image}
            alt={title || ''}
            onLoad={() => setImgLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
              ${imgLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
          {price && (
            <span className="absolute top-3 right-3 bg-gold text-black px-3 py-1 text-caption font-medium font-accent">
              ${price}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="font-display text-heading-lg text-white mb-2 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
        )}
        {description && (
          <p className="font-body text-body-sm text-text-secondary leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-caption text-gold font-medium uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Card
