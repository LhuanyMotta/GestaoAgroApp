import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import Input from '../utils/Input';
import Button from '../utils/button';
import { styles } from '../utils/theme';

const validationSchema = Yup.object().shape({
  leite: Yup.number()
    .required('Produção de leite é obrigatória')
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
});

const ProductionForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ leite: '', ganhoPeso: '', dataProducao: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Input
            placeholder="Produção de Leite (litros)"
            onChangeText={handleChange('leite')}
            onBlur={handleBlur('leite')}
            value={values.leite}
            keyboardType="numeric"
            error={touched.leite && errors.leite}
          />
          <Input
            placeholder="Ganho de Peso (kg)"
            onChangeText={handleChange('ganhoPeso')}
            onBlur={handleBlur('ganhoPeso')}
            value={values.ganhoPeso}
            keyboardType="numeric"
            error={touched.ganhoPeso && errors.ganhoPeso}
          />
          <Input
            placeholder="Data de Produção (DD/MM/AAAA)"
            onChangeText={handleChange('dataProducao')}
            onBlur={handleBlur('dataProducao')}
            value={values.dataProducao}
            error={touched.dataProducao && errors.dataProducao}
          />
          <Button title="Salvar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ProductionForm;