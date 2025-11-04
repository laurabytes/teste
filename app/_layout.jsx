// app/_layout.jsx

import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { cores } from '../tema/cores';

// 1. IMPORTANTE: Vamos importar o AuthContexto
import { AuthProvider, useAuth } from '../contexto/AuthContexto';

// Este componente decide para onde o usuário vai
function LayoutInicial() {
  // 2. Pegamos o usuário e o status de "carregando"
  const { user, isLoading } = useAuth();
  
  const segments = useSegments(); // Diz em qual "grupo" (auth ou tabs) o usuário está
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  useEffect(() => {
    if (isLoading) {
      return; // Se está checando o login, não faz nada
    }

    const estaNoGrupoAuth = segments[0] === '(auth)';

    if (user && estaNoGrupoAuth) {
      // 3. Se o usuário ESTÁ logado e está na tela de login,
      //    mandamos ele para o dashboard.
      router.replace('/(tabs)/dashboard');
    } else if (!user && !estaNoGrupoAuth) {
      // 4. Se o usuário NÃO está logado e NÃO está na tela de login,
      //    mandamos ele para o login.
      router.replace('/(auth)/login');
    }
  }, [user, isLoading, segments]); // Roda essa lógica sempre que o usuário mudar

  // 5. MUDANÇA: O Root Layout NÃO PODE retornar null.
  // Ele deve SEMPRE renderizar o <Slot />.
  // O useEffect acima irá lidar com o redirecionamento
  // assim que 'isLoading' se tornar 'false'.
  
  // if (isLoading) {
  //   return null; // <-- ESSE É O PROBLEMA! REMOVA ISSO.
  // }

  // O <Slot> renderiza a tela correta (login ou dashboard)
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/*
        Enquanto isLoading=true, o Slot vai renderizar a rota 
        que foi pedida (ex: / ou /dashboard). 
        Assim que o useEffect do AuthContexto rodar e 
        isLoading virar 'false', o useEffect *deste* arquivo vai rodar e fazer o redirecionamento 
        correto (ex: para /login) se necessário.
      */}
      <Slot />
    </SafeAreaView>
  );
}

// Este é o componente principal
export default function RootLayout() {
  return (
    // 6. O AuthProvider "abraça" o app inteiro
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