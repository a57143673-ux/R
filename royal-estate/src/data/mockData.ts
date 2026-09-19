export type PropertyType = 'villa' | 'apartment' | 'house' | 'land' | 'commercial';
export type ListingType = 'forSale' | 'forRent';
export type ProjectStatus = 'upcoming' | 'underConstruction' | 'completed';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  neighborhood: string;
  city: string;
  address: string;
  price: number;
  currency: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  isFeatured: boolean;
  isVerified?: boolean;
  requestCount: number;
  createdAt: Date;
  website?: string;
  lat?: number;
  lng?: number;
  agentPhone?: string;
  agentWhatsapp?: string;
  agentName?: string;
  rating?: number;
  reviewCount?: number;
  floor?: number;
  yearBuilt?: number;
  parking?: number;
  hasPool?: boolean;
  hasGarden?: boolean;
  hasMaids?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  developer: string;
  neighborhood: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  images: string[];
  status: ProjectStatus;
  totalUnits: number;
  createdAt: Date;
  website?: string;
  lat?: number;
  lng?: number;
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  location: string;
  neighborhood: string;
  city: string;
  description: string;
  whatsapp: string;
  phone?: string;
  website?: string;
  agentCount: number;
  propertyCount: number;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  specialties?: string[];
}

// ── images ────────────────────────────────────────────────
const img1  = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900';
const img2  = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900';
const img3  = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900';
const img4  = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900';
const img5  = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900';
const img6  = 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900';
const img7  = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900';
const img8  = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900';
const img9  = 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=900';
const img10 = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900';
const img11 = 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=900';
const img12 = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900';
const img13 = 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900';
const img14 = 'https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=900';
const img15 = 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900';

