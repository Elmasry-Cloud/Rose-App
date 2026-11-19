import { Gift, Headset, Home, Info, LayoutList, PartyPopper } from 'lucide-react';

export const navLinks = [
  { href: '/', key: 'home', icon: Home },
  { href: '/products', key: 'products', icon: Gift },
  { href: '/categories', key: 'categories', icon: LayoutList },
  { href: '/occasions', key: 'occasions', icon: PartyPopper },
  { href: '/contact', key: 'contact', icon: Headset },
  { href: '/about', key: 'about', icon: Info },
] as const;
