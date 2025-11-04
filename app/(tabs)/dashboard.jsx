// app/(tabs)/dashboard.jsx
import { Link } from 'expo-router';
import { BookOpen, Target, Timer, TrendingUp } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Botao } from '../../componentes/Botao';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../componentes/Card';
import { useAuth } from '../../contexto/AuthContexto';
import { cores } from '../../tema/cores';

// Componente de Card de Estatística (Dashboard)
function StatCard({ title, value, description, icon: Icon }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;
  return (
    <Card style={styles.statCard}>
      <CardHeader>
        <View style={styles.statHeader}>
          <CardTitle style={{ color: theme.foreground }}>{title}</CardTitle>
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

// Componente de Card de Navegação (Dashboard)
function NavCard({ title, description, href, icon: Icon }) {
  return (
    <Card style={styles.navCard}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} asChild>
          <Botao>
            <Icon size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
            Gerenciar
          </Botao>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function TelaDashboard() {
  const { user } = useAuth();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.foreground }]}>
            Bem-vindo, {user?.nome?.split(' ')[0]}!
          </Text>
          <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
            Gerencie seus estudos e alcance seus objetivos
          </Text>
        </View>

        {/* Grid de Estatísticas */}
        <View style={styles.grid}>
          <StatCard
            title="Matérias"
            value="0"
            description="matérias cadastradas"
            icon={BookOpen}
          />
          <StatCard
            title="Flashcards"
            value="0"
            description="flashcards criados"
            icon={TrendingUp}
          />
          <StatCard
            title="Objetivos"
            value="0"
            description="objetivos ativos"
            icon={Target}
          />
          <StatCard
            title="Pomodoro"
            value="0"
            description="sessões completadas"
            icon={Timer}
          />
        </View>

        {/* Grid de Navegação */}
        <View style={styles.navGrid}>
          <NavCard
            title="Matérias"
            description="Organize suas matérias e flashcards"
            href="/(tabs)/materias"
            icon={BookOpen}
          />
          <NavCard
            title="Objetivos"
            description="Defina e acompanhe seus objetivos"
            href="/(tabs)/objetivos"
            icon={Target}
          />
          <NavCard
            title="Pomodoro"
            description="Use a técnica Pomodoro para estudar"
            href="/(tabs)/pomodoro"
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
    padding: 20,
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
    margin: -8, // Contrabalança o padding dos cards
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '40%', // Para caber 2 por linha com gap
    margin: 8,
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
  navGrid: {
    gap: 16,
  },
  navCard: {
    width: '100%',
  },
});