export const properties: Property[] = [
  {
    id: 'p1',
     title: 'سماعات لاسلكية بإصدار حديث',
     description: 'سماعات عصرية بصوت واضح وبطارية طويلة. تصميم مريح للاستخدام اليومي مع علبة شحن أنيقة وضمان موثوق.',
    type: 'villa', listingType: 'forSale',
    neighborhood: 'حي النخبة', city: 'الرياض', address: 'شارع الملك فهد، حي النخبة',
    price: 3200000, currency: 'SAR', area: 650, bedrooms: 5, bathrooms: 6,
    images: [img1, img2, img7, img8], isFeatured: true, isVerified: true, requestCount: 47,
    createdAt: new Date(Date.now() - 5 * 86400000),
    lat: 24.7136, lng: 46.6753, agentPhone: '+966500000001', agentWhatsapp: '966500000001',
    agentName: 'أحمد الرشيد', rating: 4.8, reviewCount: 23, parking: 3,
    hasPool: true, hasGarden: true, yearBuilt: 2021,
  },
  {
    id: 'p2',
     title: 'حقيبة جلدية فاخرة',
     description: 'حقيبة أنيقة بخامة جلدية متينة وتصميم عملي. مناسبة للعمل والمناسبات وتتوفر بعدة ألوان مختارة.',
    type: 'apartment', listingType: 'forSale',
    neighborhood: 'برج المنارة', city: 'الرياض', address: 'طريق الملك عبدالله، الدور 18',
    price: 1200000, currency: 'SAR', area: 180, bedrooms: 3, bathrooms: 2,
    images: [img2, img5, img8, img10], isFeatured: true, isVerified: true, requestCount: 112,
    createdAt: new Date(Date.now() - 10 * 86400000),
    lat: 24.7241, lng: 46.6950, agentPhone: '+966500000002', agentWhatsapp: '966500000002',
    agentName: 'سارة العمري', rating: 4.9, reviewCount: 56, floor: 18, parking: 2, yearBuilt: 2022,
  },
  {
    id: 'p3',
     title: 'طقم قهوة أنيق للمنزل',
     description: 'طقم متكامل بتصميم أنيق وجودة عالية. إضافة جميلة للضيافة اليومية والمناسبات الخاصة.',
    type: 'house', listingType: 'forSale',
    neighborhood: 'الحي الهادئ', city: 'الرياض', address: 'شارع الأمير سلطان، رقم 14',
    price: 1800000, currency: 'SAR', area: 400, bedrooms: 4, bathrooms: 4,
    images: [img3, img6, img9], isFeatured: false, requestCount: 28,
    createdAt: new Date(Date.now() - 15 * 86400000),
    lat: 24.6877, lng: 46.7219, agentPhone: '+966500000003', agentWhatsapp: '966500000003',
    agentName: 'محمد الغامدي', rating: 4.5, reviewCount: 12, parking: 2, hasGarden: true, yearBuilt: 2019,
  },
  {
    id: 'p4',
     title: 'مصباح مكتبي ذكي',
     description: 'مصباح عملي بإضاءة قابلة للتعديل وتصميم عصري. مثالي للمكتب أو غرفة الدراسة مع استهلاك منخفض للطاقة.',
    type: 'apartment', listingType: 'forRent',
    neighborhood: 'حي الجامعة', city: 'جدة', address: 'شارع التحلية، المبنى 5',
    price: 28000, currency: 'SAR', area: 95, bedrooms: 2, bathrooms: 1,
    images: [img4, img11], isFeatured: false, requestCount: 63,
    createdAt: new Date(Date.now() - 3 * 86400000),
    lat: 21.4858, lng: 39.1925, agentPhone: '+966500000004', agentWhatsapp: '966500000004',
    agentName: 'نورة القحطاني', rating: 4.2, reviewCount: 8, floor: 3, yearBuilt: 2018,
  },
  {
    id: 'p5',
     title: 'مجموعة عناية بالبشرة',
     description: 'مجموعة عناية يومية بتركيبات لطيفة ومكونات مختارة. تمنح بشرتك إحساساً بالانتعاش والعناية.',
    type: 'land', listingType: 'forSale',
    neighborhood: 'المربع', city: 'الرياض', address: 'شارع العليا',
    price: 4500000, currency: 'SAR', area: 1200,
    images: [img12, img13], isFeatured: true, isVerified: true, requestCount: 31,
    createdAt: new Date(Date.now() - 20 * 86400000),
    lat: 24.7500, lng: 46.7200, agentPhone: '+966500000005', agentWhatsapp: '966500000005',
    agentName: 'فهد الدوسري', rating: 4.7, reviewCount: 19,
  },
  {
    id: 'p6',
     title: 'ساعة رياضية متعددة الاستخدام',
     description: 'ساعة عملية لمتابعة النشاط والتنبيهات اليومية. تصميم خفيف وبطارية مناسبة للاستخدام المستمر.',
    type: 'commercial', listingType: 'forRent',
    neighborhood: 'مول الراشد', city: 'الدمام', address: 'طريق الملك عبدالعزيز، الدور الأرضي',
    price: 65000, currency: 'SAR', area: 120,
    images: [img5, img14], isFeatured: false, requestCount: 18,
    createdAt: new Date(Date.now() - 8 * 86400000),
    lat: 26.4207, lng: 50.0888, agentPhone: '+966500000006', agentWhatsapp: '966500000006',
    agentName: 'علي الشهري', rating: 4.0, reviewCount: 5,
  },
  {
    id: 'p7',
     title: 'حذاء رياضي خفيف ومريح',
     description: 'حذاء رياضي بتصميم مريح وخامة مرنة. مناسب للمشي والأنشطة اليومية ويتوفر بمقاسات متعددة.',
    type: 'apartment', listingType: 'forSale',
    neighborhood: 'الواجهة البحرية', city: 'جدة', address: 'كورنيش جدة، برج المارينا',
    price: 2100000, currency: 'SAR', area: 220, bedrooms: 4, bathrooms: 3,
    images: [img7, img1, img9], isFeatured: true, isVerified: true, requestCount: 89,
    createdAt: new Date(Date.now() - 2 * 86400000),
    lat: 21.5433, lng: 39.1728, agentPhone: '+966500000007', agentWhatsapp: '966500000007',
    agentName: 'لمياء الزهراني', rating: 4.9, reviewCount: 41, floor: 12, parking: 2, yearBuilt: 2023,
  },
  {
    id: 'p8',
     title: 'مجموعة أواني مطبخ عملية',
     description: 'مجموعة متناسقة للمطبخ بخامات سهلة التنظيف وتصميم عملي يناسب الاستخدام اليومي.',
    type: 'villa', listingType: 'forRent',
    neighborhood: 'حي الشاطئ', city: 'الدمام', address: 'شارع الأمير نايف، حي الشاطئ',
    price: 95000, currency: 'SAR', area: 380, bedrooms: 5, bathrooms: 5,
    images: [img8, img2, img6], isFeatured: false, requestCount: 22,
    createdAt: new Date(Date.now() - 12 * 86400000),
    lat: 26.3927, lng: 50.1097, agentPhone: '+966500000008', agentWhatsapp: '966500000008',
    agentName: 'عمر الحربي', rating: 4.4, reviewCount: 9, parking: 3, hasGarden: true, yearBuilt: 2017,
  },
  {
    id: 'p9',
     title: 'عطر فاخر بتركيبة شرقية',
     description: 'عطر مميز بنفحات شرقية دافئة وثبات رائع. اختيار مناسب للهدايا والاستخدام اليومي.',
    type: 'apartment', listingType: 'forRent',
    neighborhood: 'حي النزهة', city: 'الرياض', address: 'شارع النزهة، مبنى 7',
    price: 18000, currency: 'SAR', area: 75, bedrooms: 2, bathrooms: 1,
    images: [img10, img4], isFeatured: false, requestCount: 44,
    createdAt: new Date(Date.now() - 6 * 86400000),
    lat: 24.6900, lng: 46.7100, agentPhone: '+966500000009', agentWhatsapp: '966500000009',
    agentName: 'ريم السعدي', rating: 3.9, reviewCount: 6, floor: 2, yearBuilt: 2015,
  },
  {
    id: 'p10',
     title: 'جهاز لوحي للدراسة والعمل',
     description: 'جهاز عملي بشاشة واضحة وأداء سريع للاستخدام اليومي. مناسب للدراسة والعمل والترفيه.',
    type: 'villa', listingType: 'forSale',
    neighborhood: 'حي السفارات', city: 'الرياض', address: 'شارع الدبلوماسي',
    price: 18500000, currency: 'SAR', area: 1800, bedrooms: 9, bathrooms: 10,
    images: [img15, img1, img7, img8], isFeatured: true, isVerified: true, requestCount: 7,
    createdAt: new Date(Date.now() - 30 * 86400000),
    lat: 24.7800, lng: 46.6400, agentPhone: '+966500000010', agentWhatsapp: '966500000010',
    agentName: 'خالد المطيري', rating: 5.0, reviewCount: 3, parking: 10,
    hasPool: true, hasGarden: true, hasMaids: true, yearBuilt: 2020,
  },
  {
    id: 'p11',
     title: 'محفظة جلدية بتصميم بسيط',
     description: 'محفظة عملية بخامة متينة ومساحات منظمة للبطاقات والنقود. تصميم أنيق وخفيف.',
    type: 'land', listingType: 'forSale',
    neighborhood: 'العوالي', city: 'المدينة المنورة', address: 'شارع العوالي',
    price: 850000, currency: 'SAR', area: 500,
    images: [img11, img13], isFeatured: false, requestCount: 15,
    createdAt: new Date(Date.now() - 25 * 86400000),
    lat: 24.4672, lng: 39.6024, agentPhone: '+966500000011', agentWhatsapp: '966500000011',
    agentName: 'يوسف الأنصاري', rating: 4.3, reviewCount: 4,
  },
  {
    id: 'p12',
     title: 'سلة هدايا متنوعة',
     description: 'سلة هدايا جاهزة تضم منتجات مختارة بعناية. مناسبة للمناسبات وتصل بتغليف أنيق.',
    type: 'house', listingType: 'forSale',
    neighborhood: 'حي الياسمين', city: 'الرياض', address: 'حي الياسمين، الشارع الأول',
    price: 1350000, currency: 'SAR', area: 290, bedrooms: 4, bathrooms: 4,
    images: [img12, img2, img6], isFeatured: false, isVerified: true, requestCount: 34,
    createdAt: new Date(Date.now() - 7 * 86400000),
    lat: 24.8100, lng: 46.6200, agentPhone: '+966500000012', agentWhatsapp: '966500000012',
    agentName: 'هند الشمري', rating: 4.6, reviewCount: 17, parking: 2, hasMaids: true, yearBuilt: 2022,
  },
];

