import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import Input from '../utils/Input';
import Button from '../utils/button';
import { styles } from '../utils/theme';

const validationSchema = Yup.object().shape({
  vacina: Yup.string().required('Vacina é obrigatória'),
  dataVacina: Yup.string()
    .required('Data da vacina é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
  tratamento: Yup.string().required('Tratamento é obrigatório'),
});

const HealthForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ vacina: '', dataVacina: '', tratamento: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Input
            placeholder="Vacina"
            onChangeText={handleChange('vacina')}
            onBlur={handleBlur('vacina')}
            value={values.vacina}
            error={touched.vacina && errors.vacina}
          />
          <Input
            placeholder="Data da Vacina (DD/MM/AAAA)"
            onChangeText={handleChange('dataVacina')}
            onBlur={handleBlur('dataVacina')}
            value={values.dataVacina}
            error={touched.dataVacina && errors.dataVacina}
          />
          <Input
            placeholder="Tratamento"
            onChangeText={handleChange('tratamento')}
            onBlur={handleBlur('tratamento')}
            value={values.tratamento}
            error={touched.tratamento && errors.tratamento}
          />
          <Button title="Salvar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default HealthForm;