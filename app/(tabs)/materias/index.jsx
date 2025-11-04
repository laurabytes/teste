// app/(tabs)/materias/index.jsx
import { Link } from 'expo-router';
import { BookOpen, Edit, Plus, Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Botao } from '../../../componentes/Botao'; // <-- CORRIGIDO
import { CampoDeTexto } from '../../../componentes/CampoDeTexto'; // <-- CORRIGIDO
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../componentes/Card'; // <-- CORRIGIDO
import { Dialog } from '../../../componentes/Dialog'; // <-- CORRIGIDO
import { Textarea } from '../../../componentes/Textarea'; // <-- CORRIGIDO
import { useAuth } from '../../../contexto/AuthContexto'; // <-- CORRIGIDO
import { cores } from '../../../tema/cores'; // <-- CORRIGIDO

// Mock de dados inicial
const MOCK_SUBJECTS = [
  { id: 1, nome: 'Matemática', descricao: 'Álgebra e Geometria', usuarioId: 1 },
  { id: 2, nome: 'História', descricao: 'História do Brasil', usuarioId: 1 },
];

export default function TelaMaterias() {
  const { user } = useAuth();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const [subjects, setSubjects] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isPageLoading, setIsPageLoading] = useState(true); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    setIsPageLoading(true);
    setTimeout(() => {
      if (user) {
        setSubjects(MOCK_SUBJECTS.filter(s => s.usuarioId === user.id));
      }
      setIsPageLoading(false);
    }, 500);
  }, [user]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 300)); 

    try {
      if (editingSubject) {
        setSubjects(prev => 
          prev.map(s => 
            s.id === editingSubject.id 
            ? { ...s, ...formData } 
            : s
          )
        );
      } else {
        const newSubject = {
          ...formData,
          id: Math.random(), 
          usuarioId: user?.id,
        };
        setSubjects(prev => [...prev, newSubject]);
      }
      setIsDialogOpen(false);
      setFormData({ nome: '', descricao: '' });
      setEditingSubject(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a matéria.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Excluir Matéria', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setSubjects(prev => prev.filter(s => s.id !== id));
        },
      },
    ]);
  };

  const openEditDialog = (subject) => {
    setEditingSubject(subject);
    setFormData({ nome: subject.nome, descricao: subject.descricao });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingSubject(null);
    setFormData({ nome: '', descricao: '' });
    setIsDialogOpen(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: theme.foreground }]}>Matérias</Text>
            <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
              Organize suas matérias e flashcards
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={openCreateDialog}
          >
            <Plus color={theme.primaryForeground} size={20} />
          </TouchableOpacity>
        </View>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <View>
            <Text style={[styles.dialogTitle, { color: theme.foreground }]}>
              {editingSubject ? 'Editar Matéria' : 'Nova Matéria'}
            </Text>
            <Text style={[styles.dialogDescription, { color: theme.mutedForeground }]}>
              {editingSubject
                ? 'Edite as informações da matéria'
                : 'Adicione uma nova matéria'}
            </Text>

            <View style={styles.form}>
              <Text style={[styles.label, { color: theme.foreground }]}>Nome</Text>
              <CampoDeTexto
                value={formData.nome}
                onChangeText={(t) => setFormData({ ...formData, nome: t })}
                placeholder="Ex: Matemática"
              />
              <Text style={[styles.label, { color: theme.foreground }]}>Descrição</Text>
              <Textarea
                value={formData.descricao}
                onChangeText={(t) => setFormData({ ...formData, descricao: t })}
                placeholder="Descreva a matéria"
              />
              <View style={styles.dialogActions}>
                <Botao variant="destructive" onPress={() => setIsDialogOpen(false)}>
                  Cancelar
                </Botao>
                <Botao onPress={handleSubmit} disabled={isLoading}>
                  {isLoading ? <ActivityIndicator color={theme.primaryForeground} /> : (editingSubject ? 'Salvar' : 'Criar')}
                </Botao>
              </View>
            </View>
          </View>
        </Dialog>

        {isPageLoading && <ActivityIndicator size="large" color={theme.primary} />}

        {!isPageLoading && subjects.length === 0 ? (
          <Card>
            <CardContent style={styles.emptyState}>
              <BookOpen color={theme.mutedForeground} size={48} />
              <Text style={[styles.emptyTitle, { color: theme.foreground }]}>
                Nenhuma matéria cadastrada
              </Text>
              <Text style={[styles.emptyText, { color: theme.mutedForeground }]}>
                Comece criando sua primeira matéria
              </Text>
              <Botao onPress={openCreateDialog}>
                <Plus size={16} color="#FFF" style={{ marginRight: 8 }} />
                Criar Primeira Matéria
              </Botao>
            </CardContent>
          </Card>
        ) : (
          <View style={styles.grid}>
            {subjects.map((subject) => (
              <Card key={subject.id} style={styles.card}>
                <CardHeader>
                  <View style={styles.cardTitleRow}>
                    <CardTitle style={{ flex: 1, color: theme.foreground }}>
                      {subject.nome}
                    </CardTitle>
                    <TouchableOpacity onPress={() => openEditDialog(subject)}>
                      <Edit color={theme.mutedForeground} size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(subject.id)}>
                      <Trash2 color={theme.destructive} size={18} />
                    </TouchableOpacity>
                  </View>
                  {subject.descricao && (
                    <CardDescription>{subject.descricao}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Link href={`/(tabs)/materias/${subject.id}`} asChild>
                    <Botao variant="outline">
                      <BookOpen size={16} color={theme.foreground} style={{ marginRight: 8 }} />
                      Ver Flashcards
                    </Botao>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// (Os 'styles' são os mesmos da resposta anterior, não precisa mudar)
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, gap: 24, paddingBottom: 60 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, marginTop: 4 },
  addButton: {
    padding: 10,
    borderRadius: 20,
  },
  grid: { gap: 16 },
  card: { width: '100%' },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: '600' },
  emptyText: { textAlign: 'center' },
  dialogTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  dialogDescription: { fontSize: 14, color: '#737373', marginBottom: 16 },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 20,
  },
});