export const projects: Project[] = [
  {
    id: 'pr1', title: 'قصة متجر صفصاف',
    description: 'تعرّف على أحدث المنتجات المختارة وتجربة التسوق اليومية من متجر صفصاف.',
    developer: 'متجر صفصاف', neighborhood: 'المنتجات المختارة', city: 'الرياض',
    minPrice: 800000, maxPrice: 3500000, currency: 'SAR',
    images: [img1, img2], status: 'underConstruction', totalUnits: 200,
    createdAt: new Date(Date.now() - 60 * 86400000), lat: 24.7400, lng: 46.7000,
  },
  {
     id: 'pr2', title: 'قصة متجر الذوق',
     description: 'إطلالة على تشكيلات الأزياء والإكسسوارات الجديدة من متجر الذوق.',
     developer: 'متجر الذوق', neighborhood: 'تشكيلات جديدة', city: 'جدة',
    minPrice: 1200000, maxPrice: 5000000, currency: 'SAR',
    images: [img5, img7], status: 'upcoming', totalUnits: 350,
    createdAt: new Date(Date.now() - 30 * 86400000), lat: 21.5600, lng: 39.1700,
  },
  {
     id: 'pr3', title: 'قصة متجر التقنية',
     description: 'اكتشف الأجهزة والإكسسوارات الذكية التي تجعل يومك أسهل.',
     developer: 'متجر التقنية', neighborhood: 'اختيارات ذكية', city: 'الرياض',
    minPrice: 650000, maxPrice: 1800000, currency: 'SAR',
    images: [img3, img9], status: 'completed', totalUnits: 150,
    createdAt: new Date(Date.now() - 90 * 86400000), lat: 24.8200, lng: 46.5900,
  },
];

