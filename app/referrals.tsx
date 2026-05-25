import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { referralHistory } from '@/constants/MockData';

export default function ReferralsScreen() {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Join BgCraft AI and get 50 free credits! Use my code: SARAH50 🎨✨ Download now: https://bgcraft.ai/ref/SARAH50',
      });
    } catch (e) {}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return Colors.success;
      case 'pending': return Colors.warning;
      case 'expired': return Colors.textTertiary;
      default: return Colors.textTertiary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Referrals</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899', '#FB923C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceGradient}
          >
            <Text style={styles.balanceLabel}>Referral Earnings</Text>
            <Text style={styles.balanceValue}>150 Credits</Text>
            <Text style={styles.balanceSub}>from 3 successful referrals</Text>
          </LinearGradient>
        </View>

        {/* Referral Code */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Your Referral Code</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>SARAH50</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Ionicons name="copy-outline" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shareGradient}
            >
              <Ionicons name="share-outline" size={18} color="#FFF" />
              <Text style={styles.shareText}>Share Referral Link</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* How it Works */}
        <View style={styles.howSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          {[
            { step: '1', title: 'Share your code', desc: 'Send your unique code to friends', icon: 'share' },
            { step: '2', title: 'Friend signs up', desc: 'They create an account with your code', icon: 'person-add' },
            { step: '3', title: 'Both earn credits', desc: 'You both get 50 free credits!', icon: 'gift' },
          ].map((item, i) => (
            <View key={i} style={styles.howItem}>
              <LinearGradient
                colors={['#F8F7FF', '#FFF5F7']}
                style={styles.howIcon}
              >
                <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
              </LinearGradient>
              <View style={styles.howText}>
                <Text style={styles.howTitle}>{item.title}</Text>
                <Text style={styles.howDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Referral History</Text>
          {referralHistory.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={styles.historyAvatar}>
                  <Text style={styles.historyInitial}>{item.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.historyName}>{item.name}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
              </View>
              <View style={styles.historyRight}>
                <Text style={[styles.historyCredits, { color: item.credits > 0 ? Colors.success : Colors.textTertiary }]}>
                  {item.credits > 0 ? `+${item.credits}` : '0'}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
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
  balanceCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 20, ...Shadows.glow },
  balanceGradient: { padding: 28, borderRadius: 24, alignItems: 'center' },
  balanceLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  balanceValue: { fontSize: 36, fontWeight: '800', color: '#FFF', marginBottom: 6 },
  balanceSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  codeCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, ...Shadows.sm, marginBottom: 24 },
  codeLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12 },
  codeBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F8F7FF', borderRadius: 14, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#EDE9FE', borderStyle: 'dashed',
  },
  codeText: { fontSize: 20, fontWeight: '800', color: Colors.primary, letterSpacing: 2 },
  copyBtn: { padding: 8 },
  shareBtn: { borderRadius: 16, overflow: 'hidden' },
  shareGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, borderRadius: 16,
  },
  shareText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  howSection: { marginBottom: 28 },
  howItem: {
    flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16,
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, ...Shadows.sm,
  },
  howIcon: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  howText: { flex: 1 },
  howTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  howDesc: { fontSize: 13, color: Colors.textTertiary },
  historySection: {},
  historyItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 10, ...Shadows.sm,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyAvatar: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F7FF',
    alignItems: 'center', justifyContent: 'center',
  },
  historyInitial: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  historyName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  historyDate: { fontSize: 12, color: Colors.textTertiary, marginTop: 2 },
  historyRight: { alignItems: 'flex-end', gap: 6 },
  historyCredits: { fontSize: 15, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
});
