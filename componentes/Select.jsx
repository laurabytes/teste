// componentes/Select.jsx
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { cores } from '../tema/cores'; // Caminho para a pasta 'tema'

export function Select({ children, onValueChange, value, enabled = true }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const styles = StyleSheet.create({
    container: {
      height: 44,
      width: '100%',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      backgroundColor: enabled ? '#FFFFFF' : theme.muted,
    },
    picker: {
      color: theme.foreground,
    },
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        enabled={enabled}
      >
        {children}
      </Picker>
    </View>
  );
}

export const SelectItem = Picker.Item;