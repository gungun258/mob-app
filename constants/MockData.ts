// Mock data for the AI Background Marketplace app

export const trendingBackgrounds = [
  {
    id: '1',
    title: 'Ethereal Sunset',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=500&fit=crop',
    price: 50,
    seller: 'ArtisticVisions',
    likes: 2340,
    category: 'Nature',
  },
  {
    id: '2',
    title: 'Neon City Nights',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=500&fit=crop',
    price: 75,
    seller: 'UrbanDreams',
    likes: 1890,
    category: 'Urban',
  },
  {
    id: '3',
    title: 'Cherry Blossom',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=500&fit=crop',
    price: 60,
    seller: 'NatureLens',
    likes: 3120,
    category: 'Floral',
  },
  {
    id: '4',
    title: 'Studio Luxury',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop',
    price: 100,
    seller: 'ProStudios',
    likes: 4560,
    category: 'Studio',
  },
  {
    id: '5',
    title: 'Dreamy Clouds',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=500&fit=crop',
    price: 45,
    seller: 'SkyArtist',
    likes: 1670,
    category: 'Fantasy',
  },
];

export const topSellers = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: '12.5K',
    listings: 89,
    verified: true,
  },
  {
    id: '2',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: '8.2K',
    listings: 56,
    verified: true,
  },
  {
    id: '3',
    name: 'Mia Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: '15.1K',
    listings: 124,
    verified: true,
  },
  {
    id: '4',
    name: 'James Park',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: '6.7K',
    listings: 42,
    verified: false,
  },
  {
    id: '5',
    name: 'Luna Zhang',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    followers: '22.3K',
    listings: 201,
    verified: true,
  },
];

export const followingListings = [
  {
    id: '1',
    title: 'Golden Hour Portrait',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    seller: 'Sarah Chen',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    price: 80,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    title: 'Tropical Paradise',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    seller: 'Luna Zhang',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    price: 65,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    title: 'Minimalist Studio',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    seller: 'Alex Rivera',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    price: 90,
    timeAgo: '1d ago',
  },
];

export const publicGenerations = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop',
    user: 'creativemind',
    likes: 234,
    style: 'Dreamy',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=350&fit=crop',
    user: 'artlover99',
    likes: 189,
    style: 'Cinematic',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=450&fit=crop',
    user: 'pixeldreams',
    likes: 567,
    style: 'Fashion',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=380&fit=crop',
    user: 'aiartist',
    likes: 890,
    style: 'Realistic',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=420&fit=crop',
    user: 'bgmaker',
    likes: 345,
    style: 'Studio',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop',
    user: 'visualcraft',
    likes: 123,
    style: 'Luxury',
  },
];

export const discoverCategories = [
  { id: '1', name: 'Nature', emoji: '🌿', color: '#6EE7B7' },
  { id: '2', name: 'Urban', emoji: '🏙️', color: '#7DD3FC' },
  { id: '3', name: 'Studio', emoji: '📸', color: '#C4B5FD' },
  { id: '4', name: 'Fashion', emoji: '👗', color: '#F9A8D4' },
  { id: '5', name: 'Fantasy', emoji: '✨', color: '#FBBF84' },
  { id: '6', name: 'Minimal', emoji: '◻️', color: '#E2E8F0' },
  { id: '7', name: 'Abstract', emoji: '🎨', color: '#FCA5D0' },
  { id: '8', name: 'Vintage', emoji: '📷', color: '#DDD6FE' },
];

export const forYouItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=500&fit=crop',
    title: 'Cosmic Dreams',
    creator: 'SpaceArt',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop',
    title: 'Abstract Flow',
    creator: 'ModernArt',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    title: 'Mountain Majesty',
    creator: 'NaturePro',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
    title: 'Festival Lights',
    creator: 'EventShots',
  },
];

export const aiStyles = [
  { id: '1', name: 'Realistic', icon: '🎯', gradient: ['#8B5CF6', '#7C3AED'] },
  { id: '2', name: 'Fashion', icon: '👗', gradient: ['#EC4899', '#F472B6'] },
  { id: '3', name: 'Cinematic', icon: '🎬', gradient: ['#F59E0B', '#FB923C'] },
  { id: '4', name: 'Studio', icon: '📸', gradient: ['#3B82F6', '#7DD3FC'] },
  { id: '5', name: 'Dreamy', icon: '☁️', gradient: ['#A78BFA', '#C4B5FD'] },
  { id: '6', name: 'Luxury', icon: '💎', gradient: ['#F472B6', '#FBBF84'] },
];

