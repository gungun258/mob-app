import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { galleryImages } from '@/constants/MockData';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 52) / 2;

export default function GalleryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isPublic, setIsPublic] = useState(false);
  const [lovedImages, setLovedImages] = useState<string[]>(
    galleryImages.filter(i => i.loved).map(i => i.id)
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const filters = [
    { key: 'all', label: 'All', icon: 'apps' },
    { key: 'generated', label: 'Generated', icon: 'sparkles' },
    { key: 'uploaded', label: 'Uploaded', icon: 'cloud-upload' },
    { key: 'loved', label: 'Loved', icon: 'heart' },
  ];

  const filteredImages = galleryImages.filter(img => {
    if (filter === 'all') return true;
    if (filter === 'loved') return lovedImages.includes(img.id);
    return img.type === filter;
  });

  const toggleLove = (id: string) => {
    setLovedImages(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id: string) => {
    if (!isSelectMode) {
      setIsSelectMode(true);
      setSelectedImages([id]);
    } else {
      setSelectedImages(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Selected',
      `Are you sure you want to delete ${selectedImages.length} image(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSelectedImages([]);
            setIsSelectMode(false);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Gallery</Text>
          <Text style={styles.headerSubtitle}>{galleryImages.length} photos</Text>
        </View>
        <View style={styles.headerActions}>
          {isSelectMode ? (
            <>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setIsSelectMode(false); setSelectedImages([]); }}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Ionicons name="trash-outline" size={18} color="#FFF" />
                <Text style={styles.deleteBtnText}>{selectedImages.length}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.viewToggle}
                onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <Ionicons
                  name={viewMode === 'grid' ? 'list' : 'grid'}
                  size={20}
                  color={Colors.textPrimary}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Search Bar & Public Toggle */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search gallery..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.publicToggle, isPublic && styles.publicToggleActive]}
          onPress={() => setIsPublic(!isPublic)}
        >
          <Ionicons name={isPublic ? "earth" : "lock-closed"} size={16} color={isPublic ? "#FFF" : Colors.textPrimary} />
          <Text style={[styles.publicToggleText, isPublic && styles.publicToggleTextActive]}>
            {isPublic ? 'Public' : 'Private'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Bubbles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            {filter === f.key ? (
              <LinearGradient
                colors={Colors.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.filterChipGradient}
              >
                <Ionicons name={f.icon as any} size={14} color="#FFF" />
                <Text style={styles.filterTextActive}>{f.label}</Text>
              </LinearGradient>
            ) : (
              <>
                <Ionicons name={f.icon as any} size={14} color={Colors.textTertiary} />
                <Text style={styles.filterText}>{f.label}</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Gallery Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.galleryContent}>
        {filteredImages.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="images-outline" size={48} color={Colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>No images yet</Text>
            <Text style={styles.emptySubtitle}>
              Start generating or upload your photos
            </Text>
            <TouchableOpacity style={styles.emptyBtn}>
              <LinearGradient
                colors={Colors.gradientButton}
                style={styles.emptyBtnGradient}
              >
                <Text style={styles.emptyBtnText}>Generate Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : viewMode === 'grid' ? (
          <View style={styles.gridContainer}>
            {filteredImages.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridCard}
                activeOpacity={0.85}
                onPress={() => {
                  if (isSelectMode) {
                    toggleSelect(item.id);
                  } else {
                    router.push('/generated-result');
                  }
                }}
                onLongPress={() => toggleSelect(item.id)}
              >
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                {item.type === 'generated' && item.style && (
                  <View style={styles.styleBadge}>
                    <Text style={styles.styleBadgeText}>{item.style}</Text>
                  </View>
                )}
                <View style={styles.gridActions}>
                  <TouchableOpacity
                    style={styles.gridActionBtn}
                    onPress={() => toggleLove(item.id)}
                  >
                    <Ionicons
                      name={lovedImages.includes(item.id) ? 'heart' : 'heart-outline'}
                      size={16}
                      color={lovedImages.includes(item.id) ? '#F472B6' : '#FFF'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gridActionBtn}>
                    <Ionicons name="share-outline" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gridActionBtn}>
                    <Ionicons name="download-outline" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
                {isSelectMode && (
                  <View style={styles.selectOverlay}>
                    <View
                      style={[
                        styles.selectCircle,
                        selectedImages.includes(item.id) && styles.selectCircleActive,
                      ]}
                    >
                      {selectedImages.includes(item.id) && (
                        <Ionicons name="checkmark" size={14} color="#FFF" />
                      )}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredImages.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.listCard}
                activeOpacity={0.85}
                onPress={() => router.push('/generated-result')}
              >
                <Image source={{ uri: item.image }} style={styles.listImage} />
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>
                    {item.type === 'generated' ? `${item.style} Generation` : 'Uploaded Photo'}
                  </Text>
                  <Text style={styles.listDate}>{item.date}</Text>
                  <View style={styles.listActions}>
                    <TouchableOpacity onPress={() => toggleLove(item.id)}>
                      <Ionicons
                        name={lovedImages.includes(item.id) ? 'heart' : 'heart-outline'}
                        size={20}
                        color={lovedImages.includes(item.id) ? '#F472B6' : Colors.textTertiary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="share-outline" size={20} color={Colors.textTertiary} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="download-outline" size={20} color={Colors.textTertiary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.error,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },

  // Search & Toggle
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  publicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  publicToggleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  publicToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  publicToggleTextActive: {
    color: '#FFF',
  },

  // Filters
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
  },
  filterChipActive: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 14,
  },
  filterChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },

  // Gallery
  galleryContent: {
    paddingHorizontal: 16,
  },

  // Grid View
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridCard: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.2,
    borderRadius: 18,
    overflow: 'hidden',
    ...Shadows.md,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  styleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  styleBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  gridActions: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    gap: 6,
  },
  gridActionBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  // List View
  listContainer: {
    gap: 12,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 18,
    overflow: 'hidden',
    ...Shadows.md,
  },
  listImage: {
    width: 100,
    height: 100,
  },
  listInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  listDate: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  listActions: {
    flexDirection: 'row',
    gap: 16,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: '#F8F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginBottom: 24,
  },
  emptyBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyBtnGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  emptyBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});
