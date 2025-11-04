// app/index.jsx
import { Redirect } from 'expo-router';

/**
 * Esta tela inicial (index) atua como um ponto de entrada.
 * Ela imediatamente redireciona para o grupo de autenticação,
 * permitindo que o app/_layout.jsx decida se o usuário vai para
 * o login ou para o dashboard (se já estiver logado).
 */
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}