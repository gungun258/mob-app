import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';
import { menuItems } from '@/constants/MockData';

export default function AccountScreen() {
  const router = useRouter();

  const stats = [
    { label: 'Generations', value: '42', icon: 'sparkles', color: '#8B5CF6' },
    { label: 'Credits', value: '250', icon: 'diamond', color: '#F472B6' },
    { label: 'Following', value: '18', icon: 'people', color: '#7DD3FC' },
  ];

  const handleMenuPress = (route: string) => {
    if (route === 'credits') router.push('/credits');
    else if (route === 'edit-profile') router.push('/edit-profile');
    else if (route === 'wishlist') router.push('/wishlist');
    else if (route === 'referrals') router.push('/referrals');
    else if (route === 'seller-dashboard') router.push('/seller-dashboard');
    else if (route === 'credits-history') router.push('/credits');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#F8F7FF', '#FFF5F7', '#F0F9FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileTop}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={Colors.gradientHero}
                  style={styles.avatarBorder}
                >
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
                    style={styles.avatar}
                  />
                </LinearGradient>
                <TouchableOpacity style={styles.editAvatarBtn}>
                  <Ionicons name="camera" size={12} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Sarah Chen</Text>
                <Text style={styles.profileEmail}>sarah.chen@email.com</Text>
                <TouchableOpacity
                  style={styles.editProfileBtn}
                  onPress={() => router.push('/edit-profile')}
                >
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                  <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Premium Banner */}
        <TouchableOpacity style={styles.premiumBanner} activeOpacity={0.9} onPress={() => router.push('/credits')}>
          <LinearGradient
            colors={Colors.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.premiumGradient}
          >
            <View style={styles.premiumLeft}>
              <Text style={styles.premiumEmoji}>💎</Text>
              <View>
                <Text style={styles.premiumTitle}>Get More Credits</Text>
                <Text style={styles.premiumSubtitle}>Unlock unlimited AI generations</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item.route)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>BgCraft AI v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 BgCraft AI. All rights reserved.</Text>
        </View>

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
  scrollContent: {
    paddingBottom: 20,
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
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Profile Card
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    ...Shadows.premiumCard,
  },
  profileGradient: {
    padding: 24,
    borderRadius: 24,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: 10,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textTertiary,
  },

  // Premium Banner
  premiumBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden',
    ...Shadows.premiumButton,
  },
  premiumGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  premiumEmoji: {
    fontSize: 28,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  premiumSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // Menu
  menuContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 20,
    ...Shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F7FF',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8F7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.error,
  },

  // App Info
  appInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  appVersion: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textTertiary,
  },
  appCopyright: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});
