import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { wishlistItems } from '@/constants/MockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

export default function WishlistScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{wishlistItems.length} saved items</Text>

        <View style={styles.grid}>
          {wishlistItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.push('/listing-detail')}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <TouchableOpacity style={styles.heartBtn}>
                <Ionicons name="heart" size={18} color="#F472B6" />
              </TouchableOpacity>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardSeller}>{item.seller}</Text>
                <View style={styles.cardPrice}>
                  <Ionicons name="diamond" size={12} color={Colors.primary} />
                  <Text style={styles.cardPriceText}>{item.price} credits</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  subtitle: { fontSize: 14, color: Colors.textTertiary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: CARD_WIDTH, borderRadius: 18, overflow: 'hidden',
    backgroundColor: '#FFF', ...Shadows.sm,
  },
  cardImage: { width: '100%', height: CARD_WIDTH },
  heartBtn: {
    position: 'absolute', top: 10, right: 10, width: 32, height: 32,
    borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { padding: 12 },
  cardTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  cardSeller: { fontSize: 12, color: Colors.textTertiary, marginBottom: 6 },
  cardPrice: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardPriceText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
