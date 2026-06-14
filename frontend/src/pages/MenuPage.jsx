import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '../lib/gsap';
import GoldRule from '../components/ui/GoldRule';
import SectionLabel from '../components/ui/SectionLabel';

const categories = ['All', 'South Indian', 'Punjabi', 'Gujarati', 'Specialties', 'Desserts & Ice Cream', 'Main Course Thali', 'Chinese'];

const foodImages = [
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505252016422-a7d79ef2c4af?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop',
];

const placeholder = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
  }
  return foodImages[Math.abs(hash) % foodImages.length];
};

const menuItems = [
  { name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', badge: 'ORIGIN: KERALA', category: 'South Indian', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg' },
  { name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup', badge: 'ORIGIN: TAMIL NADU', category: 'South Indian', imageUrl: placeholder('Idli Sambar') },
  { name: 'Vada', description: 'Crispy lentil donuts with coconut chutney', badge: 'BESTSELLER', category: 'South Indian', imageUrl: placeholder('Vada') },
  { name: 'Uttapam', description: 'Thick rice pancake with vegetable toppings', badge: 'ORIGIN: KERALA', category: 'South Indian', imageUrl: placeholder('Uttapam') },
  { name: 'Rava Dosa', description: 'Semolina crepe with ghee roast', badge: 'CHEF SPECIAL', category: 'South Indian', imageUrl: placeholder('Rava Dosa') },
  { name: 'Mysore Masala Dosa', description: 'Spicy red chutney dosa', badge: 'ORIGIN: MYSORE', category: 'South Indian', imageUrl: placeholder('Mysore Masala Dosa') },
  { name: 'Pongal', description: 'Rice and lentil porridge with ghee', badge: '15% OFF', category: 'South Indian', imageUrl: placeholder('Pongal') },
  { name: 'Medu Vada', description: 'Fluffy lentil fritters', badge: 'BESTSELLER', category: 'South Indian', imageUrl: placeholder('Medu Vada') },
  { name: 'Rasam', description: 'Spicy tangy soup with pepper', badge: 'ORIGIN: TAMIL NADU', category: 'South Indian', imageUrl: placeholder('Rasam') },
  { name: 'Coconut Rice', description: 'Fragrant rice with coconut', badge: 'VEG SIGNATURE', category: 'South Indian', imageUrl: placeholder('Coconut Rice') },
  { name: 'Lemon Rice', description: 'Tangy rice with peanuts', badge: 'ORIGIN: KERALA', category: 'South Indian', imageUrl: placeholder('Lemon Rice') },
  { name: 'Curd Rice', description: 'Cool yogurt rice with pomegranate', badge: '10% OFF', category: 'South Indian', imageUrl: placeholder('Curd Rice') },
  { name: 'Appam with Stew', description: 'Lacy rice pancakes with vegetable stew', badge: 'CHEF SPECIAL', category: 'South Indian', imageUrl: placeholder('Appam with Stew') },
  { name: 'Upma', description: 'Savory semolina with vegetables', badge: 'ORIGIN: KARNATAKA', category: 'South Indian', imageUrl: placeholder('Upma') },
  { name: 'Bisi Bele Bath', description: 'Spiced rice lentil hotpot', badge: '20% OFF', category: 'South Indian', imageUrl: placeholder('Bisi Bele Bath') },

  { name: 'Butter Naan', description: 'Soft leavened bread with butter glaze', badge: 'BESTSELLER', category: 'Punjabi', imageUrl: placeholder('Butter Naan') },
  { name: 'Dal Makhani', description: 'Slow-cooked black lentils in cream', badge: 'CHEF SPECIAL', category: 'Punjabi', imageUrl: placeholder('Dal Makhani') },
  { name: 'Sarson ka Saag', description: 'Mustard greens with cornbread', badge: 'ORIGIN: PUNJAB', category: 'Punjabi', imageUrl: placeholder('Sarson ka Saag') },
  { name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', badge: '15% OFF', category: 'Punjabi', imageUrl: placeholder('Chole Bhature') },
  { name: 'Aloo Gobi', description: 'Potato and cauliflower dry curry', badge: 'VEG SIGNATURE', category: 'Punjabi', imageUrl: placeholder('Aloo Gobi') },

  { name: 'Dhokla', description: 'Steamed fermented gram cake', badge: 'ORIGIN: GUJARAT', category: 'Gujarati', imageUrl: placeholder('Dhokla') },
  { name: 'Khandvi', description: 'Spiced gram flour rolls', badge: 'CHEF SPECIAL', category: 'Gujarati', imageUrl: placeholder('Khandvi') },
  { name: 'Thepla', description: 'Spiced whole wheat flatbread', badge: '10% OFF', category: 'Gujarati', imageUrl: placeholder('Thepla') },
  { name: 'Undhiyu', description: 'Mixed vegetable curry baked upside-down', badge: 'ORIGIN: GUJARAT', category: 'Gujarati', imageUrl: placeholder('Undhiyu') },
  { name: 'Fafda Jalebi', description: 'Crispy snack with syrup swirl', badge: 'BESTSELLER', category: 'Gujarati', imageUrl: placeholder('Fafda Jalebi') },
  { name: 'Khaman', description: 'Spongy gram flour snack', badge: '20% OFF', category: 'Gujarati', imageUrl: 'https://c.ndtvimg.com/2025-07/vupbjb7k_food_625x300_09_July_25.jpg' },
  { name: 'Handvo', description: 'Savory lentil rice cake', badge: 'VEG SIGNATURE', category: 'Gujarati', imageUrl: placeholder('Handvo') },
  { name: 'Gatta Curry', description: 'Gram flour dumplings in yogurt gravy', badge: 'ORIGIN: RAJASTHAN', category: 'Gujarati', imageUrl: placeholder('Gatta Curry') },
  { name: 'Basundi', description: 'Thick sweetened condensed milk', badge: 'CHEF SPECIAL', category: 'Gujarati', imageUrl: placeholder('Basundi') },
  { name: 'Mohanthal', description: 'Gram flour fudge with saffron', badge: '15% OFF', category: 'Gujarati', imageUrl: placeholder('Mohanthal') },
  { name: 'Sev Tameta', description: 'Crispy noodles in tomato gravy', badge: 'VEG SIGNATURE', category: 'Gujarati', imageUrl: placeholder('Sev Tameta') },
  { name: 'Patra', description: 'Taro leaf rolls in gram flour', badge: 'CHEF SPECIAL', category: 'Gujarati', imageUrl: 'https://www.secondrecipe.com/wp-content/uploads/2022/10/af-patra.jpg' },
  { name: 'Kadi Pakoda', description: 'Yogurt curry with gram fritters', badge: 'ORIGIN: GUJARAT', category: 'Gujarati', imageUrl: placeholder('Kadi Pakoda') },
  { name: 'Dal Dhokli', description: 'Lentil soup with wheat dumplings', badge: '10% OFF', category: 'Gujarati', imageUrl: placeholder('Dal Dhokli') },
  { name: 'Shrikhand', description: 'Strained yogurt with saffron', badge: 'BESTSELLER', category: 'Gujarati', imageUrl: placeholder('Shrikhand') },

  { name: 'Hyderabadi Biryani', description: 'Fragrant basmati with marinated meat', badge: 'ORIGIN: HYDERABAD', category: 'Specialties', imageUrl: 'https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg' },
  { name: 'Butter Chicken', description: 'Tandoori chicken in creamy tomato gravy', badge: 'ORIGIN: DELHI', category: 'Specialties', imageUrl: 'https://nickskitchen.com/wp-content/uploads/2025/08/NK_Butter-Ckn_1-scaled.jpg' },
  { name: 'Shahi Paneer', description: 'Cottage cheese in cashew cream gravy', badge: 'VEG SIGNATURE', category: 'Specialties', imageUrl: 'https://www.oetker.in/assets/recipes/assets/6c0ac2f3ce204d3d9bb1df9709fc06c9/1272x764/shahi-paneer.webp' },
  { name: 'Wood-Fired Pizza', description: 'Artisan pizza in traditional oven', badge: '20% OFF', category: 'Specialties', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg' },

  { name: 'Gulab Jamun', description: 'Milk solid dumplings in rose syrup', badge: 'BESTSELLER', category: 'Desserts & Ice Cream', imageUrl: placeholder('Gulab Jamun') },
  { name: 'Rasmalai', description: 'Cottage cheese patties in sweetened milk', badge: 'CHEF SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Rasmalai') },
  { name: 'Jalebi', description: 'Crispy syrup-soaked swirls', badge: 'ORIGIN: NORTH INDIA', category: 'Desserts & Ice Cream', imageUrl: placeholder('Jalebi') },
  { name: 'Gajar Halwa', description: 'Carrot pudding with nuts', badge: '15% OFF', category: 'Desserts & Ice Cream', imageUrl: placeholder('Gajar Halwa') },
  { name: 'Kulfi', description: 'Traditional Indian ice cream', badge: 'BESTSELLER', category: 'Desserts & Ice Cream', imageUrl: placeholder('Kulfi') },
  { name: 'Mango Ice Cream', description: 'Alphonso mango frozen delight', badge: 'SUMMER SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Mango Ice Cream') },
  { name: 'Chocolate Fudge', description: 'Rich dark chocolate indulgence', badge: '20% OFF', category: 'Desserts & Ice Cream', imageUrl: placeholder('Chocolate Fudge') },
  { name: 'Strawberry Cheesecake', description: 'Creamy New York style', badge: 'CHEF SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Strawberry Cheesecake') },
  { name: 'Tiramisu', description: 'Coffee-soaked Italian classic', badge: 'ORIGIN: ITALY', category: 'Desserts & Ice Cream', imageUrl: placeholder('Tiramisu') },
  { name: 'Crème Brûlée', description: 'Caramelized vanilla custard', badge: 'CLASSIC', category: 'Desserts & Ice Cream', imageUrl: placeholder('Crème Brûlée') },
  { name: 'Dark Chocolate Fondant', description: 'Molten chocolate cake', badge: 'BESTSELLER', category: 'Desserts & Ice Cream', imageUrl: placeholder('Dark Chocolate Fondant') },
  { name: 'Panna Cotta', description: 'Silky Italian cream dessert', badge: '10% OFF', category: 'Desserts & Ice Cream', imageUrl: placeholder('Panna Cotta') },
  { name: 'Mango Mousse', description: 'Light tropical mousse', badge: 'SUMMER SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Mango Mousse') },
  { name: 'Red Velvet Cake', description: 'Velvety cocoa cream cake', badge: 'CHEF SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Red Velvet Cake') },
  { name: 'Pistachio Baklava', description: 'Layered filo with nuts', badge: 'ORIGIN: MIDDLE EAST', category: 'Desserts & Ice Cream', imageUrl: placeholder('Pistachio Baklava') },
  { name: 'Lemon Tart', description: 'Zesty curd in buttery shell', badge: '15% OFF', category: 'Desserts & Ice Cream', imageUrl: placeholder('Lemon Tart') },
  { name: 'Blueberry Muffin', description: 'Bursting blueberries', badge: 'FRESHLY BAKED', category: 'Desserts & Ice Cream', imageUrl: placeholder('Blueberry Muffin') },
  { name: 'Vanilla Bean Ice Cream', description: 'Madagascar vanilla', badge: 'CLASSIC', category: 'Desserts & Ice Cream', imageUrl: placeholder('Vanilla Bean Ice Cream') },
  { name: 'Chocolate Chip Cookie Dough', description: 'Chunks in vanilla base', badge: 'BESTSELLER', category: 'Desserts & Ice Cream', imageUrl: placeholder('Chocolate Chip Cookie Dough') },
  { name: 'Salted Caramel', description: 'Swirled with sea salt', badge: 'CHEF SPECIAL', category: 'Desserts & Ice Cream', imageUrl: placeholder('Salted Caramel') },
  { name: 'Butterscotch Crunch', description: 'With praline bits', badge: '10% OFF', category: 'Desserts & Ice Cream', imageUrl: placeholder('Butterscotch Crunch') },
  { name: 'Coconut Ladoo', description: 'Sweet coconut balls', badge: 'VEG SIGNATURE', category: 'Desserts & Ice Cream', imageUrl: placeholder('Coconut Ladoo') },
  { name: 'Kaju Katli', description: 'Cashew fudge with silver leaf', badge: 'ORIGIN: INDIA', category: 'Desserts & Ice Cream', imageUrl: placeholder('Kaju Katli') },
  { name: 'Phirni', description: 'Creamy rice pudding with saffron', badge: 'BESTSELLER', category: 'Desserts & Ice Cream', imageUrl: placeholder('Phirni') },
  { name: 'Falooda', description: 'Rose milk with noodles and basil seeds', badge: 'SUMMER SPECIAL', category: 'Desserts & Ice Cream', imageUrl: 'https://www.spiceupthecurry.com/wp-content/uploads/2013/05/falooda-recipe-1.jpg' },

  { name: 'Royal Thali', description: 'Full course royal feast', badge: 'CHEF SPECIAL', category: 'Main Course Thali', imageUrl: placeholder('Royal Thali') },
  { name: 'Veg Thali', description: 'Assorted vegetarian delights', badge: 'VEG SIGNATURE', category: 'Main Course Thali', imageUrl: 'https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-7.jpg' },
  { name: 'Non-Veg Thali', description: 'Chicken, mutton, fish feast', badge: 'BESTSELLER', category: 'Main Course Thali', imageUrl: placeholder('Non-Veg Thali') },
  { name: 'Seafood Thali', description: 'Coastal delicacies platter', badge: 'ORIGIN: KERALA', category: 'Main Course Thali', imageUrl: placeholder('Seafood Thali') },
  { name: 'Rajasthani Thali', description: 'Desert cuisine special', badge: 'ORIGIN: RAJASTHAN', category: 'Main Course Thali', imageUrl: placeholder('Rajasthani Thali') },
  { name: 'Gujarati Thali', description: 'Sweet and savory combo', badge: '15% OFF', category: 'Main Course Thali', imageUrl: placeholder('Gujarati Thali') },
  { name: 'Kids Thali', description: 'Mini portions for little ones', badge: '10% OFF', category: 'Main Course Thali', imageUrl: placeholder('Kids Thali') },

  { name: 'Spring Rolls', description: 'Crispy vegetable rolls', badge: 'CRISPY SPECIAL', category: 'Chinese', imageUrl: placeholder('Spring Rolls') },
  { name: 'Gobi Manchurian', description: 'Cauliflower in soy chili', badge: 'BESTSELLER', category: 'Chinese', imageUrl: placeholder('Gobi Manchurian') },
  { name: 'Fried Rice', description: 'Wok-tossed rice with veggies', badge: 'ORIGIN: CANTON', category: 'Chinese', imageUrl: placeholder('Fried Rice') },
  { name: 'Noodles', description: 'Hakka style stir-fried noodles', badge: 'VEG SIGNATURE', category: 'Chinese', imageUrl: placeholder('Noodles') },
  { name: 'Chilli Paneer', description: 'Cottage cheese in hot garlic sauce', badge: 'CHEF SPECIAL', category: 'Chinese', imageUrl: placeholder('Chilli Paneer') },
  { name: 'Szechuan Soup', description: 'Spicy hot and sour', badge: 'ORIGIN: SZECHUAN', category: 'Chinese', imageUrl: placeholder('Szechuan Soup') },
  { name: 'Dim Sum Basket', description: 'Assorted steamed dumplings', badge: '20% OFF', category: 'Chinese', imageUrl: placeholder('Dim Sum Basket') },
];

