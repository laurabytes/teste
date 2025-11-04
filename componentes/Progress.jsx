// componentes/Progress.jsx
import { StyleSheet, useColorScheme, View } from 'react-native';
import { cores } from '../tema/cores'; // Caminho para a pasta 'tema'

export function Progress({ value = 0, style }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const styles = StyleSheet.create({
    background: {
      height: 8,
      backgroundColor: theme.muted,
      borderRadius: 4,
      overflow: 'hidden',
    },
    indicator: {
      height: '100%',
      width: `${Math.max(0, Math.min(100, value))}%`,
      backgroundColor: theme.primary,
    },
  });

  return (
    <View style={[styles.background, style]}>
      <View style={styles.indicator} />
    </View>
  );
}