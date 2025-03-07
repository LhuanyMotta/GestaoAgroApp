import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../context/DataContext';
import Input from '../utils/Input';
import Button from '../utils/button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  productionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  filterOption: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: '#2E7D32',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

const validationSchema = Yup.object().shape({
  leite: Yup.number()
    .nullable()
    .positive('Valor deve ser positivo'),
  ganhoPeso: Yup.number()
    .required('Ganho de peso é obrigatório')
    .positive('Valor deve ser positivo'),
  dataProducao: Yup.string()
    .required('Data de produção é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
  tipoAnimal: Yup.string().required('Tipo de animal é obrigatório'),
});

const ProductionScreen = () => {
  const { productionRecords, addProductionRecord } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tipoAnimal');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const applyFilter = () => {
    if (searchTerm === '') {
      setFilteredRecords([]);
      setIsFilterApplied(false);
    } else {
      const filtered = productionRecords.filter((record) => {
        switch (filterType) {
          case 'tipoAnimal':
            return record.tipoAnimal.toLowerCase().includes(searchTerm.toLowerCase());
          case 'dataProducao':
            return record.dataProducao.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return false;
        }
      });
      setFilteredRecords(filtered);
      setIsFilterApplied(true);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await addProductionRecord(values);
      Alert.alert('Sucesso', 'Registro de produção salvo com sucesso!');
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o registro de produção. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar Novo Registro de Produção</Text>
          <Formik
            initialValues={{ leite: '', ganhoPeso: '', dataProducao: '', tipoAnimal: '', producaoLeite: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
              <View>
                <Input
                  placeholder="Produção de Leite (litros)"
                  onChangeText={handleChange('leite')}
                  onBlur={handleBlur('leite')}
                  value={values.leite}
                  keyboardType="numeric"
                  error={touched.leite && errors.leite}
                  icon="local-drink"
                />
                <Input
                  placeholder="Ganho de Peso (kg)"
                  onChangeText={handleChange('ganhoPeso')}
                  onBlur={handleBlur('ganhoPeso')}
                  value={values.ganhoPeso}
                  keyboardType="numeric"
                  error={touched.ganhoPeso && errors.ganhoPeso}
                  icon="fitness-center"
                />
                <Input
                  placeholder="Data de Produção (DD/MM/AAAA)"
                  onChangeText={handleChange('dataProducao')}
                  onBlur={handleBlur('dataProducao')}
                  value={values.dataProducao}
                  error={touched.dataProducao && errors.dataProducao}
                  icon="event"
                />
                <Input
                  placeholder="Tipo de Animal (ex: Bovino, Caprino)"
                  onChangeText={handleChange('tipoAnimal')}
                  onBlur={handleBlur('tipoAnimal')}
                  value={values.tipoAnimal}
                  error={touched.tipoAnimal && errors.tipoAnimal}
                  icon="pets"
                />

                <View style={styles.switchContainer}>
                  <Switch
                    value={values.producaoLeite}
                    onValueChange={(value) => setFieldValue('producaoLeite', value)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={values.producaoLeite ? '#2E7D32' : '#f4f3f4'}
                  />
                  <Text style={styles.switchLabel}>Animal de produção de leite</Text>
                </View>

                <Button
                  title={isSubmitting ? 'Salvando...' : 'Salvar Registro'}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                  disabled={!isValid || isSubmitting}
                />
              </View>
            )}
          </Formik>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Filtrar Registros de Produção</Text>
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Digite o ${filterType === 'tipoAnimal' ? 'tipo de animal' : 'data de produção'}`}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={applyFilter}
            >
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'tipoAnimal' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('tipoAnimal')}
            >
              <Text style={styles.filterOptionText}>Tipo de Animal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'dataProducao' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('dataProducao')}
            >
              <Text style={styles.filterOptionText}>Data de Produção</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isFilterApplied && (
          <View style={styles.card}>
            <Text style={styles.title}>Histórico de Produção</Text>
            <Text style={styles.description}>
              Aqui você pode acompanhar o histórico de produção dos seus animais.
            </Text>

            {filteredRecords.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum registro de produção encontrado.</Text>
            ) : (
              filteredRecords.map((record, index) => (
                <View key={index} style={styles.productionItem}>
                  <Text style={styles.itemTitle}>Tipo de Animal: {record.tipoAnimal}</Text>
                  {record.producaoLeite && (
                    <Text style={styles.itemDetail}>Produção de Leite: {record.leite} litros</Text>
                  )}
                  <Text style={styles.itemDetail}>Ganho de Peso: {record.ganhoPeso} kg</Text>
                  <Text style={styles.itemDetail}>Data de Produção: {record.dataProducao}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductionScreen;