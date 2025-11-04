// componentes/Badge.jsx
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { cores } from '../tema/cores'; // Caminho para a pasta 'tema'

export function Badge({ children, variant = 'default', style }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const variantStyles = {
    default: {
      backgroundColor: theme.primary,
      color: theme.primaryForeground,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: theme.muted,
      color: theme.mutedForeground,
      borderColor: 'transparent',
    },
    destructive: {
      backgroundColor: theme.destructive,
      color: theme.primaryForeground,
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.foreground,
      borderColor: theme.border,
    },
  };

  const styles = StyleSheet.create({
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 12,
      borderWidth: 1,
      alignSelf: 'flex-start',
      ...variantStyles[variant],
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
      color: variantStyles[variant].color,
    },
  });

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}