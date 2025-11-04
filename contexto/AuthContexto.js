// contexto/AuthContexto.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Começa 'true' para esperar a verificação
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simula a verificação de um token salvo
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Falha ao carregar usuário', e);
      } finally {
        // Informa ao app que a verificação terminou
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Função de Login (SIMULADA)
  const login = async (email, password) => {
    setIsLoading(true);
    // Simula uma pequena demora de rede
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Validação simples
    if (email === '' || password === '') {
      setIsLoading(false);
      throw new Error('Email e senha são obrigatórios.');
    }
    
    const mockUser = { id: 1, nome: 'Usuário Simulado', email: email };
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Função de Cadastro (SIMULADA)
  const register = async (nome, email, password) => {
    setIsLoading(true);
    // Simula uma pequena demora de rede
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Validação simples
    if (nome === '' || email === '' || password === '') {
      setIsLoading(false);
      throw new Error('Todos os campos são obrigatórios.');
    }

    // Após "cadastrar", já "loga" o usuário
    const mockUser = { id: 1, nome: nome, email: email };
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Função de Logout (SIMULADA)
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}