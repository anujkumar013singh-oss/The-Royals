import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRes, menuRes, testimonialRes] = await Promise.allSettled([
        api.get('/settings'),
        api.get('/menu'),
        api.get('/testimonials'),
      ]);
      if (settingsRes.status === 'fulfilled') {
        setSettings(settingsRes.value.data?.data || settingsRes.value.data);
      }
      if (menuRes.status === 'fulfilled') {
        const menuData = menuRes.value.data?.data || menuRes.value.data;
        setMenuItems(Array.isArray(menuData) ? menuData : []);
      }
      if (testimonialRes.status === 'fulfilled') {
        const testimonialData = testimonialRes.value.data?.data || testimonialRes.value.data;
        setTestimonials(Array.isArray(testimonialData) ? testimonialData : []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <SiteContext.Provider value={{ settings, menuItems, testimonials, loading, refetch: fetchAll }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteContext must be used within a SiteProvider');
  return context;
}
