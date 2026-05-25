import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { discoverCategories } from '@/constants/MockData';

export default function AddListingScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [externalLink, setExternalLink] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<number[]>([]);

  const handleAddPhoto = () => {
    setUploadedPhotos(prev => [...prev, prev.length + 1]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Listing</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Upload Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <Text style={styles.sectionSubtitle}>Add up to 5 photos for your listing</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosRow}>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={handleAddPhoto}>
              <LinearGradient
                colors={['#F8F7FF', '#FFF5F7']}
                style={styles.addPhotoGradient}
              >
                <Ionicons name="add" size={28} color={Colors.primary} />
                <Text style={styles.addPhotoText}>Add</Text>
              </LinearGradient>
            </TouchableOpacity>
            {uploadedPhotos.map(i => (
              <View key={i} style={styles.uploadedPhoto}>
                <LinearGradient
                  colors={['#C4B5FD', '#F9A8D4']}
                  style={styles.photoPlaceholder}
                >
                  <Ionicons name="image" size={24} color="#FFF" />
                </LinearGradient>
                <TouchableOpacity
                  style={styles.removePhoto}
                  onPress={() => setUploadedPhotos(prev => prev.filter(p => p !== i))}
                >
                  <Ionicons name="close" size={12} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listing Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Dreamy Mountain Sunset"
              placeholderTextColor={Colors.textTertiary}
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {discoverCategories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  category === cat.id && { backgroundColor: cat.color + '30', borderColor: cat.color },
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={[styles.categoryName, category === cat.id && { color: Colors.textPrimary, fontWeight: '700' }]}>
                  {cat.name}
                </Text>
                {category === cat.id && (
                  <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* External Link */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>External Link (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="link-outline" size={18} color={Colors.textTertiary} />
            <TextInput
              style={styles.input}
              placeholder="https://..."
              placeholderTextColor={Colors.textTertiary}
              value={externalLink}
              onChangeText={setExternalLink}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishBtn} activeOpacity={0.85}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.publishGradient}
          >
            <Ionicons name="rocket" size={20} color="#FFF" />
            <Text style={styles.publishText}>Publish Listing</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 6 },
  sectionSubtitle: { fontSize: 13, color: Colors.textTertiary, marginBottom: 14 },
  photosRow: { flexDirection: 'row' },
  addPhotoBtn: { borderRadius: 16, overflow: 'hidden', marginRight: 10, borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed' },
  addPhotoGradient: {
    width: 90, height: 90, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  addPhotoText: { fontSize: 12, fontWeight: '600', color: Colors.primary, marginTop: 4 },
  uploadedPhoto: { position: 'relative', marginRight: 10 },
  photoPlaceholder: {
    width: 90, height: 90, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  removePhoto: {
    position: 'absolute', top: -4, right: -4,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.error, alignItems: 'center', justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16,
    height: 52, borderWidth: 1, borderColor: Colors.border, ...Shadows.sm,
  },
  input: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#F8F9FA', borderWidth: 1.5, borderColor: 'transparent',
  },
  categoryEmoji: { fontSize: 14 },
  categoryName: { fontSize: 13, fontWeight: '500', color: Colors.textSecondary },
  publishBtn: { borderRadius: 18, overflow: 'hidden', ...Shadows.glow, marginTop: 8 },
  publishGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 18, borderRadius: 18,
  },
  publishText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
