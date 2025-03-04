import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../context/DataContext';
import Input from '../utils/Input';
import Button from '../utils/button';
import { styles as globalStyles, colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const validationSchema = Yup.object().shape({
  vacina: Yup.string().required('Vacina é obrigatória'),
  dataVacina: Yup.string()
    .required('Data da vacina é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
  observacoes: Yup.string().optional(),
});

const HealthScreen = () => {
  const { healthRecords, addHealthRecord } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('vacina'); // Estado para o tipo de filtro (vacina, dataVacina, observacoes)
  const [filteredRecords, setFilteredRecords] = useState([]); // Estado para os registros filtrados
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Estado para verificar se o filtro foi aplicado

  // Função para aplicar o filtro
  const applyFilter = () => {
    if (searchTerm === '') {
      setFilteredRecords([]); // Se o termo estiver vazio, não mostra registros
      setIsFilterApplied(false);
    } else {
      const filtered = healthRecords.filter((record) => {
        switch (filterType) {
          case 'vacina':
            return record.vacina.toLowerCase().includes(searchTerm.toLowerCase());
          case 'dataVacina':
            return record.dataVacina.toLowerCase().includes(searchTerm.toLowerCase());
          case 'observacoes':
            return record.observacoes?.toLowerCase().includes(searchTerm.toLowerCase());
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
        {/* Formulário de Cadastro */}
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar Novo Registro de Saúde</Text>
          <Formik
            initialValues={{ vacina: '', dataVacina: '', observacoes: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <View>
                <Input
                  placeholder="Vacina"
                  onChangeText={handleChange('vacina')}
                  onBlur={handleBlur('vacina')}
                  value={values.vacina}
                  error={touched.vacina && errors.vacina}
                  icon="medical-services"
                />
                <Input
                  placeholder="Data da Vacina (DD/MM/AAAA)"
                  onChangeText={handleChange('dataVacina')}
                  onBlur={handleBlur('dataVacina')}
                  value={values.dataVacina}
                  error={touched.dataVacina && errors.dataVacina}
                  icon="event"
                />
                <Input
                  placeholder="Observações (opcional)"
                  onChangeText={handleChange('observacoes')}
                  onBlur={handleBlur('observacoes')}
                  value={values.observacoes}
                  error={touched.observacoes && errors.observacoes}
                  icon="notes"
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
              placeholder={`Digite o ${filterType === 'vacina' ? 'nome da vacina' : filterType === 'dataVacina' ? 'data da vacina' : 'observação'}`}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={applyFilter}
            >
              <Icon name="search" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'vacina' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('vacina')}
            >
              <Text style={styles.filterOptionText}>Vacina</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'dataVacina' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('dataVacina')}
            >
              <Text style={styles.filterOptionText}>Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'observacoes' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('observacoes')}
            >
              <Text style={styles.filterOptionText}>Observações</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Histórico de Saúde Filtrado */}
        {isFilterApplied && (
          <View style={styles.card}>
            <Text style={styles.title}>Histórico de Saúde Animal</Text>
            <Text style={styles.description}>
              Aqui você pode acompanhar o histórico de saúde dos seus animais, incluindo vacinas, tratamentos e observações.
            </Text>

            {filteredRecords.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum registro de saúde encontrado.</Text>
            ) : (
              filteredRecords.map((record, index) => (
                <View key={index} style={styles.healthItem}>
                  <Text style={styles.itemTitle}>{record.vacina}</Text>
                  <Text style={styles.itemDate}>Data: {record.dataVacina}</Text>
                  {record.observacoes && (
                    <Text style={styles.itemNotes}>Observações: {record.observacoes}</Text>
                  )}
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
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  healthItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
  },
  itemNotes: {
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
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
});

export default HealthScreen;