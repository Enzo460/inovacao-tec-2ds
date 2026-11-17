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
  // Estados para armazenar o texto da nova tarefa e a lista de tarefas
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([
    { id: '1', texto: 'Criar wireframe no Figma', concluida: false },
    { id: '2', texto: 'Modelar banco de dados', concluida: false },
  ]);

const item = {
      id: Date.now().toString(),
      texto: novaTarefa,
      concluida: false,
      prioridade: 'alta', // Define 'alta' para teste ou 'normal'
    };

  // Função para adicionar uma nova tarefa à lista
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const item = {
      id: Date.now().toString(),
      texto: novaTarefa,
      concluida: false,
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
 // --- INÍCIO DO INCREMENTO: Estado e Lógica do Filtro ---
  const [filtro, setFiltro] = useState('todas'); // Opções: 'todas', 'pendentes', 'concluidas'

  // Função para filtrar as tarefas dinamicamente antes de exibir na FlatList
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true; // Se for 'todas'
  });
  // --- FIM DO INCREMENTO —

  // Função para remover uma tarefa da lista
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🚀 Gestor de Tarefas Escolar</Text>
      <Text style={styles.subtitulo}>
        Acompanhe suas entregas de software
      </Text>

      <Text style={styles.contador}>
         Total de tarefas: {tarefas.lenght}
         </Text>

      {/* Área de entrada de dados */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
         {/* --- INÍCIO DO INCREMENTO: Botões de Filtro --- */}
      <View style={styles.filtroContainer}>
        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'todas' && styles.filtroAtivo]}
          onPress={() => setFiltro('todas')}>
          <Text style={[styles.textoFiltro, filtro === 'todas' && styles.textoFiltroAtivo]}>Todas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'pendentes' && styles.filtroAtivo]}
          onPress={() => setFiltro('pendentes')}>
          <Text style={[styles.textoFiltro, filtro === 'pendentes' && styles.textoFiltroAtivo]}>Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'concluidas' && styles.filtroAtivo]}
          onPress={() => setFiltro('concluidas')}>
          <Text style={[styles.textoFiltro, filtro === 'concluidas' && styles.textoFiltroAtivo]}>Concluídas</Text>
        </TouchableOpacity>
      </View>
      {/* --- FIM DO INCREMENTO --- */}


        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>

  <View style={[
            styles.cardTarefa,
            { borderLeftColor: item.prioridade === 'alta' ? '#EF4444' : '#2563EB' }
          ]}>


      {/* Lista de tarefas */}
      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardTarefa}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => alternarConcluida(item.id)}
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida && styles.textoConcluido,
                ]}
              >
                {item.concluida ? '✅ ' : '⏳ '}
                {item.texto}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.textoRemover}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Estilização do Aplicativo (CSS-in-JS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: 10,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardTarefa: {
    backgroundColor: 'lightyellow',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'orange',
  },
  textoTarefa: {
    fontSize: 16,
    color: '#334155',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
   // --- INÍCIO DO INCREMENTO: Estilos do Filtro ---
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  botaoFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  filtroAtivo: {
    backgroundColor: '#2563EB',
  },
  textoFiltro: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#64748B',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
  },
  // --- FIM DO INCREMENTO —

  textoRemover: {
    fontSize: 18,
    paddingLeft: 10,
  },
contador: {
 fontsize: 15,
 fontweight: 'bold',
 color: 'lightgreen',
 textalign: 'center',
 marginBottom: 15,
}
});
