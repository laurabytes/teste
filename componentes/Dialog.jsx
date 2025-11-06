// componentes/Dialog.jsx
import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    useColorScheme,
    View
} from 'react-native';

// 1. IMPORTE O GESTUREHANDLERROOTVIEW AQUI
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { cores } from '../tema/cores';

export function Dialog({ open, onOpenChange, children }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 24,
      width: '90%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => onOpenChange(false)}
    >
      {/* 2. ENVOLVA O CONTEÚDO DO MODAL (style={{ flex: 1 }} é essencial) */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.content}>{children}</View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Modal>
  );
}