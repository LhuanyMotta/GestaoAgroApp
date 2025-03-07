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
  sexoContainer: {
    marginBottom: 20,
  },
  sexoLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.darkGray,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: colors.primary,
  },
  radioButtonText: {
    fontSize: 16,
    color: colors.darkGray,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
  },
});

export default CadastroAnimal;