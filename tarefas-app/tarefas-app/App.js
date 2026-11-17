import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function App() {
  // Estados para armazenar o texto da nova tarefa, a lista e o filtro ativo
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas'); // Opções: 'todas', 'pendentes', 'concluidas'
  const [tarefas, setTarefas] = useState([
    { id: '1', texto: 'Criar wireframe no Figma', concluida: false, prioridade: 'alta' },
    { id: '2', texto: 'Modelar banco de dados', concluida: false, prioridade: 'normal' },
  ]);

  // Função para adicionar uma nova tarefa à lista
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const item = {
      id: Date.now().toString(),
      texto: novaTarefa,
      concluida: false,
      prioridade: 'normal', // Pode ser alterado para 'alta' conforme sua regra
    };

    setTarefas([...tarefas, item]);
    setNovaTarefa('');
  };

  // Função para alternar o status de concluído da tarefa
  const alternarConcluida = (id) => {
    const tarefasAtualizadas = tarefas.map((t) => {
      if (t.id === id) {
        return { ...t, concluida: !t.concluida };
      }
      return t;
    });
    setTarefas(tarefasAtualizadas);
  };

  // Função para remover uma tarefa da lista
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  // Filtra as tarefas dinamicamente antes de exibir na FlatList
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🚀 Gestor de Tarefas Escolar</Text>
      <Text style={styles.subtitulo}>Organize suas atividades e entregas</Text>

      {/* Área de entrada de nova tarefa */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botões de Filtro */}
      <View style={styles.filtrosContainer}>
        {['todas', 'pendentes', 'concluidas'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.botaoFiltro, filtro === tipo && styles.botaoFiltroAtivo]}
            onPress={() => setFiltro(tipo)}
          >
            <Text style={[styles.textoFiltro, filtro === tipo && styles.textoFiltroAtivo]}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.textoContainer}
              onPress={() => alternarConcluida(item.id)}
            >
              <Text style={[styles.itemTexto, item.concluida && styles.itemConcluido]}>
                {item.texto}
              </Text>
              {item.prioridade === 'alta' && (
                <Text style={styles.badgePrioridade}>Prioridade Alta</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.botaoRemover}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 16,
  },
  botaoAdicionar: {
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: 10,
    borderRadius: 8,
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botaoFiltro: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#2563EB',
  },
  textoFiltro: {
    color: '#475569',
    fontWeight: '600',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoContainer: {
    flex: 1,
  },
  itemTexto: {
    fontSize: 16,
    color: '#1E293B',
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  badgePrioridade: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: 'bold',
    marginTop: 4,
  },
  botaoRemover: {
    fontSize: 18,
    marginLeft: 10,
  },
});
