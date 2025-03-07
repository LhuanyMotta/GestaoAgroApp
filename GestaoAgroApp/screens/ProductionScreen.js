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
  tipoProducao: Yup.string().required('Tipo de produção é obrigatório'),
  quantidadeProduzida: Yup.string().required('Quantidade produzida é obrigatória'),
  data: Yup.string()
    .required('Data é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
});

const ProductionScreen = () => {
  const { productionRecords, addProductionRecord } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            initialValues={{ tipoProducao: '', quantidadeProduzida: '', data: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <View>
                <Input
                  placeholder="Tipo de Produção"
                  onChangeText={handleChange('tipoProducao')}
                  onBlur={handleBlur('tipoProducao')}
                  value={values.tipoProducao}
                  error={touched.tipoProducao && errors.tipoProducao}
                  icon="local-drink"
                />
                <Input
                  placeholder="Quantidade Produzida"
                  onChangeText={handleChange('quantidadeProduzida')}
                  onBlur={handleBlur('quantidadeProduzida')}
                  value={values.quantidadeProduzida}
                  error={touched.quantidadeProduzida && errors.quantidadeProduzida}
                  icon="assessment"
                />
                <Input
                  placeholder="Data (DD/MM/AAAA)"
                  onChangeText={handleChange('data')}
                  onBlur={handleBlur('data')}
                  value={values.data}
                  error={touched.data && errors.data}
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

export default ProductionScreen;