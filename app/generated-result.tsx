import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity,
  Dimensions, Animated, PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function GeneratedResultScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0.5);

  const beforeImage = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop';
  const afterImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Generation Result</Text>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Ionicons name="ellipsis-horizontal" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {showMenu && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="refresh" size={16} color={Colors.textPrimary} />
              <Text style={styles.dropdownText}>Retry Generation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="return-down-back" size={16} color={Colors.textPrimary} />
              <Text style={styles.dropdownText}>Request Refund</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="chatbubble-outline" size={16} color={Colors.textPrimary} />
              <Text style={styles.dropdownText}>Contact Seller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="flag-outline" size={16} color={Colors.error} />
              <Text style={[styles.dropdownText, { color: Colors.error }]}>Report Issue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Generated Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: afterImage }}
            style={styles.mainImage}
          />
          <View style={styles.aiLabel}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.aiLabelGradient}
            >
              <Ionicons name="sparkles" size={12} color="#FFF" />
              <Text style={styles.aiLabelText}>AI Generated</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Before/After Compare */}
        <View style={styles.compareSection}>
          <Text style={styles.sectionTitle}>Before vs After</Text>
          <View style={styles.compareContainer}>
            <Image source={{ uri: beforeImage }} style={styles.compareImage} />
            <View style={[styles.compareOverlay, { width: `${sliderPosition * 100}%` }]}>
              <Image
                source={{ uri: afterImage }}
                style={[styles.compareImage, { width: width - 40 }]}
              />
            </View>
            <View style={[styles.sliderLine, { left: `${sliderPosition * 100}%` }]}>
              <View style={styles.sliderHandle}>
                <Ionicons name="swap-horizontal" size={16} color="#FFF" />
              </View>
            </View>
            <View style={styles.compareLabels}>
              <View style={styles.compareLabel}>
                <Text style={styles.compareLabelText}>Before</Text>
              </View>
              <View style={[styles.compareLabel, { backgroundColor: 'rgba(139,92,246,0.8)' }]}>
                <Text style={styles.compareLabelText}>After</Text>
              </View>
            </View>

            {/* Touch areas for slider */}
            <View style={styles.touchArea}>
              {[0.2, 0.35, 0.5, 0.65, 0.8].map(pos => (
                <TouchableOpacity
                  key={pos}
                  style={styles.touchSection}
                  onPress={() => setSliderPosition(pos)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Style Used */}
        <View style={styles.styleSection}>
          <View style={styles.styleCard}>
            <LinearGradient
              colors={['#EC4899', '#F472B6']}
              style={styles.styleIcon}
            >
              <Text style={{ fontSize: 20 }}>👗</Text>
            </LinearGradient>
            <View>
              <Text style={styles.styleLabel}>AI Style Used</Text>
              <Text style={styles.styleName}>Fashion</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.downloadBtn}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.downloadGradient}
            >
              <Ionicons name="download" size={20} color="#FFF" />
              <Text style={styles.downloadText}>Download HD</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="refresh" size={20} color={Colors.primary} />
              <Text style={styles.secondaryText}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryBtn, isSaved && styles.savedBtn]}
              onPress={() => setIsSaved(!isSaved)}
            >
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={20}
                color={isSaved ? '#F472B6' : Colors.primary}
              />
              <Text style={styles.secondaryText}>{isSaved ? 'Saved' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="share-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  menuBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute', top: 72, right: 20, zIndex: 100,
    backgroundColor: '#FFF', borderRadius: 16, padding: 8,
    ...Shadows.lg, minWidth: 200,
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10,
  },
  dropdownText: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  imageContainer: {
    marginHorizontal: 20, borderRadius: 24, overflow: 'hidden',
    ...Shadows.md, position: 'relative',
  },
  mainImage: { width: '100%', height: 400, resizeMode: 'cover' },
  aiLabel: {
    position: 'absolute', top: 16, left: 16,
  },
  aiLabelGradient: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10,
  },
  aiLabelText: { fontSize: 11, fontWeight: '600', color: '#FFF' },
  compareSection: { marginTop: 28, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14,
  },
  compareContainer: {
    height: 250, borderRadius: 20, overflow: 'hidden', position: 'relative',
  },
  compareImage: { width: '100%', height: '100%', position: 'absolute' },
  compareOverlay: { height: '100%', overflow: 'hidden', position: 'absolute', left: 0 },
  sliderLine: {
    position: 'absolute', top: 0, bottom: 0, width: 3,
    backgroundColor: '#FFF', zIndex: 10, marginLeft: -1.5,
  },
  sliderHandle: {
    position: 'absolute', top: '50%', marginTop: -16, marginLeft: -14,
    width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', ...Shadows.md,
  },
  compareLabels: {
    position: 'absolute', bottom: 12, left: 12, right: 12,
    flexDirection: 'row', justifyContent: 'space-between', zIndex: 5,
  },
  compareLabel: {
    backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12,
    paddingVertical: 4, borderRadius: 8,
  },
  compareLabelText: { fontSize: 11, fontWeight: '600', color: '#FFF' },
  touchArea: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row', zIndex: 20,
  },
  touchSection: { flex: 1 },
  styleSection: { marginHorizontal: 20, marginTop: 24 },
  styleCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#FFF', borderRadius: 18, padding: 16, ...Shadows.sm,
  },
  styleIcon: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  styleLabel: { fontSize: 12, color: Colors.textTertiary, marginBottom: 2 },
  styleName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  actions: { paddingHorizontal: 20, marginTop: 28 },
  downloadBtn: { borderRadius: 18, overflow: 'hidden', ...Shadows.glow, marginBottom: 16 },
  downloadGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 18, borderRadius: 18,
  },
  downloadText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  secondaryActions: { flexDirection: 'row', gap: 12 },
  secondaryBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#FFF', borderRadius: 16,
    paddingVertical: 14, ...Shadows.sm,
  },
  savedBtn: { backgroundColor: '#FFF5F7' },
  secondaryText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
});
