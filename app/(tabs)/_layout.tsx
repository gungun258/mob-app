import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Shadows } from '@/constants/Colors';

function TabBarIcon({ name, focused, label }: { name: any; focused: boolean; label?: string }) {
  return (
    <View style={styles.tabItemContainer}>
      <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        <Ionicons name={name} size={22} color={focused ? '#FF3B6B' : '#9CA3AF'} />
      </View>
      {focused && label && (
        <Text style={styles.activeLabel}>{label}</Text>
      )}
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={[styles.tabBar, Platform.OS === 'web' && ({ backdropFilter: 'blur(12px)' } as any)]}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabBarItem}
            >
              {options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: '', size: 24 }) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'compass' : 'compass-outline'} focused={focused} label="Discover" />
          ),
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Generate',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'sparkles' : 'sparkles-outline'} focused={focused} label="Generate" />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'images' : 'images-outline'} focused={focused} label="Gallery" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} focused={focused} label="Account" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.04)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12, // Reduced gap so it doesn't overflow on 320px screens
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    width: '100%',
    maxWidth: 400, // Keep it clustered on web/tablets
    alignSelf: 'center',
  },
  tabBarItem: {
    flex: 1, // Allow items to shrink on small screens
    maxWidth: 60, // But max 60px on larger screens
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: 48,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#FFE4ED', 
    shadowColor: '#FF3B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF3B6B',
    marginTop: 2,
  },
});
