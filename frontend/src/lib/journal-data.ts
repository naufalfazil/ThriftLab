export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'cara-memilih-flannel-vintage',
    title: 'Cara Memilih Flannel Vintage yang Berkualitas',
    excerpt:
      'Panduan lengkap membedakan flannel vintage asli dari replika, termasuk detail label, kain, dan jahitan.',
    category: 'Style Guide',
    date: '2026-08-15',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=500&fit=crop',
    content: [
      'Flannel vintage adalah salah satu item paling dicari di dunia thrift. Namun, tidak semua flannel yang terlihat "vintage" benar-benar berkualitas.',
      'Perhatikan label merek di bagian dalam. Merek-merek seperti Woolrich, Pendleton, dan Filson menghasilkan flannel dengan kualitas terbaik yang bertahan puluhan tahun.',
      'Tekstur kain harus terasa berat dan lembut. Flannel murah cenderung tipis dan kasar. Vintage yang baik memiliki weight yang cukup untuk memberikan kehangatan tanpa terasa kaku.',
      'Periksa jahitan pada bagian bahu dan lengan. Jahitan yang rapi dan kuat menandakan produksi berkualitas tinggi.',
      'Di ThriftLab, setiap flannel melalui inspeksi kondisi ketat sebelum masuk ke arsip kami.',
    ],
  },
  {
    slug: 'tren-streetwear-2026',
    title: 'Tren Streetwear yang Mendominasi 2026',
    excerpt:
      'Dari oversized silhouettes hingga earth tones, inilah tren yang membentuk lanskap streetwear tahun ini.',
    category: 'Style Guide',
    date: '2026-07-28',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=500&fit=crop',
    content: [
      'Tahun 2026 membawa pergeseran signifikan dalam dunia streetwear. Oversized silhouettes tetap mendominasi, tetapi dengan pendekatan yang lebih terstruktur.',
      'Earth tones dan muted colors menjadi pilihan utama, menggantikan neon dan bold colors yang sempat populer. Warna seperti olive, khaki, dan rust menjadi favorit.',
      'Vintage dan second-hand semakin diterima sebagai bagian dari sustainable fashion movement. Brand-brand besar mulai mengakui pengaruh thrift culture.',
      'Layering menjadi kunci. Flannel di atas hoodie, jacket di atas crewneck — kombinasi yang menciptakan depth dan karakter pada setiap outfit.',
      'Koleksi ThriftLab dirancang untuk mengakomodasi tren ini dengan pilihan vintage yang tepat sasaran.',
    ],
  },
  {
    slug: 'manfaat-thrift-fashion',
    title: 'Mengapa Thrift Fashion adalah Masa Depan',
    excerpt:
      'Dampak lingkungan fast fashion dan bagaimana memilih second-hand bisa menjadi solusi nyata.',
    category: 'Sustainability',
    date: '2026-07-10',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
    content: [
      'Industri fast fashion menghasilkan 92 juta ton limbah tekstil setiap tahun. Angka ini terus meningkat seiring konsumsi yang tidak berkelanjutan.',
      'Memilih pakaian second-hand mengurangi jejak karbon secara signifikan. Setiap item yang digunakan kembali menghemat ribuan liter air dan mengurangi emisi karbon.',
      'Thrift fashion bukan hanya soal lingkungan — ini tentang karakter. Pakaian vintage memiliki cerita dan kualitas yang sulit ditemukan di produk massal.',
      'Generasi muda semakin menyadari dampak pilihan fashion mereka. Thrift culture bukan sekadar tren, tetapi gerakan nyata.',
      'ThriftLab hadir sebagai jembatan antara sustainable practice dan gaya personal yang autentik.',
    ],
  },
  {
    slug: 'perawatan-denim-vintage',
    title: 'Panduan Perawatan Denim Vintage',
    excerpt:
      'Tips menjaga kondisi denim vintage agar tetap awet dan terlihat terbaik selama bertahun-tahun.',
    category: 'Thrift Tips',
    date: '2026-06-22',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=500&fit=crop',
    content: [
      'Denim vintage membutuhkan perawatan khusus berbeda dari denim modern. Yang pertama dan terpenting: jangan pernah mencucinya terlalu sering.',
      'Cukup cuci setiap 3-5 pemakaian dengan air dingin dan deterjen ringan. Hindari penggunaan pemutih karena dapat merusak serat denim.',
      'Jemur dengan cara dijemur terbalik di tempat teduh untuk mencegah pemudaran warna yang tidak merata.',
      'Untuk noda kecil, gunakan lap lembap dan gosok perlahan. Hindari penggunaan mesin cuci untuk perawatan sehari-hari.',
      'Denim yang dirawat dengan baik akan mengembangkan fading pattern yang unik — ini yang membuatnya semakin berharga seiring waktu.',
    ],
  },
  {
    slug: 'mix-and-match-layering',
    title: 'Mix and Match: Seni Layering dalam Streetwear',
    excerpt:
      'Teknik layering yang efektif untuk menciptakan outfit yangDepth dan ber karakter.',
    category: 'Style Guide',
    date: '2026-06-05',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=500&fit=crop',
    content: [
      'Layering adalah fondasi dari streetwear yang baik. Ini bukan sekadar memakai banyak pakaian, tetapi menciptakan visual depth.',
      'Mulai dengan dasar yang solid — t-shirt atau longsleeve yang nyaman. Layer kedua bisa berupa flannel atau hoodie. Layer ketiga adalah outerwear seperti jacket.',
      'Perhatikan proporsi. Oversized di bagian atas bisa dipadukan dengan straight atau slim di bawah, atau sebaliknya. Konsistensi adalah kunci.',
      'Warna tidak harus matching sempurna. Complementary colors atau monochromatic palette memberikan hasil yang lebih menarik.',
      'Koleksi ThriftLab dirancang untuk saling melengkapi — setiap item bisa menjadi bagian dari layering system yang cohesive.',
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
