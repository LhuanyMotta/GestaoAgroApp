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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../context/DataContext';
import Input from '../utils/Input';
import Button from '../utils/button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const validationSchema = Yup.object().shape({
  codigoBrinco: Yup.string()
    .required('Código do Brinco é obrigatório')
    .min(3, 'Código do Brinco deve ter pelo menos 3 caracteres'),
  raca: Yup.string().required('Raça é obrigatória'),
  peso: Yup.number()
    .required('Peso é obrigatório')
    .positive('Peso deve ser um número positivo'),
  sexo: Yup.string().required('Sexo é obrigatório'),
  idade: Yup.number()
    .required('Idade é obrigatória')
    .positive('Idade deve ser um número positivo')
    .integer('Idade deve ser um número inteiro'),
});

const CadastroAnimal = () => {
  const { animals, addAnimal } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('codigoBrinco'); // Filtro padrão: código do brinco
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Função para aplicar o filtro
  const applyFilter = () => {
    if (searchTerm === '') {
      setFilteredAnimals([]);
      setIsFilterApplied(false);
    } else {
      const filtered = animals.filter((animal) => {
        switch (filterType) {
          case 'codigoBrinco':
            return animal.codigoBrinco.toLowerCase().includes(searchTerm.toLowerCase());
          case 'raca':
            return animal.raca.toLowerCase().includes(searchTerm.toLowerCase());
          case 'sexo':
            return animal.sexo.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return false;
        }
      });
      setFilteredAnimals(filtered);
      setIsFilterApplied(true);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await addAnimal(values);
      Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o animal. Tente novamente.');
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
        {/* Formulário de Cadastro de Animal */}
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar Novo Animal</Text>
          <Formik
            initialValues={{ codigoBrinco: '', raca: '', peso: '', sexo: '', idade: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
              <View>
                <Input
                  placeholder="Código do Brinco"
                  onChangeText={handleChange('codigoBrinco')}
                  onBlur={handleBlur('codigoBrinco')}
                  value={values.codigoBrinco}
                  error={touched.codigoBrinco && errors.codigoBrinco}
                  icon="pets"
                />
                <Input
                  placeholder="Raça do Animal"
                  onChangeText={handleChange('raca')}
                  onBlur={handleBlur('raca')}
                  value={values.raca}
                  error={touched.raca && errors.raca}
                  icon="pets"
                />
                <Input
                  placeholder="Peso do Animal"
                  onChangeText={handleChange('peso')}
                  onBlur={handleBlur('peso')}
                  value={values.peso}
                  keyboardType="numeric"
                  error={touched.peso && errors.peso}
                  icon="fitness-center"
                />
                <Input
                  placeholder="Idade do Animal"
                  onChangeText={handleChange('idade')}
                  onBlur={handleBlur('idade')}
                  value={values.idade}
                  keyboardType="numeric"
                  error={touched.idade && errors.idade}
                  icon="calendar-today"
                />

                {/* Campo de Sexo com Radio Buttons */}
                <View style={styles.sexoContainer}>
                  <Text style={styles.sexoLabel}>Sexo do Animal:</Text>
                  <View style={styles.radioGroup}>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        values.sexo === 'Macho' && styles.radioButtonActive,
                      ]}
                      onPress={() => setFieldValue('sexo', 'Macho')}
                    >
                      <Text style={styles.radioButtonText}>Macho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        values.sexo === 'Fêmea' && styles.radioButtonActive,
                      ]}
                      onPress={() => setFieldValue('sexo', 'Fêmea')}
                    >
                      <Text style={styles.radioButtonText}>Fêmea</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.sexo && errors.sexo && (
                    <Text style={styles.error}>{errors.sexo}</Text>
                  )}
                </View>

                <Button
                  title={isSubmitting ? 'Salvando...' : 'Cadastrar Animal'}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                  disabled={!isValid || isSubmitting}
                />
              </View>
            )}
          </Formik>
        </View>

        {/* Filtro de Animais */}
        <View style={styles.card}>
          <Text style={styles.title}>Filtrar Animais</Text>
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Digite o ${filterType === 'codigoBrinco' ? 'código do brinco' : filterType === 'raca' ? 'raça' : 'sexo'} do animal`}
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
                filterType === 'codigoBrinco' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('codigoBrinco')}
            >
              <Text style={styles.filterOptionText}>Código do Brinco</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'raca' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('raca')}
            >
              <Text style={styles.filterOptionText}>Raça</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterType === 'sexo' && styles.filterOptionActive,
              ]}
              onPress={() => setFilterType('sexo')}
            >
              <Text style={styles.filterOptionText}>Sexo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Animais Filtrados */}
        {isFilterApplied && (
          <View style={styles.card}>
            <Text style={styles.title}>Animais Cadastrados</Text>
            {filteredAnimals.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum animal encontrado.</Text>
            ) : (
              filteredAnimals.map((animal, index) => (
                <View key={index} style={styles.animalItem}>
                  <Text style={styles.itemTitle}>Código do Brinco: {animal.codigoBrinco}</Text>
                  <Text style={styles.itemRaca}>Raça: {animal.raca}</Text>
                  <Text style={styles.itemSexo}>Sexo: {animal.sexo}</Text>
                  <Text style={styles.itemPeso}>Peso: {animal.peso} kg</Text>
                  <Text style={styles.itemIdade}>Idade: {animal.idade} anos</Text>
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
    color: '#2E7D32',
  },
  animalItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemRaca: {
    fontSize: 14,
    color: '#666',
  },
  itemSexo: {
    fontSize: 14,
    color: '#666',
  },
  itemPeso: {
    fontSize: 14,
    color: '#666',
  },
  itemIdade: {
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
  sexoContainer: {
    marginBottom: 20,
  },
  sexoLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: '#2E7D32',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CadastroAnimal;