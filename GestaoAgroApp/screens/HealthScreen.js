import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../context/DataContext';
import Input from '../utils/Input';
import Button from '../utils/button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles as globalStyles, colors } from '../utils/theme';

const validationSchema = Yup.object().shape({
  veterinario: Yup.string().required('Veterinário é obrigatório'),
  status: Yup.string().required('Status é obrigatório'),
  apetite: Yup.string().required('Apetite é obrigatório'),
  temperatura: Yup.number()
    .required('Temperatura é obrigatória')
    .positive('Temperatura deve ser um número positivo'),
  dataVerificacao: Yup.string()
    .required('Data de verificação é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
});

const HealthScreen = () => {
  const { healthRecords, addHealthRecord } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('veterinario'); // Filtro padrão: veterinário
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Função para aplicar o filtro
  const applyFilter = () => {
    if (searchTerm === '') {
      setFilteredRecords([]);
      setIsFilterApplied(false);
    } else {
      const filtered = healthRecords.filter((record) => {
        switch (filterType) {
          case 'veterinario':
            return record.veterinario.toLowerCase().includes(searchTerm.toLowerCase());
          case 'status':
            return record.status.toLowerCase().includes(searchTerm.toLowerCase());
          case 'dataVerificacao':
            return record.dataVerificacao.toLowerCase().includes(searchTerm.toLowerCase());
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
      await addHealthRecord(values);
      Alert.alert('Sucesso', 'Registro de saúde salvo com sucesso!');
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o registro de saúde. Tente novamente.');
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
        {/* Formulário de Cadastro de Registro de Saúde */}
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar Novo Registro de Saúde</Text>
          <Formik
            initialValues={{ veterinario: '', status: '', apetite: '', temperatura: '', dataVerificacao: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <View>
                <Input
                  placeholder="Veterinário"
                  onChangeText={handleChange('veterinario')}
                  onBlur={handleBlur('veterinario')}
                  value={values.veterinario}
                  error={touched.veterinario && errors.veterinario}
                  icon="medical-services"
                />
                <Input
                  placeholder="Status"
                  onChangeText={handleChange('status')}
                  onBlur={handleBlur('status')}
                  value={values.status}
                  error={touched.status && errors.status}
                  icon="assignment"
                />
                <Input
                  placeholder="Apetite"
                  onChangeText={handleChange('apetite')}
                  onBlur={handleBlur('apetite')}
                  value={values.apetite}
                  error={touched.apetite && errors.apetite}
                  icon="restaurant"
                />
                <Input
                  placeholder="Temperatura"
                  onChangeText={handleChange('temperatura')}
                  onBlur={handleBlur('temperatura')}
                  value={values.temperatura}
                  keyboardType="numeric"
                  error={touched.temperatura && errors.temperatura}
                  icon="thermostat"
                />
                <Input
                  placeholder="Data de Verificação (DD/MM/AAAA)"
                  onChangeText={handleChange('dataVerificacao')}
                  onBlur={handleBlur('dataVerificacao')}
                  value={values.dataVerificacao}
                  error={touched.dataVerificacao && errors.dataVerificacao}
                  icon="event"
                />
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

        {/* Filtro de Registros de Saúde */}
        <View style={styles.card}>
          <Text style={styles.title}>Filtrar Registros de Saúde</Text>
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Digite o ${filterType === 'veterinario' ? 'nome do veterinário' : filterType === 'status' ? 'status' : 'data de verificação'}`}
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
                filterType === 'veterinario' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('veterinario')}
            >
              <Text style={styles.filterOptionText}>Veterinário</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'status' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('status')}
            >
              <Text style={styles.filterOptionText}>Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'dataVerificacao' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('dataVerificacao')}
            >
              <Text style={styles.filterOptionText}>Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Registros de Saúde Filtrados */}
        {isFilterApplied && (
          <View style={styles.card}>
            <Text style={styles.title}>Registros de Saúde Filtrados</Text>
            {filteredRecords.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
            ) : (
              filteredRecords.map((record, index) => (
                <View key={index} style={styles.recordItem}>
                  <Text style={styles.itemTitle}>Veterinário: {record.veterinario}</Text>
                  <Text style={styles.itemDetail}>Status: {record.status}</Text>
                  <Text style={styles.itemDetail}>Apetite: {record.apetite}</Text>
                  <Text style={styles.itemDetail}>Temperatura: {record.temperatura}°C</Text>
                  <Text style={styles.itemDetail}>Data: {record.dataVerificacao}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    color: colors.primary,
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
  recordItem: {
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
});

export default HealthScreen;