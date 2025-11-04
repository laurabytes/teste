// laurabytes/teste/teste-2245de4fd0484947e9d28a093b91aba0b792499b/app/(tabs)/_layout.jsx
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
// Importamos Timer para ser o novo ícone do Pomodoro
import { BookOpen, Home, Target, Timer } from 'lucide-react-native';
import { cores } from '../../tema/cores';

export default function TabsLayout() {
  const scheme = useColorScheme();
  const theme = cores[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        // 1. REMOVE OS NOMES:
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.foreground,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="pomodoro"
        options={{
          title: 'Pomodoro',
          // 2. MUDA O ÍCONE: Agora usa Timer em vez de Coffee
          tabBarIcon: ({ color }) => <Timer size={24} color={color} />, 
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="objetivos"
        options={{
          title: 'Objetivos',
          tabBarIcon: ({ color }) => <Target size={24} color={color} />, 
          headerShown: false,
        }}
      />
      <Tabs.Screen
        // Corresponde ao arquivo materias/index.jsx
        name="materias/index" 
        options={{
          title: 'Matérias',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />, 
          headerShown: false,
        }}
      />
      {/* Rota para o detalhe de Flashcards, escondida da TabBar */}
      <Tabs.Screen 
        name="materias/[id]"
        options={{
          href: null, 
          headerShown: false, 
          title: 'Flashcards',
        }}
      />
    </Tabs>
  );
}