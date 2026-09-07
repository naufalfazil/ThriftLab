export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  details: {
    size: string;
    condition: string;
    description: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Vintage Flannel Dickies',
    price: 150000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x55 cm)',
      condition: '9/10 (No minus)',
      description: 'Flannel vintage warna merah hitam bahan tebal original.'
    }
  },
  {
    id: 2,
    name: 'Retro Denim Jacket Levis',
    price: 250000,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (75x60 cm)',
      condition: '8.5/10 (Pudar pemakaian wajar di kerah)',
      description: 'Jaket denim klasik washed blue, kancing lengkap.'
    }
  },
  {
    id: 3,
    name: 'Vintage Graphic Tee Band',
    price: 120000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x50 cm)',
      condition: '9/10 (Sablon masih aman)',
      description: 'Kaos band vintage bahan katun lembut.'
    }
  },
  {
    id: 4,
    name: 'Carhartt Active Hoodie Brown',
    price: 350000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (74x58 cm)',
      condition: '8/10 (Ada sedikit furing berbulu halus)',
      description: 'Hoodie kanvas Carhartt original, hangat dan kokoh.'
    }
  },
  {
    id: 5,
    name: 'Champion Reverse Weave Crewneck',
    price: 220000,
    category: 'Crewneck',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (70x54 cm)',
      condition: '9.5/10 (Like new)',
      description: 'Crewneck abu-abu terang, bordir logo dada aman.'
    }
  },
  {
    id: 6,
    name: 'Flannel Woolrich Checkered',
    price: 160000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (76x60 cm)',
      condition: '9/10 (Warna pekat)',
      description: 'Flannel tebal cocok untuk riding atau cuaca dingin.'
    }
  },
  {
    id: 7,
    name: 'Vintage Wrangler Denim Shirt',
    price: 180000,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (69x52 cm)',
      condition: '9/10 (Kancing mutiara utuh)',
      description: 'Kemeja denim Wrangler klasik warna medium wash.'
    }
  },
  {
    id: 8,
    name: 'Stussy Basic Logo Hoodie',
    price: 300000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x56 cm)',
      condition: '8.5/10 (Sablon aman minor pemakaian)',
      description: 'Streetwear vintage Stussy hitam pekat.'
    }
  },
  {
    id: 9,
    name: 'Nike Vintage Windbreaker',
    price: 200000,
    category: 'Windbreaker',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (71x56 cm)',
      condition: '9/10 (Resleting lancar)',
      description: 'Windbreaker retro Nike warna kombinasi navy-white.'
    }
  },
  {
    id: 10,
    name: 'Adidas Oversized Tracktop',
    price: 240000,
    category: 'Jacket',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (75x62 cm)',
      condition: '9/10 (No bobol)',
      description: 'Tracktop klasik garis tiga warna hijau botol.'
    }
  },
  {
    id: 11,
    name: 'Polo Ralph Lauren Cable Knit',
    price: 280000,
    category: 'Sweater',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (67x50 cm)',
      condition: '9.5/10 (Bahan mulus)',
      description: 'Sweater rajut krem dengan bordir logo polo merah.'
    }
  },
  {
    id: 12,
    name: 'Vintage Varsity Jacket Leather Sleeve',
    price: 400000,
    category: 'Varsity',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (73x58 cm)',
      condition: '8/10 (Kulit lengan ada kerut wajar)',
      description: 'Varsity Amerika bahan wool tebal dengan lengan kulit asli.'
    }
  },
  {
    id: 13,
    name: 'Pendleton Tartan Flannel',
    price: 190000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (70x52 cm)',
      condition: '9.5/10 (Kondisi prima)',
      description: 'Flannel wol murni brand Pendleton motif kotak hijau.'
    }
  },
  {
    id: 14,
    name: 'Thrasher Flame Logo Tee',
    price: 130000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x54 cm)',
      condition: '8.5/10 (Sablon ada retak sithik)',
      description: 'Kaos skateboard klasik warna hitam.'
    }
  },
  {
    id: 15,
    name: 'Patagonia Synchilla Fleece',
    price: 320000,
    category: 'Fleece',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x53 cm)',
      condition: '9/10 (Bulu masih padat)',
      description: 'Fleece tebal hangat warna oatmeal original Patagonia.'
    }
  },
  {
    id: 16,
    name: 'Bape Camo Shark Hoodie',
    price: 450000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (73x56 cm)',
      condition: '9/10 (Resleting full hingga kupluk)',
      description: 'Hoodie motif camo hijau khas streetwear.'
    }
  },
  {
    id: 17,
    name: 'Dickies Work Shirt Grey',
    price: 140000,
    category: 'Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x56 cm)',
      condition: '9/10 (Bahan twill kuat)',
      description: 'Kemeja kerja Dickies abu-abu terang.'
    }
  },
  {
    id: 18,
    name: 'Supreme Box Logo Crewneck',
    price: 380000,
    category: 'Crewneck',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (74x58 cm)',
      condition: '9/10 (Bordir dada rapih)',
      description: 'Crewneck Supreme warna navy edisi terbatas.'
    }
  },
  {
    id: 19,
    name: 'Vintage Oversized Striped Tee',
    price: 95000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (76x60 cm)',
      condition: '9/10',
      description: 'Kaos garis-garis gaya 90-an bahan adem.'
    }
  },
  {
    id: 20,
    name: 'North Face Mountain Jacket',
    price: 420000,
    category: 'Jacket',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (73x58 cm)',
      condition: '8.5/10 (Water repellent aman)',
      description: 'Jaket gunung dual layer warna kuning hitam.'
    }
  },
  {
    id: 21,
    name: 'Uniqlo Flannel Check Blue',
    price: 110000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'S (65x48 cm)',
      condition: '9.5/10 (Seperti baru)',
      description: 'Flannel katun lembut motif kotak biru.'
    }
  },
  {
    id: 22,
    name: 'Vintage Converse Crewneck',
    price: 170000,
    category: 'Crewneck',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x52 cm)',
      condition: '9/10',
      description: 'Crewneck merah maroon sablon dada vintage.'
    }
  },
  {
    id: 23,
    name: 'Gap Vintage Denim Trucker',
    price: 210000,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x52 cm)',
      condition: '9/10 (Warna medium wash)',
      description: 'Jaket trucker denim Gap potongan klasik.'
    }
  },
  {
    id: 24,
    name: 'Nike Vintage Swoosh Hoodie',
    price: 260000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (75x61 cm)',
      condition: '8.5/10',
      description: 'Hoodie navy dengan bordir logo nike kecil di dada.'
    }
  },
  {
    id: 25,
    name: 'Harley Davidson Vintage Tee',
    price: 180000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x55 cm)',
      condition: '8/10 (Single stitch, wash faded)',
      description: 'Kaos motor klasik abu-abu tua.'
    }
  },
  {
    id: 26,
    name: 'Columbia Puffer Jacket',
    price: 350000,
    category: 'Jacket',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x57 cm)',
      condition: '9/10 (Minus bulu angsa masih tebal)',
      description: 'Jaket musim dingin empuk warna hitam pekat.'
    }
  },
  {
    id: 27,
    name: 'Zara Man Wool Coat Vintage',
    price: 390000,
    category: 'Coat',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (76x56 cm)',
      condition: '9.5/10',
      description: 'Long coat bahan wol warna charcoal elegan.'
    }
  },
  {
    id: 28,
    name: 'H&M Oversized Hoodie Beige',
    price: 150000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (69x54 cm)',
      condition: '9/10',
      description: 'Hoodie warna krem polos bahan fleece lembut.'
    }
  },
  {
    id: 29,
    name: 'Vintage Polo Sport Windbreaker',
    price: 270000,
    category: 'Windbreaker',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x58 cm)',
      condition: '8.5/10',
      description: 'Windbreaker retro colorblock merah putih biru.'
    }
  },
  {
    id: 30,
    name: 'Reebok Classic Vector Crewneck',
    price: 190000,
    category: 'Crewneck',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x53 cm)',
      condition: '9/10',
      description: 'Crewneck hitam dengan bordir logo besar di dada.'
    }
  },
  {
    id: 31,
    name: 'Flannel Herning Heavy Duty',
    price: 165000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (73x56 cm)',
      condition: '9/10',
      description: 'Flannel bahan tebal warna mustard kombinasi navy.'
    }
  },
  {
    id: 32,
    name: 'Supreme Pocket Tee White',
    price: 170000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x51 cm)',
      condition: '8.5/10 (Putih bersih)',
      description: 'Kaos polos putih dengan saku dada berlogo kecil.'
    }
  },
  {
    id: 33,
    name: 'Wrangler Sherpa Denim Jacket',
    price: 310000,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x57 cm)',
      condition: '9/10 (Bulu sherpa dalam putih bersih)',
      description: 'Jaket denim berbulu hangat di bagian kerah dan badan.'
    }
  },
  {
    id: 34,
    name: 'Adidas Vintage Trefoil Hoodie',
    price: 230000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (69x53 cm)',
      condition: '9/10',
      description: 'Hoodie biru dongker logo trefoil besar di depan.'
    }
  },
  {
    id: 35,
    name: 'Vintage Acid Wash Jeans Jacket',
    price: 240000,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (71x56 cm)',
      condition: '9/10',
      description: 'Jaket denim motif acid wash khas era 80an.'
    }
  },
  {
    id: 36,
    name: 'Carhartt WIP Pocket Longsleeve',
    price: 160000,
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (73x55 cm)',
      condition: '9.5/10',
      description: 'Kaos lengan panjang coklat tua bahan katun tebal.'
    }
  },
  {
    id: 37,
    name: 'Nike ACG Fleece Pullover',
    price: 340000,
    category: 'Fleece',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (72x57 cm)',
      condition: '9/10',
      description: 'Fleece outdoor sub-brand Nike ACG warna ungu tua.'
    }
  },
  {
    id: 38,
    name: 'Vintage Checkered Wool Shirt',
    price: 175000,
    category: 'Flannel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'XL (77x61 cm)',
      condition: '9/10',
      description: 'Kemeja wol tebal motif kotak besar warna merah.'
    }
  },
  {
    id: 39,
    name: 'Champion Basic Zip Hoodie',
    price: 250000,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'M (68x53 cm)',
      condition: '9/10',
      description: 'Hoodie menggunakan resleting depan warna abu-abu misty.'
    }
  },
  {
    id: 40,
    name: 'Vintage MLB Yankees Varsity',
    price: 430000,
    category: 'Varsity',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    details: {
      size: 'L (74x59 cm)',
      condition: '9/10 (Bordir logo Yankees timbul)',
      description: 'Jaket varsity baseball original New York Yankees.'
    }
  }
];