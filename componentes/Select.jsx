// laurabytes/teste/teste-2245de4fd0484947e9d28a093b91aba0b792499b/componentes/Select.jsx
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { cores } from '../tema/cores'; // Caminho para a pasta 'tema'

export function Select({ children, onValueChange, value, enabled = true }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light; //

  const styles = StyleSheet.create({
    container: {
      height: 44,
      width: '100%',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border, //
      justifyContent: 'center',
      // Definimos o background para o valor do Card, para ficar consistente
      backgroundColor: theme.card, //
    },
    picker: {
      color: theme.foreground, //
      // Adicionamos estilos de texto para torná-lo mais customizado
      fontSize: 16, 
      fontWeight: '500',
      // Ajuste para Android: padding negativo para centralizar
      paddingLeft: -12, 
    },
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        // Tentamos aplicar um estilo mais genérico de fonte para iOS/Web
        itemStyle={{ fontSize: 16, fontWeight: '500' }} 
        enabled={enabled}
      >
        {children}
      </Picker>
    </View>
  );
}

export const SelectItem = Picker.Item;