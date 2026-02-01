import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './src/theme/ThemeProvider';
import AppTabs from './src/app/navigation/AppTabs';
import AuthStack from './src/app/navigation/AuthStack';
import { useAuth } from './src/app/store/AuthStore';

function RootNavigator() {
  const { isHydrated, isLoggedIn } = useAuth();

  if (!isHydrated) return null;

  return isLoggedIn ? <AppTabs /> : <AuthStack />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
//