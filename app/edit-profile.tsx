import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@email.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [storeDesc, setStoreDesc] = useState('Professional AI background artist creating dreamy worlds.');
  const [instagram, setInstagram] = useState('@lunazhang');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.changeAvatar}>
              <LinearGradient colors={['#8B5CF6', '#EC4899']} style={styles.changeAvatarGradient}>
                <Ionicons name="camera" size={16} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </View>

        {/* User Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {[
            { label: 'Full Name', value: name, setter: setName, icon: 'person-outline' },
            { label: 'Email', value: email, setter: setEmail, icon: 'mail-outline', keyboard: 'email-address' },
            { label: 'Phone', value: phone, setter: setPhone, icon: 'call-outline', keyboard: 'phone-pad' },
          ].map((field, i) => (
            <View key={i} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name={field.icon as any} size={18} color={Colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType={field.keyboard as any || 'default'}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Change Password */}
        <TouchableOpacity style={styles.changePasswordBtn}>
          <View style={styles.changePasswordLeft}>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.primary} />
            <Text style={styles.changePasswordText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>

        {/* Seller Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Store Description</Text>
            <View style={[styles.inputContainer, { height: 100, alignItems: 'flex-start', paddingTop: 14 }]}>
              <TextInput
                style={[styles.input, { textAlignVertical: 'top' }]}
                value={storeDesc}
                onChangeText={setStoreDesc}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instagram</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="logo-instagram" size={18} color={Colors.textTertiary} />
              <TextInput
                style={styles.input}
                value={instagram}
                onChangeText={setInstagram}
              />
            </View>
          </View>
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
  saveBtn: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  saveBtnText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  content: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#F1F0FB' },
  changeAvatar: { position: 'absolute', bottom: 0, right: 0 },
  changeAvatarGradient: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: Colors.background,
  },
  changePhotoText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8, marginLeft: 4 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16,
    height: 52, borderWidth: 1, borderColor: Colors.border, ...Shadows.sm,
  },
  input: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  changePasswordBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 16, padding: 16,
    marginBottom: 28, ...Shadows.sm,
  },
  changePasswordLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  changePasswordText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
});
