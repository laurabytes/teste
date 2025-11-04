import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { cores } from '../../tema/cores'; // Importa nossas cores

// Importa os ícones que vamos usar
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Componente helper para o ícone (só para organizar)
function TabBarIcon(props) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary, // Cor do ícone ativo (azul)
        tabBarInactiveTintColor: theme.mutedForeground, // Cor do ícone inativo (cinza)
        tabBarStyle: {
          backgroundColor: theme.card, // Fundo da barra de abas (branco)
          borderTopColor: theme.border, // Linha de cima
        },
        headerShown: false, // Esconde o "Dashboard" escrito no topo da tela
      }}
    >
      <Tabs.Screen
        name="dashboard" // Nome do arquivo: dashboard.jsx
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="materias" // Nome do arquivo: materias.jsx
        options={{
          title: 'Matérias',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="objetivos" // Nome do arquivo: objetivos.jsx
        options={{
          title: 'Objetivos',
          tabBarIcon: ({ color }) => <TabBarIcon name="bullseye" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pomodoro" // Nome do arquivo: pomodoro.jsx
        options={{
          title: 'Pomodoro',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
    </Tabs>
  );
}