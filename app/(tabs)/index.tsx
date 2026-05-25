import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { Colors, BorderRadius, Shadows, Spacing, Typography } from '@/constants/Colors';
import {
  trendingBackgrounds,
  topSellers,
  followingListings,
  publicGenerations,
} from '@/constants/MockData';

const { width } = Dimensions.get('window');

const GradientText = ({ text, style }: { text: string; style: any }) => {
  if (Platform.OS === 'web') {
    return (
      <Text
        style={[
          style,
          {
            backgroundImage: 'linear-gradient(90deg, #5B8CFF, #9B5CFF, #F542A7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block',
          } as any,
        ]}
      >
        {text}
      </Text>
    );
  }

  return (
    <MaskedView
      style={{ flexDirection: 'row', height: 34 }}
      maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}
    >
      <LinearGradient
        colors={['#5B8CFF', '#9B5CFF', '#F542A7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [followedSellers, setFollowedSellers] = useState<string[]>(['1', '3', '5']);

  const toggleFollow = (id: string) => {
    setFollowedSellers(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, Platform.OS === 'web' && ({ backdropFilter: 'blur(12px)' } as any)]}>
        <View style={styles.headerLeft}>
          <View>
            <GradientText text="AI Photo Studio" style={styles.appNameText} />
            <Text style={styles.tagline}>Transform your moments</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notifBtn}>
            <Feather name="bell" size={28} color={Colors.textPrimary} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.creditsChip}>
            <MaterialCommunityIcons name="circle-multiple-outline" size={18} color="#FFF" />
            <Text style={styles.creditsText}>250</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Hero Card */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
          <LinearGradient
            colors={['#4F7DFF', '#955BFF', '#FF2E93']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Create AI Magic</Text>
              <Text style={styles.heroSubtitle}>
                Upload your photos and let AI do the rest
              </Text>
              <TouchableOpacity style={styles.heroCta} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#C079FF', '#8F6EFF', '#5E63FF']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.heroCtaGradient}
                >
                  <Ionicons name="sparkles" size={16} color="#FFF" />
                  <Text style={styles.heroCtaText}>Generate AI Image</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Trending Backgrounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="trending-up" size={20} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Trending Backgrounds</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {trendingBackgrounds.slice(0, 4).map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.8}>
                <View style={styles.trendingImageContainer}>
                  <LinearGradient
                    colors={index % 2 === 0 ? ['#7DD3FC', '#A5B4FC'] : ['#A5B4FC', '#93C5FD']}
                    style={styles.trendingImagePlaceholder}
                  />
                  <View style={styles.trendingRating}>
                    <Ionicons name="star" size={10} color="#F59E0B" />
                    <Text style={styles.trendingRatingText}>4.8</Text>
                  </View>
                </View>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.trendingStatsRow}>
                    <Text style={styles.trendingPrice}>${item.price}</Text>
                    <Text style={styles.trendingSales}>{Math.floor(Math.random() * 150) + 50} sales</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Sellers</Text>
            <TouchableOpacity onPress={() => router.push('/view-all-sellers')}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topSellersList}>
            {topSellers.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.sellerRow}
                activeOpacity={0.8}
                onPress={() => router.push('/seller-profile')}
              >
                <View style={styles.sellerRowLeft}>
                  <View style={[styles.sellerSquareAvatar, { backgroundColor: index % 2 === 0 ? '#8B5CF6' : '#6366F1' }]}>
                    <Text style={styles.sellerSquareAvatarText}>{item.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.sellerRowInfo}>
                    <Text style={styles.sellerRowName}>{item.name}</Text>
                    <View style={styles.sellerRowStats}>
                      <Text style={styles.sellerRowListings}>{item.listings} listings</Text>
                      <Ionicons name="star" size={12} color="#F59E0B" style={{ marginLeft: 6, marginRight: 2 }} />
                      <Text style={styles.sellerRowRating}>4.8</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.sellerRowFollowBtn,
                    followedSellers.includes(item.id) ? styles.sellerRowFollowingBtn : null,
                  ]}
                  onPress={() => toggleFollow(item.id)}
                >
                  <Text
                    style={[
                      styles.sellerRowFollowBtnText,
                      followedSellers.includes(item.id) ? styles.sellerRowFollowingBtnText : null,
                    ]}
                  >
                    {followedSellers.includes(item.id) ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Listings From Following */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>From Sellers You Follow</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {followingListings.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.followingSimpleCard}
                activeOpacity={0.8}
                onPress={() => router.push('/listing-detail')}
              >
                <View style={styles.followingSimpleImageContainer}>
                  <LinearGradient
                    colors={index % 2 === 0 ? ['#6EE7B7', '#34D399'] : ['#FCA5A5', '#F87171']}
                    style={styles.followingSimpleGradient}
                  />
                </View>
                <View style={styles.followingSimpleInfo}>
                  <Text style={styles.followingSimpleSellerName}>{item.seller}</Text>
                  <Text style={styles.followingSimpleTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.followingSimplePrice}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Public Generations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Public Generations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {publicGenerations.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.publicGenCard}
                activeOpacity={0.8}
                onPress={() => router.push('/listing-detail')}
              >
                <View style={styles.publicGenImageContainer}>
                  <LinearGradient
                    colors={index % 2 === 0 ? ['#FCA5A5', '#F87171'] : ['#F9A8D4', '#F472B6']}
                    style={styles.publicGenGradient}
                  />
                </View>
                <View style={styles.publicGenInfo}>
                  <View style={styles.publicGenUserRow}>
                    <Ionicons name="person-outline" size={12} color="#6B7280" />
                    <Text style={styles.publicGenUserName}>{item.user}</Text>
                  </View>
                  <View style={styles.publicGenLikes}>
                    <Ionicons name="heart" size={12} color="#EF4444" />
                    <Text style={styles.publicGenLikesText}>{item.likes}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Refer & Earn Banner */}
        <TouchableOpacity style={styles.referralBannerSimple} activeOpacity={0.9}>
          <Text style={styles.referralTitleSimple}>Refer & Earn</Text>
          <Text style={styles.referralSubtitleSimple}>
            Get 50 free credits for every friend who joins
          </Text>
          <View style={styles.referralBtnSimple}>
            <Text style={styles.referralBtnSimpleText}>Start Referring</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: 110, // Increased to fully clear the 90px tall floating header
    paddingBottom: 20,
  },
  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1, // Let it shrink and prevent pushing right side off screen
  },
  appNameText: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.2,
    backgroundColor: 'transparent',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
  },
  tagline: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4B5563',
    marginTop: 2,
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Increase spacing between bell and credits
  },
  creditsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FF9F0A', // matching exact orange-yellow
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8, // reduced border radius as requested
    shadowColor: '#FF9F0A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  creditsText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
  notifBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF2E93',
  },

  heroCard: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: 'rgba(170, 80, 255, 1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  heroGradient: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 24,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  heroCta: {
    width: '100%',
    borderRadius: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  heroCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: 'transparent',
  },
  heroCtaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Sections
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6', // Blue from Figma View All
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    columnGap: 8,
    rowGap: 24,
    alignItems: 'flex-start',
  },

  // Trending Cards
  trendingCard: {
    width: '49%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  trendingImageContainer: {
    width: '100%',
    aspectRatio: 1.68,
  },
  trendingImagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
  },
  trendingRating: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  trendingInfo: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  trendingStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  trendingSales: {
    fontSize: 13,
    color: '#8E8E93',
  },

  // Top Sellers Cards
  topSellersList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sellerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerSquareAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerSquareAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  sellerRowInfo: {
    marginLeft: 12,
  },
  sellerRowName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  sellerRowStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRowListings: {
    fontSize: 13,
    color: '#6B7280',
  },
  sellerRowRating: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
  },
  sellerRowFollowBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
  },
  sellerRowFollowingBtn: {
    backgroundColor: '#F3F4F6',
  },
  sellerRowFollowBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  sellerRowFollowingBtnText: {
    color: '#4B5563',
  },

  horizontalList: {
    paddingHorizontal: 24,
    gap: 12, // small gap between cards
  },
  
  // Following Simple Cards
  followingSimpleCard: {
    width: '49%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    ...Shadows.md,
  },
  followingSimpleImageContainer: {
    width: '100%',
    aspectRatio: 1.68,
  },
  followingSimpleGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  followingSimpleInfo: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  followingSimpleSellerName: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  followingSimpleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  followingSimplePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },

  // Referral Banner
  referralBannerSimple: {
    marginHorizontal: 20,
    marginTop: 28,
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#F5F8FF',
    borderWidth: 1,
    borderColor: '#D8E2FF',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  referralTitleSimple: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  referralSubtitleSimple: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 20,
  },
  referralBtnSimple: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    alignItems: 'center',
  },
  referralBtnSimpleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },

  // Public Generations Cards
  publicGenCard: {
    width: '49%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    ...Shadows.md,
  },
  publicGenImageContainer: {
    width: '100%',
    aspectRatio: 1.68,
  },
  publicGenGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  publicGenInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  publicGenUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  publicGenUserName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  publicGenLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  publicGenLikesText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
});
