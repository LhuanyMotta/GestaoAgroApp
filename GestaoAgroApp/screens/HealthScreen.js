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
});

export default HealthScreen;