export const companies: Company[] = [
  {
    id: 'c1', name: 'متجر صفصاف',
    logoUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200',
    location: 'الرياض، حي العليا', neighborhood: 'العليا', city: 'الرياض',
     description: 'متجر متنوع يقدّم منتجات مختارة بجودة عالية وخدمة سريعة.',
    whatsapp: '966500000001', phone: '+966114444444',
    agentCount: 35, propertyCount: 120, isVerified: true, rating: 4.8, reviewCount: 234,
     specialties: ['إلكترونيات', 'منزل', 'عروض'],
  },
  {
     id: 'c2', name: 'متجر النخبة',
    logoUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200',
    location: 'جدة، حي الزهراء', neighborhood: 'الزهراء', city: 'جدة',
     description: 'تشكيلة مميزة من الأزياء والإكسسوارات والهدايا لكل مناسبة.',
    whatsapp: '966500000002', phone: '+966122222222',
    agentCount: 20, propertyCount: 85, isVerified: true, rating: 4.6, reviewCount: 152,
     specialties: ['أزياء', 'إكسسوارات', 'هدايا'],
  },
  {
     id: 'c3', name: 'متجر الخليج',
    logoUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200',
    location: 'الدمام، حي الفيصلية', neighborhood: 'الفيصلية', city: 'الدمام',
     description: 'منتجات يومية متنوعة مع خيارات توصيل مرنة وخدمة تواصل مباشرة.',
    whatsapp: '966500000003', phone: '+966133333333',
    agentCount: 12, propertyCount: 47, isVerified: false, rating: 4.1, reviewCount: 68,
     specialties: ['منزل', 'عناية', 'متنوع'],
  },
  {
     id: 'c4', name: 'متجر الذوق',
    logoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200',
    location: 'مكة المكرمة، العزيزية', neighborhood: 'العزيزية', city: 'مكة المكرمة',
     description: 'متجر متخصص في العطور والهدايا والمنتجات ذات الطابع المميز.',
    whatsapp: '966500000004',
    agentCount: 8, propertyCount: 32, isVerified: true, rating: 4.5, reviewCount: 91,
     specialties: ['عطور', 'هدايا', 'عناية'],
  },
];

// ── helpers ────────────────────────────────────────────────
export function typeLabel(t: PropertyType): string {
  const m: Record<PropertyType, string> = { villa: 'إلكترونيات', apartment: 'أزياء', house: 'منزل', land: 'عناية شخصية', commercial: 'متنوع' };
  return m[t];
}
export function listingLabel(l: ListingType): string {
  return l === 'forSale' ? 'عرض خاص' : 'متاح الآن';
}
export function formatPrice(price: number, currency: string, listingType: ListingType): string {
  const fmt = price >= 1_000_000
    ? `${(price / 1_000_000).toFixed(1)} م`
    : price >= 1_000
    ? `${(price / 1_000).toFixed(0)} ألف`
    : `${price}`;
  const suffix = listingType === 'forRent' ? '/سنة' : '';
  return `${fmt} ${currency}${suffix}`;
}
export function statusLabel(s: ProjectStatus): string {
  const m: Record<ProjectStatus, string> = { upcoming: 'قصة جديدة', underConstruction: 'الأكثر تفاعلاً', completed: 'مميزة' };
  return m[s];
}

export const CITIES = ['الرياض', 'جدة', 'الدمام', 'المدينة المنورة', 'مكة المكرمة', 'تبوك', 'أبها'];

export function statusColor(s: ProjectStatus): string {
  const m: Record<ProjectStatus, string> = {
    upcoming:           'text-blue-600',
    underConstruction:  'text-amber-600',
    completed:          'text-green-700',
  };
  return m[s];
}