function MenuPage() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (category) {
      const matched = categories.find(
        (c) => c.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
      );
      setActiveCategory(matched || 'All');
    } else {
      setActiveCategory('All');
    }
  }, [category]);

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        tabsRef.current?.querySelectorAll('.tab-btn'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll('.menu-card');
    if (cards.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [activeCategory]);

  return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="page-container">
          <div ref={headerRef} className="text-center mb-12">
            <SectionLabel>Menu</SectionLabel>
            <h1 className="font-heading text-4xl md:text-6xl text-white mt-3 mb-4">Our Menu</h1>
            <GoldRule align="center" />
            <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
              A carefully curated selection of seasonal cuisine
            </p>
          </div>

          <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={cat}
                  to={cat === 'All' ? '/menu' : `/menu/${catSlug}`}
                  className={`tab-btn font-ui text-xs uppercase tracking-[0.15em] px-4 py-2 transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'text-royal-black bg-royal-gold'
                      : 'text-royal-cream/50 border border-royal-cream/20 hover:border-royal-gold/50 hover:text-royal-gold'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          <div ref={listRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                {filteredItems.length === 0 ? (
                  <p className="text-center font-body text-lg text-royal-cream/50 py-12">
                    No items found for this selection.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredItems.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.03 } }}
                      >
                        <div className="menu-card group bg-royal-dark overflow-hidden border border-royal-cream/5 hover:border-royal-gold/30 transition-all duration-500">
                          <div className="relative overflow-hidden aspect-[4/3]">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-royal-black/80 via-transparent to-transparent" />
                            <span className="absolute top-3 right-3 bg-royal-gold text-royal-black px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-wider">
                              {item.badge}
                            </span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-heading text-lg text-white group-hover:text-royal-gold transition-colors duration-300">
                              {item.name}
                            </h3>
                            <p className="font-body text-sm text-royal-cream/70 mt-1.5 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
  );
}

export default MenuPage;
