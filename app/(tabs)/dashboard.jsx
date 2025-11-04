// app/(tabs)/dashboard.jsx
import { BookOpen, Target, Timer, TrendingUp } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  Card,
  CardContent,
  CardDescription, // Importado CardDescription
  CardHeader,
  CardTitle
} from '../../componentes/Card';
import { useAuth } from '../../contexto/AuthContexto';
import { cores } from '../../tema/cores';

// --- MOCK DE DADOS CONSOLIDADOS (para Dashboard) ---
const MOCK_DASHBOARD_DATA = {
  1: {
    materias: 2,
    flashcards: 3,
    objetivos: 1, 
    pomodoro: 5,
    performance: [
      { dia: 'Seg', valor: 20 },
      { dia: 'Ter', valor: 45 },
      { dia: 'Qua', valor: 70 },
      { dia: 'Qui', valor: 65 },
      { dia: 'Sex', valor: 90 },
      { dia: 'Sáb', valor: 75 },
    ],
  },
};
// ----------------------------------------------------

// Componente de Card de Estatística
function StatCard({ title, value, description, icon: Icon }) {
  const scheme = useColorScheme();
  const theme = cores[scheme === 'dark' ? 'dark' : 'light']; 
  return (
    <Card style={styles.statCard}>
      <CardHeader>
        <View style={styles.statHeader}>
          <CardTitle style={{ color: theme.foreground, fontSize: 16 }}> 
            {title}
          </CardTitle>
          <Icon color={theme.mutedForeground} size={16} />
        </View>
      </CardHeader>
      <CardContent>
        <Text style={[styles.statValue, { color: theme.foreground }]}>{value}</Text>
        <Text style={[styles.statDescription, { color: theme.mutedForeground }]}>
          {description}
        </Text>
      </CardContent>
    </Card>
  );
}

// Componente do Gráfico de Performance
function PerformanceChart({ performanceData }) {
  const scheme = useColorScheme();
  const theme = cores[scheme === 'dark' ? 'dark' : 'light'];
  
  // Largura total da tela
  const screenWidth = Dimensions.get('window').width;
  // Padding horizontal do ScrollView (20 de cada lado)
  const scrollViewPaddingHorizontal = 20; 
  // O Card tem padding horizontal padrão de 20. 
  // Então o gráfico deve ser (largura da tela - 2*padding do scrollview - 2*padding do card)
  // Ou simplificando, a largura do próprio card.
  // Vamos usar uma largura que se ajuste ao container do card.
  const chartWidth = screenWidth - (scrollViewPaddingHorizontal * 2) - 10; // Ajuste fino -10

  const chartConfig = {
    backgroundColor: theme.card,
    backgroundGradientFrom: theme.card,
    backgroundGradientTo: theme.card,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.primary,
    labelColor: (opacity = 1) => theme.mutedForeground,
    style: {
      borderRadius: 12,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.primary,
    },
  };

  const chartData = {
    labels: performanceData.map(d => d.dia),
    datasets: [
      {
        data: performanceData.map(d => d.valor),
      },
    ],
  };

  return (
    <Card style={{ padding: 0 }}>
      <CardHeader style={{paddingBottom: 0, paddingHorizontal: 20}}> 
        <CardTitle style={{ color: theme.foreground, fontSize: 20 }}>
          Desempenho Semanal (%)
        </CardTitle>
        <CardDescription>
            Representa o seu índice de completude de tarefas e metas.
        </CardDescription>
      </CardHeader>
      <View style={{ paddingTop: 16, alignItems: 'center' }}> {/* Centraliza o gráfico */}
        <LineChart
          data={chartData}
          width={chartWidth} 
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            // Ajuste de margens negativas para o gráfico se expandir um pouco
            // para as bordas internas do Card, se necessário.
            marginHorizontal: -10, // Margem horizontal negativa para "empurrar" para as bordas
          }}
          fromZero
        />
      </View>
    </Card>
  );
}

export default function TelaDashboard() {
  const { user } = useAuth();
  const scheme = useColorScheme();
  const theme = cores[scheme === 'dark' ? 'dark' : 'light'];

  const [stats, setStats] = useState({
    materias: 0,
    flashcards: 0,
    objetivos: 0,
    pomodoro: 0,
    performance: [],
  });

  useEffect(() => {
    const userId = user?.id || 1;
    const data = MOCK_DASHBOARD_DATA[userId] || MOCK_DASHBOARD_DATA[1];
    
    if (data) {
        setStats(data);
    }
  }, [user]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.foreground }]}>
            Bem-vindo, {user?.nome?.split(' ')[0] || 'Usuário'}!
          </Text>
          <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
            Gerencie seus estudos e alcance seus objetivos
          </Text>
        </View>

        {/* 1. GRÁFICO DE PERFORMANCE */}
        {stats.performance.length > 0 && (
          <PerformanceChart performanceData={stats.performance} />
        )}

        {/* 2. GRID DE ESTATÍSTICAS */}
        <View style={styles.grid}>
          <StatCard
            title="Matérias"
            value={stats.materias}
            description="matérias cadastradas"
            icon={BookOpen}
          />
          <StatCard
            title="Flashcards"
            value={stats.flashcards}
            description="flashcards criados"
            icon={TrendingUp}
          />
          <StatCard
            title="Objetivos"
            value={stats.objetivos}
            description="objetivos ativos"
            icon={Target}
          />
          <StatCard
            title="Pomodoro"
            value={stats.pomodoro}
            description="sessões completadas"
            icon={Timer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20, // Padding horizontal do ScrollView
    paddingVertical: 20,
    gap: 32,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48.5%', 
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statDescription: {
    fontSize: 12,
  },
});