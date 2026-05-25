import { Colors, Shadows } from '@/constants/Colors';
import { aiStyles } from '@/constants/MockData';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function GenerateScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isGenerating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isGenerating]);

  const handleUploadSource = () => {
    setSourceImage('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop');
    setStep(2);
  };

  const handleUploadBg = () => {
    setBgImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop');
    setStep(3);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      router.push('/generated-result');
    }, 3000);
  };

  const renderStep = (stepNum: number, title: string, subtitle: string, isActive: boolean, isCompleted: boolean) => (
    <View style={[styles.stepIndicator, isActive && styles.stepActive]}>
      <View
        style={[
          styles.stepCircle,
          isCompleted && styles.stepCircleCompleted,
          isActive && styles.stepCircleActive,
        ]}
      >
        {isCompleted ? (
          <Ionicons name="checkmark" size={14} color="#FFF" />
        ) : (
          <Text style={[styles.stepNumber, (isActive || isCompleted) && styles.stepNumberActive]}>
            {stepNum}
          </Text>
        )}
      </View>
      <View style={styles.stepText}>
        <Text style={[styles.stepTitle, isActive && styles.stepTitleActive]}>{title}</Text>
        <Text style={styles.stepSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>AI Generate</Text>
            <Text style={styles.headerSubtitle}>Create stunning backgrounds</Text>
          </View>
          <View style={styles.creditsChip}>
            <Ionicons name="diamond" size={14} color={Colors.primary} />
            <Text style={styles.creditsText}>250</Text>
          </View>
        </View>

        {/* Steps Indicator */}
        <View style={styles.stepsContainer}>
          {renderStep(1, 'Upload Photo', 'Your portrait', step === 1, step > 1)}
          <View style={[styles.stepLine, step > 1 && styles.stepLineCompleted]} />
          {renderStep(2, 'Background', 'Choose or upload', step === 2, step > 2)}
          <View style={[styles.stepLine, step > 2 && styles.stepLineCompleted]} />
          {renderStep(3, 'Style & Generate', 'Pick AI style', step === 3, step > 3)}
        </View>

        {/* Step 1: Upload Source Image */}
        {step >= 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>
              {sourceImage ? '✅ Source Photo' : '📸 Upload Your Photo'}
            </Text>
            {sourceImage ? (
              <View style={styles.uploadedImageContainer}>
                <Image source={{ uri: sourceImage }} style={styles.uploadedImage} />
                <TouchableOpacity
                  style={styles.changeImageBtn}
                  onPress={() => {
                    setSourceImage(null);
                    setStep(1);
                  }}
                >
                  <Ionicons name="pencil" size={14} color="#FFF" />
                  <Text style={styles.changeImageText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadArea} onPress={handleUploadSource}>
                <LinearGradient
                  colors={['#F8F7FF', '#FFF5F7']}
                  style={styles.uploadGradient}
                >
                  <View style={styles.uploadIconWrapper}>
                    <LinearGradient
                      colors={Colors.gradientHero}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.uploadIcon}
                    >
                      <Ionicons name="camera-outline" size={28} color="#FFF" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.uploadTitle}>Tap to upload your photo</Text>
                  <Text style={styles.uploadSubtitle}>JPG, PNG · Max 10MB</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Step 2: Select/Upload Background */}
        {step >= 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>
              {bgImage ? '✅ Background Selected' : '🖼️ Choose Background'}
            </Text>
            {bgImage ? (
              <View style={styles.uploadedImageContainer}>
                <Image source={{ uri: bgImage }} style={styles.uploadedImage} />
                <TouchableOpacity
                  style={styles.changeImageBtn}
                  onPress={() => {
                    setBgImage(null);
                    setStep(2);
                  }}
                >
                  <Ionicons name="pencil" size={14} color="#FFF" />
                  <Text style={styles.changeImageText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity style={styles.uploadArea} onPress={handleUploadBg}>
                  <LinearGradient
                    colors={['#F0F9FF', '#F8F7FF']}
                    style={styles.uploadGradient}
                  >
                    <View style={styles.uploadIconWrapper}>
                      <LinearGradient
                        colors={Colors.gradientHero}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.uploadIcon}
                      >
                        <Ionicons name="image-outline" size={28} color="#FFF" />
                      </LinearGradient>
                    </View>
                    <Text style={styles.uploadTitle}>Upload custom background</Text>
                    <Text style={styles.uploadSubtitle}>Or browse marketplace below</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.orText}>or browse marketplace</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketplaceBgs}>
                  {[
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop',
                    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop',
                    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=200&h=200&fit=crop',
                  ].map((img, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.marketplaceBgCard}
                      onPress={() => {
                        setBgImage(img);
                        setStep(3);
                      }}
                    >
                      <Image source={{ uri: img }} style={styles.marketplaceBgImage} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Step 3: AI Styles */}
        {step >= 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>✨ Select AI Style</Text>
            <View style={styles.stylesGrid}>
              {aiStyles.map(style => (
                <TouchableOpacity
                  key={style.id}
                  style={[
                    styles.styleCard,
                    selectedStyle === style.id && styles.styleCardSelected,
                  ]}
                  onPress={() => setSelectedStyle(style.id)}
                >
                  <LinearGradient
                    colors={selectedStyle === style.id ? style.gradient : ['#F8F9FA', '#F3F4F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.styleGradient}
                  >
                    <Text style={styles.styleIcon}>{style.icon}</Text>
                    <Text
                      style={[
                        styles.styleName,
                        selectedStyle === style.id && styles.styleNameSelected,
                      ]}
                    >
                      {style.name}
                    </Text>
                    {selectedStyle === style.id && (
                      <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.styleCheck} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Generate Button */}
        {step >= 3 && selectedStyle && (
          <View style={styles.generateSection}>
            {isGenerating ? (
              <View style={styles.generatingContainer}>
                <Animated.View style={[styles.generatingAnimation, { transform: [{ scale: pulseAnim }] }]}>
                  <LinearGradient
                    colors={Colors.gradientHero}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.generatingCircle}
                  >
                    <Animated.View style={{ opacity: glowAnim }}>
                      <Ionicons name="sparkles" size={32} color="#FFF" />
                    </Animated.View>
                  </LinearGradient>
                </Animated.View>
                <Text style={styles.generatingText}>Creating magic...</Text>
                <Text style={styles.generatingSubtext}>AI is working on your photo</Text>
                <ActivityIndicator color={Colors.primary} style={{ marginTop: 12 }} />
              </View>
            ) : (
              <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} activeOpacity={0.85}>
                <LinearGradient
                  colors={Colors.gradientButton}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.generateGradient}
                >
                  <Ionicons name="sparkles" size={22} color="#FFF" />
                  <Text style={styles.generateText}>Generate with AI</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            <View style={styles.costInfo}>
              <Ionicons name="diamond" size={14} color={Colors.primary} />
              <Text style={styles.costText}>This generation costs 10 credits</Text>
            </View>

            {/* Quick Tips Card */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeaderRow}>
                <Ionicons name="bulb-outline" size={18} color="#F59E0B" />
                <Text style={styles.tipsTitle}>Quick Tips</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Use clear, well-lit photos</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Choose matching backgrounds</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Each generation costs 10 credits</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
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
  creditsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8F7FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  creditsText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },

  // Steps
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  stepActive: {},
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F0FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: Colors.success,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textTertiary,
  },
  stepNumberActive: {
    color: '#FFF',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
  },
  stepTitleActive: {
    color: Colors.textPrimary,
  },
  stepSubtitle: {
    fontSize: 9,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  stepLine: {
    width: 20,
    height: 2,
    backgroundColor: '#F1F0FB',
    marginHorizontal: 4,
  },
  stepLineCompleted: {
    backgroundColor: Colors.success,
  },

  // Step Content
  stepContent: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  stepContentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  // Upload Area
  uploadArea: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  uploadGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 18,
  },
  uploadIconWrapper: {
    marginBottom: 14,
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: Colors.textTertiary,
  },

  // Uploaded Image
  uploadedImageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  changeImageBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  changeImageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },

  // Marketplace Backgrounds
  orText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textTertiary,
    marginVertical: 14,
  },
  marketplaceBgs: {
    flexDirection: 'row',
  },
  marketplaceBgCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 10,
    ...Shadows.sm,
  },
  marketplaceBgImage: {
    width: '100%',
    height: '100%',
  },

  // Styles Grid
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleCard: {
    width: (width - 50) / 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  styleCardSelected: {
    ...Shadows.glow,
  },
  styleGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    position: 'relative',
  },
  styleIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  styleName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  styleNameSelected: {
    color: '#FFF',
  },
  styleCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  // Generate
  generateSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  generateBtn: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadows.premiumButton,
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 20,
  },
  generateText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  costInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  costText: {
    fontSize: 13,
    color: Colors.textTertiary,
  },

  // Generating Animation
  generatingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  generatingAnimation: {
    marginBottom: 20,
  },
  generatingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatingText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  generatingSubtext: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: 4,
  },

  // Tips Card
  tipsCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...Shadows.sm,
  },
  tipsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  tipText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
