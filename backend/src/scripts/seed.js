import 'dotenv/config';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import Testimonial from '../models/Testimonial.js';
import TeamMember from '../models/TeamMember.js';
import SiteSettings from '../models/SiteSettings.js';
import AboutContent from '../models/AboutContent.js';

const img = (text) => `https://placehold.co/800x600/1a1a1a/d4af37?text=${encodeURIComponent(text)}`;

const categories = [
  { name: 'Appetizers', order: 1 },
  { name: 'Main Course', order: 2 },
  { name: 'Desserts', order: 3 },
  { name: 'Starters & Soups', order: 4 },
  { name: 'Signature Cocktails', order: 5 },
  { name: 'Wines & Spirits', order: 6 },
  { name: 'Beverages', order: 7 },
];

const menuItems = [
  // Appetizers (8)
  { name: 'Lotus Stem Crisps', description: 'Crispy lotus stems tossed in honey chilli glaze with sesame seeds', price: 420, category: 'Appetizers', tags: ['veg', 'chef-rec'], isSignature: true, spicyLevel: 1 },
  { name: 'Truffle Arancini', description: 'Wild mushroom and truffle risotto balls with parmesan crust', price: 520, category: 'Appetizers', tags: ['veg', 'chef-rec'], isSignature: true },
  { name: 'Smoked Duck Rolls', description: 'Hickory smoked duck breast wrapped in rice paper with hoisin dip', price: 620, category: 'Appetizers', spicyLevel: 1 },
  { name: 'Seafood Tempura', description: 'Assorted seafood in light tempura batter with spicy mayo', price: 580, category: 'Appetizers', tags: ['chef-rec'], spicyLevel: 2 },
  { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled in tandoor with mint chutney', price: 380, category: 'Appetizers', tags: ['veg'] },
  { name: 'Caesar Salad', description: 'Romaine lettuce, parmesan, croutons with classic caesar dressing', price: 350, category: 'Appetizers', tags: ['veg'] },
  { name: 'Tuna Tartare', description: 'Fresh yellowfin tuna with avocado, sesame, and citrus dressing', price: 680, category: 'Appetizers', spicyLevel: 1 },
  { name: 'Spinach & Artichoke Dip', description: 'Creamy blend of spinach, artichoke and melted cheese with tortilla chips', price: 380, category: 'Appetizers', tags: ['veg'] },
  // Main Course (12)
  { name: 'Grilled Lamb Chops', description: 'Herb-crusted lamb chops with rosemary jus and roasted vegetables', price: 1200, category: 'Main Course', isSignature: true },
  { name: 'Herb Crusted Salmon', description: 'Atlantic salmon with dill crust, lemon beurre blanc', price: 980, category: 'Main Course' },
  { name: 'Chicken Supreme', description: 'Pan-seared chicken breast with mushroom cream sauce', price: 720, category: 'Main Course' },
  { name: 'Beef Wellington', description: 'Tenderloin wrapped in puff pastry with duxelles and prosciutto', price: 1600, category: 'Main Course', tags: ['chef-rec'], isSignature: true },
  { name: 'Lobster Thermidor', description: 'Whole lobster in creamy mustard sauce with gratinéed cheese', price: 2200, category: 'Main Course', tags: ['chef-rec'], isSignature: true },
  { name: 'Mushroom Risotto', description: 'Arborio rice with wild mushrooms, truffle oil and aged parmesan', price: 680, category: 'Main Course', tags: ['veg'] },
  { name: 'Duck Confit', description: 'Slow-cooked duck leg with crispy skin, orange gastrique', price: 1100, category: 'Main Course', tags: ['chef-rec'] },
  { name: 'Vegetable Curry', description: 'Seasonal vegetables in coconut curry with basmati rice', price: 520, category: 'Main Course', tags: ['veg'], spicyLevel: 2 },
  { name: 'Pan-Seared Sea Bass', description: 'European sea bass with saffron beurre blanc and asparagus', price: 1050, category: 'Main Course' },
  { name: 'Lamb Rogan Josh', description: 'Kashmiri style lamb curry with aromatic spices and saffron rice', price: 850, category: 'Main Course', spicyLevel: 2 },
  { name: 'Filet Mignon', description: '8oz tenderloin with peppercorn sauce and gratin dauphinois', price: 1800, category: 'Main Course', isSignature: true },
  { name: 'Stuffed Bell Peppers', description: 'Bell peppers filled with quinoa, vegetables and feta cheese', price: 480, category: 'Main Course', tags: ['veg'] },
  // Desserts (8)
  { name: 'Dark Chocolate Fondant', description: 'Molten dark chocolate cake with vanilla bean ice cream', price: 450, category: 'Desserts', tags: ['chef-rec'], isSignature: true },
  { name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelised sugar top', price: 380, category: 'Desserts', tags: ['veg'] },
  { name: 'Tiramisu', description: 'Italian coffee-soaked ladyfingers with mascarpone cream', price: 420, category: 'Desserts', tags: ['chef-rec'] },
  { name: 'Mango Mousse', description: 'Light mango mousse with passion fruit coulis', price: 350, category: 'Desserts', tags: ['veg'] },
  { name: 'Pistachio Baklava', description: 'Layers of filo pastry with pistachio and honey syrup', price: 380, category: 'Desserts', tags: ['veg'] },
  { name: 'Lemon Tart', description: 'Zesty lemon curd in buttery pastry with Italian meringue', price: 360, category: 'Desserts', tags: ['veg'] },
  { name: 'Red Velvet Cake', description: 'Layered red velvet cake with cream cheese frosting', price: 420, category: 'Desserts' },
  { name: 'Panna Cotta', description: 'Italian cream dessert with berry compote', price: 350, category: 'Desserts', tags: ['veg'] },
  // Starters & Soups (8)
  { name: 'French Onion Soup', description: 'Caramelised onion soup with gruyère crouton', price: 320, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Tomato Basil Soup', description: 'Roasted tomato soup with fresh basil and cream', price: 280, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Pumpkin Bisque', description: 'Creamy pumpkin soup with ginger and nutmeg', price: 320, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Miso Soup', description: 'Traditional Japanese miso with tofu, seaweed and spring onions', price: 280, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Garlic Bread', description: 'Toasted ciabatta with garlic butter and herbs', price: 180, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Bruschetta', description: 'Grilled sourdough with tomato, basil and balsamic glaze', price: 250, category: 'Starters & Soups', tags: ['veg'] },
  { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chilli dip', price: 280, category: 'Starters & Soups', tags: ['veg'], spicyLevel: 1 },
  { name: 'Stuffed Mushrooms', description: 'Button mushrooms stuffed with herbed cream cheese', price: 320, category: 'Starters & Soups', tags: ['veg'] },
  // Signature Cocktails (8)
  { name: 'Royal Old Fashioned', description: 'Bourbon, angostura bitters, sugar cube, orange twist', price: 680, category: 'Signature Cocktails', isSignature: true },
  { name: 'Gold Rush Martini', description: 'Vodka, gold leaf, elderflower liquor, lemon', price: 850, category: 'Signature Cocktails', isSignature: true },
  { name: 'Smoked Negroni', description: 'Gin, campari, vermouth, smoked with rosemary', price: 720, category: 'Signature Cocktails', tags: ['chef-rec'] },
  { name: 'Lychee Bellini', description: 'Prosecco, lychee purée, rose water', price: 580, category: 'Signature Cocktails' },
  { name: 'Espresso Martini', description: 'Vodka, fresh espresso, coffee liquor, vanilla syrup', price: 620, category: 'Signature Cocktails' },
  { name: 'Passion Fruit Mojito', description: 'White rum, passion fruit, mint, lime, soda', price: 550, category: 'Signature Cocktails' },
  { name: 'Lavender Gin Fizz', description: 'London dry gin, lavender syrup, lemon, egg white, soda', price: 580, category: 'Signature Cocktails' },
  { name: 'Whiskey Sour', description: 'Bourbon, lemon, sugar, angostura bitters, egg white', price: 620, category: 'Signature Cocktails' },
  // Wines & Spirits (10)
  { name: 'Chateau Margaux 2015', description: 'Bordeaux, France - Full-bodied Cabernet blend', price: 8500, category: 'Wines & Spirits', isSignature: true },
  { name: 'Dom Perignon 2012', description: 'Champagne, France - Vintage brut', price: 12000, category: 'Wines & Spirits', isSignature: true },
  { name: 'Opus One 2018', description: 'Napa Valley, USA - Bordeaux-style blend', price: 9500, category: 'Wines & Spirits', isSignature: true },
  { name: 'Penfolds Grange 2016', description: 'South Australia - Iconic Shiraz', price: 11000, category: 'Wines & Spirits', isSignature: true },
  { name: 'Macallan 18', description: 'Highland single malt scotch, sherry oak cask', price: 3200, category: 'Wines & Spirits' },
  { name: 'Hennessy XO', description: 'Cognac, France - Extra old blend', price: 2800, category: 'Wines & Spirits' },
  { name: 'Belvedere Vodka', description: 'Poland - Premium rye vodka', price: 450, category: 'Wines & Spirits' },
  { name: 'Bombay Sapphire', description: 'England - Premium London dry gin', price: 380, category: 'Wines & Spirits' },
  { name: 'Johnnie Walker Blue', description: 'Scotland - Ultra-premium blended scotch', price: 3500, category: 'Wines & Spirits', isSignature: true },
  { name: 'Tanqueray No. Ten', description: 'England - Small batch premium gin', price: 420, category: 'Wines & Spirits' },
  // Beverages (8)
  { name: 'Fresh Orange Juice', description: 'Freshly squeezed Valencia oranges', price: 180, category: 'Beverages', tags: ['veg'] },
  { name: 'Detox Green Smoothie', description: 'Spinach, kale, apple, ginger, lemon', price: 250, category: 'Beverages', tags: ['veg'] },
  { name: 'Mango Lassi', description: 'Indian yoghurt drink with Alphonso mango', price: 220, category: 'Beverages', tags: ['veg'] },
  { name: 'Iced Matcha Latte', description: 'Japanese matcha with oat milk and honey', price: 280, category: 'Beverages', tags: ['veg'] },
  { name: 'Mint Lemonade', description: 'Fresh mint and lemon crush with soda', price: 180, category: 'Beverages', tags: ['veg'] },
  { name: 'Fresh Coconut Water', description: 'Chilled tender coconut water', price: 150, category: 'Beverages', tags: ['veg'] },
  { name: 'Rose Petal Cooler', description: 'Rose syrup, lime, soda with dried rose petals', price: 220, category: 'Beverages', tags: ['veg'] },
  { name: 'Masala Chai', description: 'Traditional Indian spiced tea with ginger and cardamom', price: 120, category: 'Beverages', tags: ['veg'] },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Food Critic', content: 'An extraordinary dining experience. The Beef Wellington was cooked to perfection and the service was impeccable. Every dish tells a story of culinary excellence.', rating: 5, order: 1 },
  { name: 'James Mitchell', role: 'Regular Guest', content: 'The Royal Old Fashioned is the best cocktail I have ever had. The ambiance transports you to another era of elegance and charm. Highly recommended.', rating: 5, order: 2 },
  { name: 'Ananya Patel', role: 'Event Host', content: 'We hosted our anniversary dinner here and it was magical. The staff went above and beyond to make the evening special. The tasting menu is a work of art.', rating: 5, order: 3 },
  { name: 'Robert Chen', role: 'Business Traveler', content: 'Exceptional fine dining with a warm, inviting atmosphere. The seafood tempura and lamb chops were outstanding. Will definitely return on my next visit.', rating: 4, order: 4 },
  { name: 'Maria Garcia', role: 'Hospitality Consultant', content: 'The Royals sets a new standard for fine dining. From the amuse-bouche to the petit fours, every detail is meticulously crafted. A true gem.', rating: 5, order: 5 },
];

const teamMembers = [
  { name: 'Chef Marco Bellini', role: 'Executive Chef', bio: 'With over 20 years of culinary excellence across Michelin-starred restaurants in Europe and Asia, Chef Marco brings a passion for perfection to every dish.', order: 1 },
  { name: 'Sophie Laurent', role: 'Head Pastry Chef', bio: 'A graduate of Le Cordon Bleu Paris, Sophie creates exquisite desserts that are as beautiful as they are delicious.', order: 2 },
  { name: 'Rajesh Verma', role: 'Restaurant Manager', bio: 'Rajesh ensures every guest receives royal treatment with his warm hospitality and meticulous attention to detail.', order: 3 },
  { name: 'Elena Rossi', role: 'Sommelière', bio: 'Elena curates our award-winning wine list, pairing the finest vintages from around the world with our culinary creations.', order: 4 },
];

const openingHours = [
  { day: 'Monday', hours: '12:00 PM - 10:00 PM' },
  { day: 'Tuesday', hours: '12:00 PM - 10:00 PM' },
  { day: 'Wednesday', hours: '12:00 PM - 10:00 PM' },
  { day: 'Thursday', hours: '12:00 PM - 11:00 PM' },
  { day: 'Friday', hours: '12:00 PM - 11:00 PM' },
  { day: 'Saturday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 10:00 PM' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Menu Items
    await MenuItem.deleteMany({});
    let orderCounter = 0;
    for (const cat of categories) {
      const items = menuItems.filter((i) => i.category === cat.name);
      for (let idx = 0; idx < items.length; idx++) {
        await MenuItem.create({
          ...items[idx],
          imageUrl: img(items[idx].name),
          imageId: '',
          order: orderCounter++,
          categoryOrder: cat.order,
          isActive: true,
        });
      }
    }
    console.log(`✓ Seeded ${menuItems.length} menu items across ${categories.length} categories`);

    // Testimonials
    await Testimonial.deleteMany({});
    for (const t of testimonials) {
      await Testimonial.create({
        ...t,
        imageUrl: img(t.name),
        imageId: '',
        isActive: true,
      });
    }
    console.log(`✓ Seeded ${testimonials.length} testimonials`);

    // Team Members
    await TeamMember.deleteMany({});
    for (const m of teamMembers) {
      await TeamMember.create({
        ...m,
        imageUrl: img(m.name),
        imageId: '',
        isActive: true,
      });
    }
    console.log(`✓ Seeded ${teamMembers.length} team members`);

    // Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      restaurantName: 'The Royals',
      tagline: 'Where Every Meal is a Royal Affair',
      heroSlides: [
        { imageUrl: img('Hero+Slide+1'), imageId: '', title: 'Fine Dining Experience', subtitle: 'Where Every Meal is a Royal Affair' },
        { imageUrl: img('Hero+Slide+2'), imageId: '', title: 'Exquisite Cuisine', subtitle: 'Crafted by World-Class Chefs' },
        { imageUrl: img('Hero+Slide+3'), imageId: '', title: 'Royal Ambiance', subtitle: 'An Unforgettable Evening Awaits' },
      ],
      address: '42 Gourmet Street, Fine Dining District, Mumbai 400001',
      phone: '+91 22 4567 8900',
      email: 'reservations@theroyals.com',
      mapEmbedUrl: 'https://maps.google.com/?q=42+Gourmet+Street+Mumbai',
      openingHours,
      socialLinks: {
        instagram: 'https://instagram.com/theroyals',
        facebook: 'https://facebook.com/theroyals',
        twitter: 'https://twitter.com/theroyals',
        youtube: 'https://youtube.com/@theroyals',
      },
      seo: {
        metaTitle: 'The Royals | Fine Dining Restaurant in Mumbai',
        metaDescription: 'Experience royal fine dining at The Royals. Exquisite cuisine, handcrafted cocktails, and an unforgettable ambiance in the heart of Mumbai.',
        ogImage: img('OG+Image'),
      },
      faviconUrl: '',
    });
    console.log('✓ Seeded site settings with "The Royals" branding');

    // About Content
    await AboutContent.deleteMany({});
    await AboutContent.create({
      content: 'Welcome to The Royals, where culinary artistry meets regal hospitality. Nestled in the heart of Mumbai\'s finest dining district, our restaurant has been serving exceptional cuisine since our inception. Every dish is a masterpiece, crafted with the finest ingredients sourced from around the world.',
      vision: 'To be the definitive fine dining destination, where every guest experiences unparalleled culinary excellence and timeless elegance that lingers in memory long after the meal ends.',
      history: 'Founded by a collective of passionate culinary artists, The Royals was born from a vision to create a dining experience that transcends the ordinary. What started as a dream has blossomed into one of Mumbai\'s most celebrated fine dining establishments, known for its commitment to excellence, innovation, and tradition.',
      heroImageUrl: img('About+Hero'),
      heroImageId: '',
      quote: 'Cooking is an art, but dining is a symphony of the senses. At The Royals, we compose masterpieces.',
      quoteAuthor: 'Chef Marco Bellini',
      teamMembers: teamMembers.map((m) => ({
        name: m.name,
        role: m.role,
        photoUrl: img(m.name),
        photoId: '',
      })),
    });
    console.log('✓ Seeded about content with story, vision, and team');

    console.log('\n🎉 Seed completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
