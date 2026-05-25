import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/Colors';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Create Account 🎨</Text>
            <Text style={styles.headerSubtitle}>Join the AI background revolution</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={Colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textTertiary}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
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
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor={Colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.textTertiary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.textTertiary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity style={styles.signupBtn} onPress={() => router.replace('/(tabs)')}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signupGradient}
              >
                <Text style={styles.signupBtnText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-apple" size={20} color={Colors.textPrimary} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 16 },
  backBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F9FA',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  headerSection: { marginBottom: 32 },
  headerTitle: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    letterSpacing: -0.5, marginBottom: 6,
  },
  headerSubtitle: { fontSize: 15, color: Colors.textTertiary },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginLeft: 4 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16,
    height: 56, borderWidth: 1, borderColor: Colors.border, ...Shadows.sm,
  },
  input: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  signupBtn: { borderRadius: 18, overflow: 'hidden', marginTop: 8, ...Shadows.glow },
  signupGradient: { paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  signupBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 28 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: 16, fontSize: 13, color: Colors.textTertiary },
  socialContainer: { flexDirection: 'row', gap: 14 },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 16,
    borderWidth: 1, borderColor: Colors.border, ...Shadows.sm,
  },
  socialIcon: { fontSize: 18, fontWeight: '700', color: '#4285F4' },
  socialText: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  loginLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  loginText: { fontSize: 14, color: Colors.textTertiary },
  loginLinkText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  termsText: {
    fontSize: 12, color: Colors.textTertiary, textAlign: 'center',
    marginTop: 20, lineHeight: 18,
  },
  termsLink: { color: Colors.primary, fontWeight: '600' },
});
