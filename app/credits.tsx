import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { creditPackages, creditsHistory } from '@/constants/MockData';

export default function CreditsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'buy' | 'history'>('buy');

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case 'purchase': return { icon: 'add-circle', color: Colors.success };
      case 'spent': return { icon: 'remove-circle', color: Colors.error };
      case 'earned': return { icon: 'gift', color: Colors.primary };
      default: return { icon: 'ellipse', color: Colors.textTertiary };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credits</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceGradient}
          >
            <View style={styles.balanceIcon}>
              <Ionicons name="diamond" size={28} color="#FFF" />
            </View>
            <Text style={styles.balanceLabel}>Available Credits</Text>
            <Text style={styles.balanceValue}>250</Text>
            <Text style={styles.balanceSub}>≈ 25 AI generations</Text>
          </LinearGradient>
        </View>

        {/* How Credits Work */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={18} color={Colors.primary} />
          <Text style={styles.infoText}>
            Each AI generation costs 10 credits. Premium backgrounds may cost additional credits.
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'buy' && styles.tabActive]}
            onPress={() => setTab('buy')}
          >
            <Text style={[styles.tabText, tab === 'buy' && styles.tabTextActive]}>Buy Credits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'history' && styles.tabActive]}
            onPress={() => setTab('history')}
          >
            <Text style={[styles.tabText, tab === 'history' && styles.tabTextActive]}>History</Text>
          </TouchableOpacity>
        </View>

        {tab === 'buy' ? (
          <View style={styles.packagesContainer}>
            {creditPackages.map(pkg => (
              <TouchableOpacity key={pkg.id} style={[styles.packageCard, pkg.popular && styles.packageCardPopular]}>
                {pkg.popular && (
                  <LinearGradient
                    colors={['#8B5CF6', '#EC4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.popularBadge}
                  >
                    <Text style={styles.popularText}>Most Popular</Text>
                  </LinearGradient>
                )}
                <View style={styles.packageLeft}>
                  <View style={[styles.packageIcon, { backgroundColor: pkg.color + '15' }]}>
                    <Ionicons name="diamond" size={22} color={pkg.color} />
                  </View>
                  <View>
                    <Text style={styles.packageCredits}>{pkg.credits} Credits</Text>
                    {pkg.savings ? (
                      <Text style={styles.packageSavings}>{pkg.savings}</Text>
                    ) : null}
                  </View>
                </View>
                <TouchableOpacity style={[styles.buyBtn, pkg.popular && styles.buyBtnPopular]}>
                  {pkg.popular ? (
                    <LinearGradient
                      colors={['#8B5CF6', '#EC4899']}
                      style={styles.buyBtnGradient}
                    >
                      <Text style={styles.buyBtnTextWhite}>{pkg.price}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.buyBtnText}>{pkg.price}</Text>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.historyContainer}>
            {creditsHistory.map(item => {
              const { icon, color } = getHistoryIcon(item.type);
              return (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.historyLeft}>
                    <View style={[styles.historyIcon, { backgroundColor: color + '15' }]}>
                      <Ionicons name={icon as any} size={18} color={color} />
                    </View>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyDesc}>{item.description}</Text>
                      <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                  </View>
                  <Text style={[styles.historyAmount, { color: item.amount > 0 ? Colors.success : Colors.error }]}>
                    {item.amount > 0 ? '+' : ''}{item.amount}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
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
  balanceCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 16, ...Shadows.glow },
  balanceGradient: { padding: 28, borderRadius: 24, alignItems: 'center' },
  balanceIcon: { marginBottom: 12, opacity: 0.9 },
  balanceLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 6 },
  balanceValue: { fontSize: 48, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  balanceSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  infoCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#F8F7FF', borderRadius: 14, padding: 14, marginBottom: 20,
    borderWidth: 1, borderColor: '#EDE9FE',
  },
  infoText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  tabs: {
    flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: 14,
    padding: 4, marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  tabActive: { backgroundColor: '#FFF', ...Shadows.sm },
  tabText: { fontSize: 14, fontWeight: '500', color: Colors.textTertiary },
  tabTextActive: { fontWeight: '700', color: Colors.textPrimary },
  packagesContainer: { gap: 12 },
  packageCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 18, padding: 18, ...Shadows.sm,
    position: 'relative', overflow: 'hidden',
  },
  packageCardPopular: { borderWidth: 2, borderColor: Colors.primary + '40' },
  popularBadge: {
    position: 'absolute', top: 0, right: 0,
    paddingHorizontal: 12, paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  popularText: { fontSize: 10, fontWeight: '700', color: '#FFF' },
  packageLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  packageIcon: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  packageCredits: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  packageSavings: { fontSize: 12, fontWeight: '600', color: Colors.success, marginTop: 2 },
  buyBtn: {
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14,
    backgroundColor: '#F8F7FF',
  },
  buyBtnPopular: { padding: 0, overflow: 'hidden' },
  buyBtnGradient: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14 },
  buyBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  buyBtnTextWhite: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  historyContainer: { gap: 10 },
  historyItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, ...Shadows.sm,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  historyIcon: {
    width: 40, height: 40, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  historyInfo: { flex: 1 },
  historyDesc: { fontSize: 13, fontWeight: '500', color: Colors.textPrimary, marginBottom: 3 },
  historyDate: { fontSize: 11, color: Colors.textTertiary },
  historyAmount: { fontSize: 16, fontWeight: '700' },
});
