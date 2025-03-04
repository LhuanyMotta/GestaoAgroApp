import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import ReportCard from '../components/ReportCard';
import { styles as appStyles, colors } from '../utils/theme';
import { DataContext } from '../context/DataContext';

const ReportsScreen = () => {
  const { animals, healthRecords, productionRecords } = useContext(DataContext);
  const [selectedChart, setSelectedChart] = useState('bar'); // Estado para alternar entre gráficos

  // Dados para os cards de relatório
  const reports = [
    { id: '1', title: 'Total de Animais', value: animals.length.toString() },
    { id: '2', title: 'Registros de Saúde', value: healthRecords.length.toString() },
    { id: '3', title: 'Registros de Produção', value: productionRecords.length.toString() },
  ];

  // Dados para o gráfico de barras e linha
  const chartData = {
    labels: ['Animais', 'Saúde', 'Produção'],
    datasets: [
      {
        data: [animals.length, healthRecords.length, productionRecords.length],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Cor das barras/linhas
        strokeWidth: 2, // Espessura da linha (para LineChart)
      },
    ],
  };

  // Largura da tela para o gráfico
  const screenWidth = Dimensions.get('window').width;

  // Função para renderizar o gráfico selecionado
  const renderChart = () => {
    if (selectedChart === 'bar') {
      return (
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: colors.primary,
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.secondary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.secondary,
            },
          }}
          style={{
            marginVertical: 20,
            borderRadius: 10,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
        />
      );
    } else {
      return (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: colors.primary,
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.secondary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.secondary,
            },
          }}
          bezier // Suaviza a linha
          style={{
            marginVertical: 20,
            borderRadius: 10,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      {/* Lista de cards de relatório */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReportCard title={item.title} value={item.value} />}
        contentContainerStyle={{ paddingBottom: 20 }} // Espaçamento abaixo da lista
      />

      {/* Botões para alternar entre gráficos */}
      <View style={styles.chartToggleContainer}>
        <TouchableOpacity
          style={[styles.chartToggleButton, selectedChart === 'bar' && styles.activeButton]}
          onPress={() => setSelectedChart('bar')}
        >
          <Text style={styles.chartToggleText}>Gráfico de Barras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chartToggleButton, selectedChart === 'line' && styles.activeButton]}
          onPress={() => setSelectedChart('line')}
        >
          <Text style={styles.chartToggleText}>Gráfico de Linha</Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza o gráfico selecionado */}
      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  chartToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  chartToggleButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  chartToggleText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;