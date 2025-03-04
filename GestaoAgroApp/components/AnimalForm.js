import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import Input from '../utils/Input';
import Button from '../utils/button';
import { styles } from '../utils/theme';

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  peso: Yup.number()
    .required('Peso é obrigatório')
    .positive('Peso deve ser um número positivo'),
  raca: Yup.string().required('Raça é obrigatória'),
  dataNascimento: Yup.string()
    .required('Data de nascimento é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
});

const AnimalForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ nome: '', peso: '', raca: '', dataNascimento: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Input
            placeholder="Nome do Animal"
            onChangeText={handleChange('nome')}
            onBlur={handleBlur('nome')}
            value={values.nome}
            error={touched.nome && errors.nome}
          />
          <Input
            placeholder="Peso do Animal"
            onChangeText={handleChange('peso')}
            onBlur={handleBlur('peso')}
            value={values.peso}
            keyboardType="numeric"
            error={touched.peso && errors.peso}
          />
          <Input
            placeholder="Raça do Animal"
            onChangeText={handleChange('raca')}
            onBlur={handleBlur('raca')}
            value={values.raca}
            error={touched.raca && errors.raca}
          />
          <Input
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            onChangeText={handleChange('dataNascimento')}
            onBlur={handleBlur('dataNascimento')}
            value={values.dataNascimento}
            error={touched.dataNascimento && errors.dataNascimento}
          />
          <Button title="Salvar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default AnimalForm;