import 'dotenv/config';
import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost.js';

const img = (text) => `https://placehold.co/1200x800/1a1a1a/d4af37?text=${encodeURIComponent(text)}`;

const posts = [
  {
    title: 'The Art of Fine Dining: A Journey Through Flavors',
    slug: 'art-of-fine-dining',
    content: `<h2>An Evening of Culinary Excellence</h2><p>At The Royals, every meal is a carefully orchestrated symphony of flavors. Our head chef, Marco Bellini, brings decades of experience from the world's finest kitchens to create a menu that celebrates both tradition and innovation.</p><p>From the moment you step through our doors, you embark on a gastronomic journey that engages all the senses. Each dish tells a story, each ingredient is thoughtfully sourced, and every presentation is a work of art.</p><h3>Our Philosophy</h3><p>We believe that fine dining is not just about food — it's about creating memories. The warm ambiance, impeccable service, and exquisite cuisine come together to create an experience that lingers long after the last course.</p><blockquote><p>"Cooking is an art, but dining is a symphony of the senses." — Chef Marco Bellini</p></blockquote><p>Join us for an evening of culinary mastery and discover why The Royals has become synonymous with fine dining excellence.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    coverImageId: '',
    category: 'Culinary',
    author: 'The Royals Team',
    status: 'published',
    publishedAt: new Date('2024-12-15'),
    metaTitle: 'The Art of Fine Dining at The Royals',
    metaDescription: 'Discover the philosophy behind our culinary excellence and what makes dining at The Royals an unforgettable experience.',
  },
  {
    title: 'Behind the Scenes: Meet Our Culinary Team',
    slug: 'behind-the-scenes-culinary-team',
    content: `<h2>The People Behind the Plates</h2><p>Behind every extraordinary meal at The Royals is a team of passionate culinary artists dedicated to perfection. Led by Executive Chef Marco Bellini, our kitchen is a symphony of precision, creativity, and teamwork.</p><h3>Chef Marco Bellini</h3><p>With over 25 years of experience in Michelin-starred restaurants across Europe and Asia, Chef Marco brings a unique perspective to Indian fine dining. His philosophy combines classical French techniques with bold Indian flavors.</p><h3>Our Pastry Team</h3><p>Led by Pastry Chef Amara Singh, our dessert program pushes the boundaries of sweetness. From the delicate layers of our signature Tiramisu to the molten perfection of our Dark Chocolate Fondant, each dessert is a masterpiece.</p><p>We invite you to experience the passion and dedication that goes into every dish at The Royals.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200',
    coverImageId: '',
    category: 'Team',
    author: 'The Royals Team',
    status: 'published',
    publishedAt: new Date('2025-01-10'),
    metaTitle: 'Meet Our Culinary Team at The Royals',
    metaDescription: 'Go behind the scenes and meet the talented chefs who create the exquisite dishes at The Royals.',
  },
  {
    title: 'Seasonal Menu: Winter Specials at The Royals',
    slug: 'seasonal-menu-winter-specials',
    content: `<h2>A Winter Culinary Journey</h2><p>As the temperature drops, our kitchen heats up with an exciting new seasonal menu. Our Winter Specials showcase the finest seasonal ingredients, transformed into heartwarming dishes that celebrate the flavors of the season.</p><h3>Winter Highlights</h3><ul><li><strong>Truffle Risotto</strong> — Wild mushrooms and black truffle in a creamy arborio rice</li><li><strong>Slow-Braised Lamb Shank</strong> — Fall-off-the-bone tenderness in red wine jus</li><li><strong>Spiced Pumpkin Soup</strong> — Velvety smooth with a hint of warming spices</li><li><strong>Winter Citrus Tart</strong> — Blood orange and pomegranate in a buttery shell</li></ul><p>Pair your meal with our specially curated winter wine selection, featuring bold reds and fortified wines that complement the rich flavors of the season.</p><p>Reserve your table today and experience the warmth of winter dining at The Royals.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    coverImageId: '',
    category: 'Menu',
    author: 'Chef Marco Bellini',
    status: 'published',
    publishedAt: new Date('2025-02-20'),
    metaTitle: 'Winter Specials Menu at The Royals',
    metaDescription: 'Explore our new winter seasonal menu featuring heartwarming dishes crafted with the finest seasonal ingredients.',
  },
  {
    title: 'Wine & Dine: A Guide to Perfect Pairings',
    slug: 'wine-dine-perfect-pairings',
    content: `<h2>The Art of Wine Pairing</h2><p>A great meal becomes unforgettable with the perfect wine pairing. At The Royals, our sommelier team has curated an extensive wine list featuring both Old World classics and New World discoveries.</p><h3>Our Sommelier's Tips</h3><ol><li><strong>White wines with seafood</strong> — A crisp Sancerre or Chablis enhances the delicate flavors of our seafood dishes</li><li><strong>Red wines with red meat</strong> — Our Barolo and Bordeaux selections complement the richness of our grilled meats</li><li><strong>Dessert wines with sweets</strong> — A late-harvest Riesling or Sauternes is the perfect finish</li></ol><p>Our sommelier team is always available to help you find the perfect pairing for your meal. Ask your server for recommendations tailored to your taste.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
    coverImageId: '',
    category: 'Wine',
    author: 'The Royals Team',
    status: 'published',
    publishedAt: new Date('2025-03-05'),
    metaTitle: 'Wine Pairing Guide at The Royals',
    metaDescription: 'Learn the art of wine pairing from our expert sommelier team at The Royals restaurant.',
  },
  {
    title: 'Private Events: Host Your Celebration at The Royals',
    slug: 'private-events-at-the-royals',
    content: `<h2>Celebrate in Style</h2><p>From intimate birthday dinners to grand corporate events, The Royals offers the perfect setting for your special occasions. Our dedicated events team works closely with you to create a personalized experience that exceeds expectations.</p><h3>Our Event Spaces</h3><ul><li><strong>The Grand Hall</strong> — Seats up to 100 guests for weddings and corporate events</li><li><strong>The Private Dining Room</strong> — Intimate space for 20 guests with personalized menu</li><li><strong>The Terrace</strong> — Al fresco dining for 40 guests with stunning city views</li></ul><p>Each event features a customized menu, dedicated service team, and audiovisual equipment. Contact our events team to start planning your celebration.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200',
    coverImageId: '',
    category: 'Events',
    author: 'Events Team',
    status: 'published',
    publishedAt: new Date('2025-03-20'),
    metaTitle: 'Private Events at The Royals Restaurant',
    metaDescription: 'Host your special celebrations at The Royals. Elegant spaces, customized menus, and impeccable service for unforgettable events.',
  },
  {
    title: 'The History of Royal Cuisine: A Culinary Heritage',
    slug: 'history-of-royal-cuisine',
    content: `<h2>From Royal Kitchens to Modern Tables</h2><p>The cuisine of Indian royalty is a tapestry of flavors, techniques, and traditions that have evolved over centuries. At The Royals, we honor this rich heritage while adding our own contemporary touch.</p><h3>The Mughal Influence</h3><p>The Mughal Empire brought Persian influences to Indian cuisine, introducing rich gravies, saffron, and the art of slow cooking. Dishes like biryani and kebabs trace their origins to this era.</p><h3>Regional Royal Traditions</h3><p>From the Nawabs of Lucknow to the Maharajas of Rajasthan, each royal court developed its unique culinary identity. Our menu draws inspiration from these diverse traditions, presenting them in a modern fine dining context.</p><p>Join us at The Royals and experience the legacy of royal cuisine reimagined for the contemporary palate.</p>`,
    coverImageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200',
    coverImageId: '',
    category: 'Culture',
    author: 'The Royals Team',
    status: 'published',
    publishedAt: new Date('2025-04-01'),
    metaTitle: 'The History of Royal Cuisine at The Royals',
    metaDescription: 'Explore the rich heritage of royal cuisine and how The Royals brings centuries of culinary tradition to your table.',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await BlogPost.deleteMany({});
    const created = await BlogPost.insertMany(posts);
    console.log(`✓ Seeded ${created.length} blog posts`);

    await mongoose.disconnect();
    console.log('\n🎉 Blog seeding completed!\n');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
