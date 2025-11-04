import { createContext, useContext, useState } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext(undefined);

// 2. Cria o "Provedor" que vai abraçar o app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Começa deslogado
  const [isLoading, setIsLoading] = useState(false); // Não estamos carregando nada (por enquanto)

  // Função de Login (SIMULADA)
  const login = async (email, password) => {
    console.log('Simulando login com:', email);
    // Em vez de chamar a API, nós "fingimos" um usuário:
    setUser({ id: 1, nome: 'Laura (Simulado)', email: email });
  };

  // Função de Cadastro (SIMULADA)
  const register = async (nome, email, password) => {
    console.log('Simulando cadastro...');
    // Após "cadastrar", a gente já "loga" o usuário:
    await login(email, password);
  };

  // Função de Logout (SIMULADA)
  const logout = async () => {
    console.log('Simulando logout...');
    setUser(null); // Desloga o usuário
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. Cria o "Hook" para usar o contexto nas telas
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}