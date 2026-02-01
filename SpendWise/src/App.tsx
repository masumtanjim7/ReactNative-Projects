// App.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/theme/ThemeProvider'; // keep as YOU said
import AppTabs from './src/app/navigation/AppTabs';
import AuthStack from './src/app/navigation/AuthStack';
import { useAuth } from './src/app/store/AuthStore';

export default function App() {
  const { isLoggedIn, isHydrated } = useAuth();

  // Wait hydration so it doesn’t flash wrong screen
  if (!isHydrated) {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          {isLoggedIn ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
// End of App.tsx
