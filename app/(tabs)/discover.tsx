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
              placeholder="Search sellers..."
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
            data={topSellers.slice(0, 3)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={item => 'followed-' + item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sellerHorizontalCard}
                activeOpacity={0.8}
                onPress={() => router.push('/seller-profile')}
              >
                <View style={styles.sellerAvatarContainer}>
                  <LinearGradient colors={Colors.gradientHero} style={styles.avatarGradient}>
                    <Image source={{ uri: item.avatar }} style={styles.sellerHorizontalAvatar} />
                  </LinearGradient>
                </View>
                <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.sellerHorizontalInfo}>{item.listings} Listings</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.9</Text>
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
            data={topSellers.slice(2, 5)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={item => 'trending-' + item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sellerHorizontalCard}
                activeOpacity={0.8}
                onPress={() => router.push('/seller-profile')}
              >
                <View style={styles.sellerAvatarContainer}>
                  <LinearGradient colors={Colors.gradientButton} style={styles.avatarGradient}>
                    <Image source={{ uri: item.avatar }} style={styles.sellerHorizontalAvatar} />
                  </LinearGradient>
                </View>
                <Text style={styles.sellerHorizontalName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.sellerHorizontalInfo}>{item.listings} Listings</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8</Text>
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

        {/* Explore All Sellers Button */}
        <TouchableOpacity style={styles.exploreAllBtn} activeOpacity={0.85} onPress={() => router.push('/view-all-sellers')}>
          <LinearGradient
            colors={Colors.gradientButton}
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
            colors={['#FFF', '#F8F7FF']}
            style={styles.promoCard}
          >
            <View style={styles.promoIconContainer}>
              <LinearGradient colors={['#8B5CF6', '#3B82F6']} style={styles.promoIconBg}>
                <Ionicons name="storefront" size={24} color="#FFF" />
              </LinearGradient>
            </View>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Become a Seller</Text>
              <Text style={styles.promoSubtitle}>Share your backgrounds and earn credits from each sale</Text>
            </View>
            <TouchableOpacity style={styles.promoBtn} activeOpacity={0.8}>
              <LinearGradient
                colors={Colors.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.promoBtnGradient}
              >
                <Text style={styles.promoBtnText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },

  // Search
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
    width: 140,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  sellerAvatarContainer: {
    marginBottom: 12,
  },
  avatarGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerHorizontalAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  sellerHorizontalName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  sellerHorizontalInfo: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // View All Card
  viewAllCard: {
    width: 140,
    backgroundColor: '#F8F7FF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  viewAllIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...Shadows.sm,
  },
  viewAllCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
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
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    ...Shadows.premiumCard,
    alignItems: 'center',
  },
  promoIconContainer: {
    marginBottom: 16,
  },
  promoIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
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

