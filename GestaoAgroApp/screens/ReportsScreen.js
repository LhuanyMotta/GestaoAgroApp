import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { styles as appStyles, colors } from '../utils/theme';
import { DataContext } from '../context/DataContext';

const ReportsScreen = () => {
  const { animals, healthRecords, productionRecords } = useContext(DataContext);
  const [selectedChart, setSelectedChart] = useState('bar');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('animal');
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const reports = [
    { id: '1', title: 'Total de Animais', value: animals.length.toString(), type: 'animal' },
    { id: '2', title: 'Registros de Saúde', value: healthRecords.length.toString(), type: 'health' },
    { id: '3', title: 'Registros de Produção', value: productionRecords.length.toString(), type: 'production' },
  ];

  const chartData = {
    labels: ['Animais', 'Saúde', 'Produção'],
    datasets: [
      {
        data: [animals.length, healthRecords.length, productionRecords.length],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  const applyFilter = () => {
    if (searchTerm === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter((report) => {
        return report.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredReports(filtered);
    }
  };

  const handleDataPointClick = (data) => {
    setSelectedDataPoint(data);
    Alert.alert(
      'Detalhes do Gráfico',
      `Categoria: ${chartData.labels[data.index]}\nValor: ${data.value}`,
      [{ text: 'OK', onPress: () => setSelectedDataPoint(null) }]
    );
  };

  const renderChart = () => {
    const chartConfig = {
      backgroundColor: '#FFFFFF', // Fundo branco
      backgroundGradientFrom: '#FFFFFF', // Gradiente inicial branco
      backgroundGradientTo: '#FFFFFF', // Gradiente final branco
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde para as barras e textos
      labelColor: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde para os rótulos
      style: {
        borderRadius: 16,
        
      },
      
      propsForDots: {
        r: '8',
        strokeWidth: '4',
        stroke: 'green', 
      },
    
   
    };

    if (selectedChart === 'bar') {
      return (
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          style={{
            marginVertical: 20,
            borderRadius: 12,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
           
           
          }}
    
          fromZero
          onDataPointClick={handleDataPointClick}
        />
      );
    } else {
      return (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 20,
            borderRadius: 10,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
          }}
          onDataPointClick={handleDataPointClick}
        />
      );
    }
  };

  const ReportCard = ({ title, value }) => {
    return (
      <View style={cardStyles.card}>
        <Text style={cardStyles.cardTitle}>{title}</Text>
        <Text style={cardStyles.cardValue}>{value}</Text>
      </View>
    );
  };

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    cardValue: {
      fontSize: 16,
      color: '#666',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite para filtrar..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={applyFilter}
        >
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterType === 'animal' && styles.filterOptionActive,
          ]}
          onPress={() => setFilterType('animal')}
        >
          <Text style={styles.filterOptionText}>Animais</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterType === 'health' && styles.filterOptionActive,
          ]}
          onPress={() => setFilterType('health')}
        >
          <Text style={styles.filterOptionText}>Saúde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterType === 'production' && styles.filterOptionActive,
          ]}
          onPress={() => setFilterType('production')}
        >
          <Text style={styles.filterOptionText}>Produção</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredReports.length > 0 ? filteredReports : reports.filter((report) => report.type === filterType)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReportCard title={item.title} value={item.value} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.chartToggleContainer}>
        <TouchableOpacity
          style={[
            styles.chartToggleButton,
            selectedChart === 'bar' && styles.activeButton,
          ]}
          onPress={() => setSelectedChart('bar')}
        >
          <Text style={styles.chartToggleText}>Gráfico de Barras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chartToggleButton,
            selectedChart === 'line' && styles.activeButton,
          ]}
          onPress={() => setSelectedChart('line')}
        >
          <Text style={styles.chartToggleText}>Gráfico de Linha</Text>
        </TouchableOpacity>
      </View>

      {renderChart()}

      {selectedDataPoint && (
        <View style={styles.dataPointContainer}>
          <Text style={styles.dataPointText}>
            Categoria: {chartData.labels[selectedDataPoint.index]}
          </Text>
          <Text style={styles.dataPointText}>
            Valor: {selectedDataPoint.value}
          </Text>
        </View>
      )}
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterOption: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: colors.primary,
  
  },
  filterOptionText: {
    fontSize: 16,
    color: colors.darkGray,
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
  dataPointContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    alignItems: 'center',
  },
  dataPointText: {
    fontSize: 16,
    color: colors.darkGray,
  },
});

export default ReportsScreen;