export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Koleksi',
    href: '/collection',
    children: [
      { label: 'Semua Koleksi', href: '/collection' },
      { label: 'New Arrivals', href: '/collection?filter=new' },
      { label: 'Best Sellers', href: '/collection?filter=best' },
      { label: 'Vintage', href: '/collection?filter=vintage' },
      { label: 'Streetwear', href: '/collection?filter=streetwear' },
      { label: 'Essentials', href: '/collection?filter=essentials' },
    ],
  },
  {
    label: 'Kategori',
    href: '/categories',
    children: [
      { label: 'Flannel', href: '/categories/flannel' },
      { label: 'Hoodie', href: '/categories/hoodie' },
      { label: 'Denim', href: '/categories/denim' },
      { label: 'T-Shirt', href: '/categories/t-shirt' },
      { label: 'Jacket', href: '/categories/jacket' },
      { label: 'Crewneck', href: '/categories/crewneck' },
    ],
  },
  {
    label: 'Journal',
    href: '/journal',
    children: [
      { label: 'Semua Artikel', href: '/journal' },
      { label: 'Style Guide', href: '/journal' },
      { label: 'Thrift Tips', href: '/journal' },
      { label: 'Sustainability', href: '/journal' },
    ],
  },
  {
    label: 'Tentang',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/story' },
      { label: 'Sustainability', href: '/about/sustainability' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];
