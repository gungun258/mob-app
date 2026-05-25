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
import { topSellers } from '@/constants/MockData';

const { width } = Dimensions.get('window');

const filterOptions = ['All', 'Verified', 'Most Popular', 'Newest', 'Top Rated'];

export default function ViewAllSellersScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allSellers = [...topSellers, ...topSellers.map(s => ({ ...s, id: s.id + '10' }))];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Sellers</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={Colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sellers..."
          placeholderTextColor={Colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filterOptions.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, selectedFilter === f && styles.filterChipActive]}
            onPress={() => setSelectedFilter(f)}
          >
            {selectedFilter === f ? (
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.filterChipGradient}
              >
                <Text style={styles.filterTextActive}>{f}</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.filterText}>{f}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sellers List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sellersContent}>
        {allSellers.map((seller, index) => (
          <TouchableOpacity
            key={seller.id + index}
            style={styles.sellerCard}
            onPress={() => router.push('/seller-profile')}
          >
            <View style={styles.sellerLeft}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: seller.avatar }} style={styles.avatar} />
                {seller.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                  </View>
                )}
              </View>
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>{seller.name}</Text>
                <Text style={styles.sellerMeta}>{seller.followers} followers · {seller.listings} listings</Text>
                <View style={styles.previewImages}>
                  {[1, 2, 3].map(i => (
                    <View key={i} style={styles.previewDot} />
                  ))}
                  <Text style={styles.previewMore}>+{seller.listings - 3}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followBtnText}>Follow</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 16,
    paddingHorizontal: 16, height: 48, borderWidth: 1,
    borderColor: Colors.border, ...Shadows.sm, marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  filtersContainer: { paddingHorizontal: 20, gap: 8, marginBottom: 16, height: 42 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#F8F9FA', justifyContent: 'center',
  },
  filterChipActive: { padding: 0, borderRadius: 12, overflow: 'hidden' },
  filterChipGradient: { paddingHorizontal: 16, paddingVertical: 10 },
  filterText: { fontSize: 13, fontWeight: '500', color: Colors.textSecondary },
  filterTextActive: { fontSize: 13, fontWeight: '600', color: '#FFF' },
  sellersContent: { paddingHorizontal: 20 },
  sellerCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 18, padding: 16,
    marginBottom: 12, ...Shadows.sm,
  },
  sellerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  verifiedBadge: { position: 'absolute', bottom: -2, right: -2, backgroundColor: '#FFF', borderRadius: 8 },
  sellerInfo: { flex: 1 },
  sellerName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  sellerMeta: { fontSize: 12, color: Colors.textTertiary, marginBottom: 6 },
  previewImages: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  previewDot: { width: 20, height: 20, borderRadius: 4, backgroundColor: '#F1F0FB' },
  previewMore: { fontSize: 10, color: Colors.textTertiary, marginLeft: 4 },
  followBtn: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  followBtnText: { fontSize: 13, fontWeight: '600', color: '#FFF' },
});
