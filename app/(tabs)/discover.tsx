import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/Colors';
import {
  topSellers,
} from '@/constants/MockData';

const { width } = Dimensions.get('window');

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.fixedHeader, Platform.OS === 'web' && ({ backdropFilter: 'blur(12px)' } as any)]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search sellers, backgrounds..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Followed By You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Followed by You</Text>
            <TouchableOpacity onPress={() => router.push('/view-all-sellers')}>
              <Text style={styles.sectionViewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={topSellers.slice(0, 4)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={item => 'followed-' + item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.sellerHorizontalCard}
                activeOpacity={0.8}
                onPress={() => router.push('/seller-profile')}
              >
                <LinearGradient
                  colors={['#C084FC', '#EC4899']}
                  style={styles.sellerSquareAvatar}
                >
                  <Text style={styles.sellerSquareAvatarText}>{item.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.sellerHorizontalInfoBox}>
                  <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.sellerHorizontalInfo}>{item.listings} listings</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ratingText}>{item.rating || '4.9'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={styles.viewAllCard} activeOpacity={0.8} onPress={() => router.push('/view-all-sellers')}>
                <View style={styles.viewAllIconContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#A855F7" />
                </View>
                <Text style={styles.viewAllCardText}>View All</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Top Trending Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Trending Sellers</Text>
            <TouchableOpacity onPress={() => router.push('/view-all-sellers')}>
              <Text style={styles.sectionViewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={topSellers.slice(4, 8)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={item => 'trending-' + item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.sellerHorizontalCard}
                activeOpacity={0.8}
                onPress={() => router.push('/seller-profile')}
              >
                <LinearGradient
                  colors={['#3B82F6', '#06B6D4']}
                  style={styles.sellerSquareAvatar}
                >
                  <Text style={styles.sellerSquareAvatarText}>{item.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.sellerHorizontalInfoBox}>
                  <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.sellerHorizontalInfo}>{item.listings} listings</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ratingText}>{item.rating || '4.8'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={styles.viewAllCard} activeOpacity={0.8} onPress={() => router.push('/view-all-sellers')}>
                <View style={styles.viewAllIconContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#A855F7" />
                </View>
                <Text style={styles.viewAllCardText}>View All</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Explore All Sellers Button */}
        <TouchableOpacity style={styles.exploreAllBtn} activeOpacity={0.85} onPress={() => router.push('/view-all-sellers')}>
          <LinearGradient
            colors={['#F542A7', '#FF2E93']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploreAllGradient}
          >
            <Text style={styles.exploreAllText}>Explore All Sellers</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Become a Seller Card */}
        <View style={styles.promoCardContainer}>
          <LinearGradient
            colors={['#F5F8FF', '#F0F5FF']}
            style={styles.promoCard}
          >
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Become a Seller</Text>
              <Text style={styles.promoSubtitle}>Share your backgrounds and earn credits from each sale</Text>
            </View>
            <TouchableOpacity style={styles.promoBtn} activeOpacity={0.8}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.promoBtnGradient}
              >
                <Text style={styles.promoBtnText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    ...(Platform.OS === 'web' ? { height: '100dvh', overflow: 'hidden' } : {}),
  },
  scrollContent: {
    paddingTop: 140,
    paddingBottom: 120,
    flexGrow: 1,
  },
  fixedHeader: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  // Search
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    gap: 12,
    borderWidth: 1,
    borderColor: '#0000001a',
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#334155',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sectionViewAllText: {
    fontSize: 16,
    color: '#A855F7',
    fontWeight: '500',
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },

  // Horizontal Seller Cards
  sellerHorizontalCard: {
    width: 160,
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sellerSquareAvatar: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sellerSquareAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  sellerHorizontalInfoBox: {
    width: '100%',
    alignItems: 'flex-start',
  },
  sellerHorizontalName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  sellerHorizontalInfo: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12, // gap before the rating
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center', // centers the rating row inside the card
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // View All Card
  viewAllCard: {
    width: 160,
    height: 110,
    backgroundColor: 'transparent', 
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D8B4FE',
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  viewAllIconContainer: {
    marginBottom: 4,
  },
  viewAllCardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#A855F7',
  },

  // Explore All Button
  exploreAllBtn: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 12,
    overflow: 'hidden',
    ...Shadows.premiumButton,
  },
  exploreAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14, // adjusted to roughly 48px height
    borderRadius: 12,
  },
  exploreAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },

  // Promo Card
  promoCardContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  promoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    ...Shadows.premiumCard,
    alignItems: 'flex-start',
  },
  promoTextContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'left',
    lineHeight: 20,
  },
  promoBtn: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  promoBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  promoBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});

