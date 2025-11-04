import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { cores } from '../../tema/cores';

export default function TelaPomodoro() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.foreground }]}>
          Pomodoro
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