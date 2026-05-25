import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity,
  Dimensions, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { sellerListings } from '@/constants/MockData';

const { width } = Dimensions.get('window');

export default function SellerDashboardScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Listings', value: '12', icon: 'images', color: '#8B5CF6' },
    { label: 'Total Views', value: '4.2K', icon: 'eye', color: '#7DD3FC' },
    { label: 'Total Likes', value: '890', icon: 'heart', color: '#F472B6' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Add New Listing */}
        <TouchableOpacity style={styles.addListingBtn} onPress={() => router.push('/add-listing')}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addListingGradient}
          >
            <Ionicons name="add-circle" size={22} color="#FFF" />
            <Text style={styles.addListingText}>Add New Listing</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your listings..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Listings */}
        <Text style={styles.sectionTitle}>Your Listings</Text>
        {sellerListings.map(listing => (
          <View key={listing.id} style={styles.listingCard}>
            <Image source={{ uri: listing.image }} style={styles.listingImage} />
            <View style={styles.listingInfo}>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <View style={styles.listingStats}>
                <View style={styles.listingStat}>
                  <Ionicons name="eye-outline" size={14} color={Colors.textTertiary} />
                  <Text style={styles.listingStatText}>{listing.views}</Text>
                </View>
                <View style={styles.listingStat}>
                  <Ionicons name="heart-outline" size={14} color={Colors.textTertiary} />
                  <Text style={styles.listingStatText}>{listing.likes}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{listing.status}</Text>
              </View>
            </View>
            <View style={styles.listingActions}>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="pencil" size={16} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={16} color={Colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  content: { padding: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 18,
    padding: 14, alignItems: 'center', ...Shadows.sm,
  },
  statIcon: {
    width: 40, height: 40, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 10, color: Colors.textTertiary, marginTop: 3, textAlign: 'center' },
  addListingBtn: { borderRadius: 18, overflow: 'hidden', marginBottom: 20, ...Shadows.glow },
  addListingGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16, borderRadius: 18,
  },
  addListingText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 14, paddingHorizontal: 14,
    height: 46, borderWidth: 1, borderColor: Colors.border, marginBottom: 20, ...Shadows.sm,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14 },
  listingCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 18,
    overflow: 'hidden', marginBottom: 12, ...Shadows.sm,
  },
  listingImage: { width: 100, height: 100 },
  listingInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  listingTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  listingStats: { flexDirection: 'row', gap: 14 },
  listingStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  listingStatText: { fontSize: 12, color: Colors.textTertiary },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success },
  statusText: { fontSize: 11, fontWeight: '600', color: Colors.success, textTransform: 'capitalize' },
  listingActions: { justifyContent: 'center', gap: 8, paddingRight: 12 },
  editBtn: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#F8F7FF',
    alignItems: 'center', justifyContent: 'center',
  },
  deleteBtn: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#FEF2F2',
    alignItems: 'center', justifyContent: 'center',
  },
});
