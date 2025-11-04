import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { cores } from '../tema/cores';

export function Botao({ children, onPress, variant = 'default', style }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const variantStyles = {
    style: {
      backgroundColor: variant === 'destructive' ? theme.destructive : theme.primary,
    },
    text: {
      color: theme.primaryForeground,
    },
  };

  return (
    <TouchableOpacity
      style={[styles.base, variantStyles.style, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variantStyles.text]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});