export const galleryImages = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
    type: 'generated',
    style: 'Fashion',
    date: '2024-01-15',
    loved: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    type: 'uploaded',
    date: '2024-01-14',
    loved: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
    type: 'generated',
    style: 'Cinematic',
    date: '2024-01-13',
    loved: true,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    type: 'generated',
    style: 'Studio',
    date: '2024-01-12',
    loved: false,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    type: 'uploaded',
    date: '2024-01-11',
    loved: true,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    type: 'generated',
    style: 'Dreamy',
    date: '2024-01-10',
    loved: false,
  },
];

export const creditPackages = [
  {
    id: '1',
    credits: 50,
    price: '$4.99',
    popular: false,
    savings: '',
    color: '#7DD3FC',
  },
  {
    id: '2',
    credits: 150,
    price: '$12.99',
    popular: true,
    savings: 'Save 13%',
    color: '#8B5CF6',
  },
  {
    id: '3',
    credits: 500,
    price: '$39.99',
    popular: false,
    savings: 'Save 20%',
    color: '#F472B6',
  },
  {
    id: '4',
    credits: 1000,
    price: '$69.99',
    popular: false,
    savings: 'Save 30%',
    color: '#FBBF84',
  },
];

export const menuItems = [
  { id: '1', title: 'Buy Credits', icon: 'diamond', route: 'credits' },
  { id: '2', title: 'Seller Dashboard', icon: 'storefront-outline', route: 'seller-dashboard' },
  { id: '3', title: 'Edit Profile', icon: 'person-outline', route: 'edit-profile' },
  { id: '4', title: 'Wishlist', icon: 'heart-outline', route: 'wishlist' },
  { id: '5', title: 'Referrals', icon: 'gift-outline', route: 'referrals' },
  { id: '6', title: 'Credits History', icon: 'time-outline', route: 'credits-history' },
  { id: '7', title: 'Settings', icon: 'settings-outline', route: 'settings' },
  { id: '8', title: 'FAQs', icon: 'help-circle-outline', route: 'faqs' },
  { id: '9', title: 'Privacy Policy', icon: 'shield-checkmark-outline', route: 'privacy' },
  { id: '10', title: 'Terms & Conditions', icon: 'document-text-outline', route: 'terms' },
  { id: '11', title: 'Contact Support', icon: 'chatbubble-ellipses-outline', route: 'support' },
];

export const wishlistItems = [
  {
    id: '1',
    title: 'Sunset Beach Studio',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
    seller: 'BeachVibes',
    price: 75,
  },
  {
    id: '2',
    title: 'Vintage Film Set',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=400&fit=crop',
    seller: 'RetroArt',
    price: 60,
  },
  {
    id: '3',
    title: 'Neon Glow Room',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop',
    seller: 'NeonDreams',
    price: 90,
  },
  {
    id: '4',
    title: 'Floral Garden',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop',
    seller: 'GardenArt',
    price: 55,
  },
];

export const referralHistory = [
  { id: '1', name: 'John D.', status: 'completed', credits: 50, date: '2024-01-15' },
  { id: '2', name: 'Emma S.', status: 'pending', credits: 50, date: '2024-01-12' },
  { id: '3', name: 'Mike R.', status: 'completed', credits: 50, date: '2024-01-08' },
  { id: '4', name: 'Lisa K.', status: 'expired', credits: 0, date: '2024-01-02' },
];

export const sellerListings = [
  {
    id: '1',
    title: 'Dreamy Sunset Background',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    views: 1234,
    likes: 89,
    status: 'active',
  },
  {
    id: '2',
    title: 'Professional Studio Setup',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    views: 876,
    likes: 45,
    status: 'active',
  },
  {
    id: '3',
    title: 'Tropical Beach Scene',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    views: 2100,
    likes: 156,
    status: 'active',
  },
];

export const creditsHistory = [
  { id: '1', type: 'purchase', amount: 150, description: 'Credit Package - 150 credits', date: '2024-01-15', status: 'completed' },
  { id: '2', type: 'spent', amount: -10, description: 'AI Generation - Fashion Style', date: '2024-01-14', status: 'completed' },
  { id: '3', type: 'earned', amount: 50, description: 'Referral Bonus - John D.', date: '2024-01-13', status: 'completed' },
  { id: '4', type: 'spent', amount: -10, description: 'AI Generation - Cinematic Style', date: '2024-01-12', status: 'completed' },
  { id: '5', type: 'spent', amount: -15, description: 'Premium Background Purchase', date: '2024-01-11', status: 'completed' },
  { id: '6', type: 'purchase', amount: 50, description: 'Credit Package - 50 credits', date: '2024-01-10', status: 'completed' },
];
