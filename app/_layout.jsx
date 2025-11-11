// app/_layout.jsx

// 1. IMPORTAR GESTURE HANDLER NO TOPO
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 2. IMPORTAR

import { Redirect, Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, useColorScheme, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexto/AuthContexto';
// CORREÇÃO: Caminho correto (apenas um nível para cima)
import { cores } from '../tema/cores'; 

function LayoutInicial() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = cores[scheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    if (isLoading) return;
    const estaNoGrupoAuth = segments[0] === '(auth)';
    if (user && estaNoGrupoAuth) {
      router.replace('/(tabs)/dashboard');
    } else if (!user && !estaNoGrupoAuth) {
      router.replace('/(auth)/login');
    }
  }, [user, isLoading, segments, router]); 

  if (!user && segments.length === 1 && segments[0] === '') {
      return <Redirect href="/(auth)/login" />;
  }

  // 3. ENVOLVER TUDO
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutInicial />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});