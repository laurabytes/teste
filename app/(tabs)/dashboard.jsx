import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { cores } from '../../tema/cores'; // Usa nosso novo arquivo de cores

export default function TelaDashboard() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.foreground }]}>
          Dashboard
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600' },
});