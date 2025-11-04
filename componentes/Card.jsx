import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { cores } from '../tema/cores';

const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? cores.dark : cores.light;
};

export const Card = ({ children, style }) => {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, style]}>
      {children}
    </View>
  );
};

export const CardHeader = ({ children, style }) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

export const CardTitle = ({ children, style }) => {
  const theme = useTheme();
  return <Text style={[styles.title, { color: theme.foreground }, style]}>{children}</Text>;
};

export const CardDescription = ({ children, style }) => {
  const theme = useTheme();
  return <Text style={[styles.description, { color: theme.mutedForeground }, style]}>{children}</Text>;
};

export const CardContent = ({ children, style }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export const CardFooter = ({ children, style }) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});