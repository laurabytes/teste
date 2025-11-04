// app/(tabs)/materias/[id].jsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Edit, FlipHorizontal, Plus, Trash2 } from 'lucide-react-native';
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
    View
} from 'react-native';
import { Botao } from '../../../componentes/Botao'; // <-- CORRIGIDO
import { Card, CardContent, CardHeader, CardTitle } from '../../../componentes/Card'; // <-- CORRIGIDO
import { Dialog } from '../../../componentes/Dialog'; // <-- CORRIGIDO
import { Textarea } from '../../../componentes/Textarea'; // <-- CORRIGIDO
import { cores } from '../../../tema/cores'; // <-- CORRIGIDO

// Mock de dados
const MOCK_DATA = {
    1: { 
        subject: { id: 1, nome: 'Matemática', descricao: 'Álgebra e Geometria' },
        flashcards: [
            { id: 101, pergunta: 'O que é 2+2?', resposta: '4', materiaId: 1 },
            { id: 102, pergunta: 'O que é a fórmula de Bhaskara?', resposta: 'x = [-b ± sqrt(b² - 4ac)] / 2a', materiaId: 1 },
        ]
    },
    2: {
        subject: { id: 2, nome: 'História', descricao: 'História do Brasil' },
        flashcards: [
            { id: 103, pergunta: 'Quem descobriu o Brasil?', resposta: 'Pedro Álvares Cabral', materiaId: 2 },
        ]
    }
};

export default function TelaFlashcards() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id: subjectId } = params;
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? cores.dark : cores.light;

  const [subject, setSubject] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Form loading
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [formData, setFormData] = useState({ pergunta: '', resposta: '' });
  const [flippedCards, setFlippedCards] = useState(new Set());

  useEffect(() => {
    setIsPageLoading(true);
    setTimeout(() => {
        // Encontra os dados no mock. O `|| {}` evita crash se o ID não existir.
        const data = MOCK_DATA[subjectId] || { subject: { nome: 'Não encontrado' }, flashcards: [] };
        setSubject(data.subject);
        setFlashcards(data.flashcards);
        setIsPageLoading(false);
    }, 500);
  }, [subjectId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 300)); 
    try {
      if (editingFlashcard) {
        setFlashcards(prev =>
          prev.map(f =>
            f.id === editingFlashcard.id ? { ...f, ...formData } : f,
          ),
        );
      } else {
        const newFlashcard = {
          ...formData,
          id: Math.random(),
          materiaId: Number(subjectId),
        };
        setFlashcards(prev => [...prev, newFlashcard]);
      }
      setIsDialogOpen(false);
      setFormData({ pergunta: '', resposta: '' });
      setEditingFlashcard(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o flashcard.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Excluir Flashcard', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setFlashcards(prev => prev.filter(f => f.id !== id));
        },
      },
    ]);
  };

  const openEditDialog = (flashcard) => {
    setEditingFlashcard(flashcard);
    setFormData({ pergunta: flashcard.pergunta, resposta: flashcard.resposta });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingFlashcard(null);
    setFormData({ pergunta: '', resposta: '' });
    setIsDialogOpen(true);
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isPageLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={theme.foreground} size={24} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.foreground }]} numberOfLines={1}>{subject?.nome}</Text>
            <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
              Flashcards para revisão
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
              {editingFlashcard ? 'Editar Flashcard' : 'Novo Flashcard'}
            </Text>
            <View style={styles.form}>
              <Text style={[styles.label, { color: theme.foreground }]}>Pergunta</Text>
              <Textarea
                value={formData.pergunta}
                onChangeText={(t) => setFormData({ ...formData, pergunta: t })}
                placeholder="Digite a pergunta"
              />
              <Text style={[styles.label, { color: theme.foreground }]}>Resposta</Text>
              <Textarea
                value={formData.resposta}
                onChangeText={(t) => setFormData({ ...formData, resposta: t })}
                placeholder="Digite a resposta"
              />
              <View style={styles.dialogActions}>
                <Botao variant="destructive" onPress={() => setIsDialogOpen(false)}>
                  Cancelar
                </Botao>
                <Botao onPress={handleSubmit} disabled={isLoading}>
                  {isLoading ? <ActivityIndicator color={theme.primaryForeground} /> : (editingFlashcard ? 'Salvar' : 'Criar')}
                </Botao>
              </View>
            </View>
          </View>
        </Dialog>

        {flashcards.length === 0 ? (
           <Card>
            <CardContent style={styles.emptyState}>
              <FlipHorizontal color={theme.mutedForeground} size={48} />
              <Text style={[styles.emptyTitle, { color: theme.foreground }]}>
                Nenhum flashcard cadastrado
              </Text>
              <Botao onPress={openCreateDialog}>
                <Plus size={16} color="#FFF" style={{ marginRight: 8 }} />
                Criar Primeiro Flashcard
              </Botao>
            </CardContent>
          </Card>
        ) : (
          <View style={styles.grid}>
            {flashcards.map((flashcard) => (
              <Card key={flashcard.id} style={styles.card}>
                <CardHeader>
                  <View style={styles.cardTitleRow}>
                    <CardTitle style={{ flex: 1, color: theme.foreground }}>
                      {flippedCards.has(flashcard.id) ? 'Resposta' : 'Pergunta'}
                    </CardTitle>
                    <TouchableOpacity onPress={() => openEditDialog(flashcard)}>
                      <Edit color={theme.mutedForeground} size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(flashcard.id)}>
                      <Trash2 color={theme.destructive} size={18} />
                    </TouchableOpacity>
                  </View>
                </CardHeader>
                <CardContent style={{ gap: 16 }}>
                  <Text style={[styles.flashcardText, { color: theme.foreground }]}>
                    {flippedCards.has(flashcard.id) ? flashcard.resposta : flashcard.pergunta}
                  </Text>
                  <Botao variant="outline" onPress={() => toggleFlip(flashcard.id)}>
                    <FlipHorizontal size={16} color={theme.foreground} style={{ marginRight: 8 }} />
                    Virar Card
                  </Botao>
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
    alignItems: 'center',
    gap: 16,
  },
  title: { fontSize: 24, fontWeight: '700', flexShrink: 1 },
  subtitle: { fontSize: 14 },
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
  flashcardText: {
    minHeight: 80,
    fontSize: 16,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: '600' },
  dialogTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 20,
  },
});