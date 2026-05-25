import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.iconSection}>
            <LinearGradient colors={['#8B5CF6', '#EC4899']} style={styles.iconBg}>
              <Ionicons name={sent ? 'checkmark-circle' : 'key'} size={36} color="#FFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>{sent ? 'Check your email 📬' : 'Forgot Password? 🔐'}</Text>
          <Text style={styles.subtitle}>
            {sent
              ? 'We\'ve sent a password reset link to your email address.'
              : 'Enter your email address and we\'ll send you a link to reset your password.'}
          </Text>

          {!sent ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={Colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={() => setSent(true)}>
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitText}>Send Reset Link</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('/login')}>
              <Text style={styles.backToLoginText}>Back to Sign In</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingTop: 16 },
  backBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center', marginBottom: 32,
  },
  iconSection: { alignItems: 'center', marginBottom: 24 },
  iconBg: {
    width: 80, height: 80, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 26, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', marginBottom: 10,
  },
  subtitle: {
    fontSize: 15, color: Colors.textTertiary, textAlign: 'center',
    lineHeight: 22, marginBottom: 32, paddingHorizontal: 20,
  },
  form: { gap: 20 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16,
    height: 56, borderWidth: 1, borderColor: Colors.border, ...Shadows.sm,
  },
  input: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  submitBtn: { borderRadius: 18, overflow: 'hidden', ...Shadows.glow },
  submitGradient: { paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  submitText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  backToLogin: {
    alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 16, backgroundColor: '#F8F7FF',
  },
  backToLoginText: { fontSize: 15, fontWeight: '600', color: Colors.primary },
});
