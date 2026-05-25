import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity,
  Dimensions, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { trendingBackgrounds } from '@/constants/MockData';

const { width } = Dimensions.get('window');

export default function SellerProfileScreen() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  const listings = trendingBackgrounds;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seller Profile</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-outline" size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop' }}
            style={styles.coverImage}
          />
          <LinearGradient
            colors={['transparent', Colors.background]}
            style={styles.coverOverlay}
          />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileTop}>
            <View style={styles.avatarWrapper}>
              <LinearGradient colors={['#8B5CF6', '#EC4899']} style={styles.avatarBorder}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' }}
                  style={styles.avatar}
                />
              </LinearGradient>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Luna Zhang</Text>
              <Text style={styles.profileBio}>
                Professional AI background artist. Creating dreamy worlds one pixel at a time ✨
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: 'Listings', value: '201' },
              { label: 'Followers', value: '22.3K' },
              { label: 'Generations', value: '5.2K' },
              { label: 'Rating', value: '4.9 ⭐' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <View style={styles.followingInner}>
                  <Ionicons name="checkmark" size={16} color={Colors.primary} />
                  <Text style={styles.followingText}>Following</Text>
                </View>
              ) : (
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.followGradient}
                >
                  <Ionicons name="person-add" size={16} color="#FFF" />
                  <Text style={styles.followText}>Follow</Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn}>
              <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn}>
              <Ionicons name="share-outline" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            {['logo-instagram', 'logo-twitter', 'globe-outline'].map((icon, i) => (
              <TouchableOpacity key={i} style={styles.socialLink}>
                <Ionicons name={icon as any} size={18} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Listings */}
        <View style={styles.listingsSection}>
          <Text style={styles.listingsTitle}>Listings ({listings.length})</Text>
          <View style={styles.listingsGrid}>
            {listings.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.listingCard}
                onPress={() => router.push('/listing-detail')}
              >
                <Image source={{ uri: item.image }} style={styles.listingImage} />
                <View style={styles.listingInfo}>
                  <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.listingMeta}>
                    <View style={styles.listingPrice}>
                      <Ionicons name="diamond" size={12} color={Colors.primary} />
                      <Text style={styles.listingPriceText}>{item.price}</Text>
                    </View>
                    <View style={styles.listingLikes}>
                      <Ionicons name="heart" size={12} color="#F472B6" />
                      <Text style={styles.listingLikesText}>{item.likes}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.wishlistButton}>
                  <Ionicons name="heart-outline" size={18} color="#FFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Report */}
        <TouchableOpacity style={styles.reportBtn}>
          <Ionicons name="flag-outline" size={16} color={Colors.textTertiary} />
          <Text style={styles.reportText}>Report Seller</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center',
  },
  coverContainer: { position: 'relative', height: 180 },
  coverImage: { width: '100%', height: '100%' },
  coverOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 },
  profileSection: { paddingHorizontal: 20, marginTop: -40 },
  profileTop: { flexDirection: 'row', alignItems: 'flex-end', gap: 16, marginBottom: 16 },
  avatarWrapper: { position: 'relative' },
  avatarBorder: {
    width: 88, height: 88, borderRadius: 44, padding: 3,
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: { width: 82, height: 82, borderRadius: 41, borderWidth: 3, borderColor: '#FFF' },
  verifiedBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#FFF', borderRadius: 12,
  },
  profileInfo: { flex: 1, paddingBottom: 8 },
  profileName: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  profileBio: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 18,
    padding: 16, marginBottom: 16, ...Shadows.sm,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textTertiary, marginTop: 4 },
  actionButtons: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  followButton: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  followingButton: { borderWidth: 1.5, borderColor: Colors.primary + '40', borderRadius: 16 },
  followGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 16,
  },
  followText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  followingInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
  },
  followingText: { fontSize: 15, fontWeight: '600', color: Colors.primary },
  messageBtn: {
    width: 48, height: 48, borderRadius: 16, backgroundColor: '#F8F7FF',
    alignItems: 'center', justifyContent: 'center',
  },
  socialLinks: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  socialLink: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: '#F8F7FF',
    alignItems: 'center', justifyContent: 'center',
  },
  listingsSection: { paddingHorizontal: 20, marginTop: 8 },
  listingsTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  listingsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  listingCard: {
    width: (width - 52) / 2, borderRadius: 18, overflow: 'hidden',
    backgroundColor: '#FFF', ...Shadows.sm,
  },
  listingImage: { width: '100%', height: 160 },
  listingInfo: { padding: 12 },
  listingTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 6 },
  listingMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  listingPrice: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  listingPriceText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  listingLikes: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  listingLikesText: { fontSize: 11, color: Colors.textTertiary },
  wishlistButton: {
    position: 'absolute', top: 10, right: 10, width: 32, height: 32,
    borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  reportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: 28, marginHorizontal: 20, paddingVertical: 14,
    borderRadius: 14, backgroundColor: '#FFF', borderWidth: 1, borderColor: Colors.border,
  },
  reportText: { fontSize: 13, color: Colors.textTertiary },
});
