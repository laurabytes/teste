import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { cores } from '../../tema/cores';

// 1. IMPORTAR O USEAUTH
import { useAuth } from '../../contexto/AuthContexto';

// Nossos componentes customizados
import { Botao } from '../../componentes/Botao';
import { CampoDeTexto } from '../../componentes/CampoDeTexto';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../componentes/Card';

export default function Login() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  // 2. PEGAR A FUNÇÃO DE LOGIN DO CONTEXTO
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 3. ATUALIZAR A FUNÇÃO DE LOGIN
  const handleLogin = async () => {
    // Por enquanto, só vamos mostrar no console.
    // A lógica da API virá depois.
    console.log('Tentando login com:', email, 'Senha:', senha);
    try {
      // Chama a função de login (simulada) do nosso contexto
      await login(email, senha);
      
      // Se o login funcionar, o _layout.jsx vai nos redirecionar
      // para o dashboard automaticamente.
      
    } catch (error) {
      // Se a API (no futuro) der erro, podemos mostrar um alerta
      Alert.alert("Erro no Login", "Email ou senha inválidos.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Acesse sua conta para continuar</CardDescription>
          </CardHeader>

          <CardContent style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.foreground }]}>Email</Text>
              <CampoDeTexto
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.foreground }]}>Senha</Text>
              <CampoDeTexto
                placeholder="Sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true} // Para esconder a senha
              />
            </View>
          </CardContent>

          <CardFooter>
            {/* O Botão agora chama o handleLogin atualizado */}
            <Botao onPress={handleLogin}>
              Entrar
            </Botao>
          </CardFooter>
        </Card>

        <Link href="/(auth)/cadastro" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={[styles.linkText, { color: theme.mutedForeground }]}>
              Não tem uma conta?{' '}
              <Text style={{ color: theme.primary, fontWeight: '600' }}>
                Cadastre-se
              </Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

// Estilos (não mudou nada aqui)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    gap: 16,
  },
  inputGroup: {
    width: '100%',
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  linkButton: {
    marginTop: 24,
  },
  linkText: {
    fontSize: 14,
  },
});