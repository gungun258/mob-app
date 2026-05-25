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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search sellers, backgrounds..."
              placeholderTextColor={Colors.textTertiary}
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

        {/* Followed By You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Followed By You</Text>
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
                  colors={index % 2 === 0 ? ['#C079FF', '#FF4B8B'] : ['#8F6EFF', '#F542A7']}
                  style={styles.sellerSquareAvatar}
                >
                  <Text style={styles.sellerSquareAvatarText}>{item.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.sellerHorizontalInfoBox}>
                  <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.sellerHorizontalInfo}>{item.listings} listings</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={10} color="#F59E0B" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={styles.viewAllCard} activeOpacity={0.8} onPress={() => router.push('/view-all-sellers')}>
                <View style={styles.viewAllIconContainer}>
                  <Ionicons name="arrow-forward" size={24} color={Colors.primary} />
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
          </View>
          <FlatList
            horizontal
            data={topSellers.slice(2, 6)}
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
                  colors={index % 2 === 0 ? ['#38BDF8', '#0284C7'] : ['#2DD4BF', '#0F766E']}
                  style={styles.sellerSquareAvatar}
                >
                  <Text style={styles.sellerSquareAvatarText}>{item.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.sellerHorizontalInfoBox}>
                  <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.sellerHorizontalInfo}>{item.listings} listings</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={10} color="#F59E0B" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={styles.viewAllCard} activeOpacity={0.8} onPress={() => router.push('/view-all-sellers')}>
                <View style={styles.viewAllIconContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#C079FF" />
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
    paddingBottom: 120,
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },

  // Search
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
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
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Horizontal Seller Cards
  sellerHorizontalCard: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    alignItems: 'flex-start',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  sellerSquareAvatar: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sellerSquareAvatarText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
  },
  sellerHorizontalInfoBox: {
    width: '100%',
    alignItems: 'flex-start',
  },
  sellerHorizontalName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  sellerHorizontalInfo: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // View All Card
  viewAllCard: {
    width: 140,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#C079FF',
  },
  viewAllIconContainer: {
    marginBottom: 8,
  },
  viewAllCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C079FF',
  },

  // Explore All Button
  exploreAllBtn: {
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadows.premiumButton,
  },
  exploreAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 20,
  },
  exploreAllText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  // Promo Card
  promoCardContainer: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  promoCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    ...Shadows.premiumCard,
    alignItems: 'flex-start',
  },
  promoTextContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
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

