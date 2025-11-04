// laurabytes/teste/teste-2245de4fd0484947e9d28a093b91aba0b792499b/contexto/AuthContexto.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react'; // Adicionado 'useContext'

const AuthContext = createContext(undefined);

/**
 * Hook customizado para acessar os dados de autenticação.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // ESSENCIAL: Comece 'isLoading' como 'true' para evitar o redirecionamento imediato
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      // ... (lógica de AsyncStorage)
      
      // O bloco finally garante que o carregamento termine, 
      // permitindo que a lógica no _layout.jsx prossiga.
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          // Simulando que o usuário tem um nome para usar no Dashboard
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Falha ao carregar usuário', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserFromStorage();
  }, []);
  
  // SIMULAÇÃO: Função de Login
  const login = async (email, password) => { 
    // Simulação: Apenas o usuário 'teste@email.com' com senha '123456' funciona
    if (email === 'teste@email.com' && password === '123456') {
      const mockUser = { id: 1, email, nome: 'Usuário Teste' };
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return;
    }
    throw new Error('Credenciais inválidas. Tente "teste@email.com" e "123456".');
  };

  // SIMULAÇÃO: Função de Cadastro
  const register = async (nome, email, password) => { 
    // Simulação: Cria um novo usuário
    const mockUser = { id: Math.random(), email, nome };
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // SIMULAÇÃO: Função de Logout
  const logout = async () => { 
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// O hook useAuth foi adicionado acima
// O (export useAuth) está no topo agora