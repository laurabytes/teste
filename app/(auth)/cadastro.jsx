import { useState } from 'react';
// IMPORTANTE: Esta é a linha que importa o <View>, <Text>, etc.
import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { cores } from '../../tema/cores'; // Importa as cores

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

export default function Cadastro() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    console.log('Nome:', nome, 'Email:', email, 'Senha:', senha);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>Insira seus dados para se cadastrar</CardDescription>
          </CardHeader>

          <CardContent style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.foreground }]}>Nome</Text>
              <CampoDeTexto
                placeholder="Seu nome completo"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

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
                placeholder="Crie uma senha forte"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
              />
            </View>
          </CardContent>

          <CardFooter>
            <Botao onPress={handleCadastro}>
              Criar conta
            </Botao>
          </CardFooter>
        </Card>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={[styles.linkText, { color: theme.mutedForeground }]}>
              Já tem uma conta?{' '}
              <Text style={{ color: theme.primary, fontWeight: '600' }}>
                Faça Login
              </Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
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
    paddingBottom: 20,
  },
  linkText: {
    fontSize: 14,
  },
});