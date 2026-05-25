import React, { useState, useRef } from 'react';
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

const carouselImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
];

export default function ListingDetailScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => setIsWishlisted(!isWishlisted)}
            >
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={20}
                color={isWishlisted ? '#F472B6' : Colors.textPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="share-outline" size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Carousel */}
        <View style={styles.carousel}>
          <FlatList
            horizontal
            pagingEnabled
            data={carouselImages}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveSlide(index);
            }}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.carouselImage} />
            )}
          />
          <View style={styles.pagination}>
            {carouselImages.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeSlide === i && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Listing Info */}
        <View style={styles.infoSection}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>🌿 Nature</Text>
          </View>
          <Text style={styles.listingTitle}>Ethereal Mountain Sunset Background</Text>
          <View style={styles.priceRow}>
            <View style={styles.price}>
              <Ionicons name="diamond" size={18} color={Colors.primary} />
              <Text style={styles.priceText}>50 credits</Text>
            </View>
            <View style={styles.likes}>
              <Ionicons name="heart" size={16} color="#F472B6" />
              <Text style={styles.likesText}>2,340 likes</Text>
            </View>
          </View>

          <Text style={styles.description}>
            A stunning ethereal mountain sunset background perfect for portraits, fashion shoots,
            and creative projects. This AI-optimized background creates seamless blending with
            your subject.
          </Text>
        </View>

        {/* Seller Info */}
        <TouchableOpacity
          style={styles.sellerCard}
          onPress={() => router.push('/seller-profile')}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' }}
            style={styles.sellerAvatar}
          />
          <View style={styles.sellerInfo}>
            <View style={styles.sellerNameRow}>
              <Text style={styles.sellerName}>Luna Zhang</Text>
              <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
            </View>
            <Text style={styles.sellerMeta}>22.3K followers · 201 listings</Text>
          </View>
          <TouchableOpacity style={styles.visitBtn}>
            <Text style={styles.visitBtnText}>Visit</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.tryAiBtn}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tryAiGradient}
            >
              <Ionicons name="sparkles" size={18} color="#FFF" />
              <Text style={styles.tryAiText}>Try With AI</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
            <Text style={styles.contactBtnText}>Contact Seller</Text>
          </TouchableOpacity>
        </View>

        {/* More from Seller */}
        <View style={styles.moreSection}>
          <Text style={styles.moreTitle}>More from Luna Zhang</Text>
          <FlatList
            horizontal
            data={trendingBackgrounds.slice(0, 4)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.moreCard}>
                <Image source={{ uri: item.image }} style={styles.moreImage} />
                <View style={styles.moreInfo}>
                  <Text style={styles.moreCardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.morePrice}>{item.price} credits</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Report */}
        <TouchableOpacity style={styles.reportBtn}>
          <Ionicons name="flag-outline" size={14} color={Colors.textTertiary} />
          <Text style={styles.reportText}>Report this listing</Text>
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
  headerActions: { flexDirection: 'row', gap: 8 },
  headerBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center',
  },
  carousel: { position: 'relative' },
  carouselImage: { width, height: 340, resizeMode: 'cover' },
  pagination: {
    flexDirection: 'row', position: 'absolute', bottom: 16,
    alignSelf: 'center', gap: 6,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: { width: 24, backgroundColor: '#FFF' },
  infoSection: { paddingHorizontal: 20, paddingTop: 24 },
  categoryBadge: {
    alignSelf: 'flex-start', backgroundColor: '#F0FDF4',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginBottom: 12,
  },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#166534' },
  listingTitle: {
    fontSize: 24, fontWeight: '800', color: Colors.textPrimary,
    lineHeight: 30, marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  price: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  priceText: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likesText: { fontSize: 14, color: Colors.textTertiary },
  description: {
    fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 20,
  },
  sellerCard: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 20,
    backgroundColor: '#FFF', borderRadius: 18, padding: 14, ...Shadows.sm,
    marginBottom: 20,
  },
  sellerAvatar: { width: 48, height: 48, borderRadius: 24 },
  sellerInfo: { flex: 1, marginLeft: 12 },
  sellerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sellerName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  sellerMeta: { fontSize: 12, color: Colors.textTertiary, marginTop: 3 },
  visitBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12,
    backgroundColor: '#F8F7FF',
  },
  visitBtnText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  actionButtons: { paddingHorizontal: 20, gap: 12, marginBottom: 28 },
  tryAiBtn: { borderRadius: 18, overflow: 'hidden', ...Shadows.glow },
  tryAiGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16, borderRadius: 18,
  },
  tryAiText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  contactBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16, borderRadius: 18,
    backgroundColor: '#FFF', borderWidth: 1.5, borderColor: Colors.primary + '40',
  },
  contactBtnText: { fontSize: 16, fontWeight: '600', color: Colors.primary },
  moreSection: { marginBottom: 20 },
  moreTitle: {
    fontSize: 18, fontWeight: '700', color: Colors.textPrimary,
    paddingHorizontal: 20, marginBottom: 14,
  },
  moreCard: {
    width: 150, borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#FFF', ...Shadows.sm,
  },
  moreImage: { width: '100%', height: 120 },
  moreInfo: { padding: 10 },
  moreCardTitle: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  morePrice: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  reportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginHorizontal: 20, paddingVertical: 12,
  },
  reportText: { fontSize: 13, color: Colors.textTertiary },
});
