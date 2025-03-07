import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../utils/Input';
import Button from '../utils/button';
import { styles as globalStyles, colors } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DataContext } from '../context/DataContext';

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Nome completo é obrigatório'),
  nomeUsuario: Yup.string().required('Nome de usuário é obrigatório'),
  senha: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      'Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais (@$!%*?#&)'
    )
    .required('Senha é obrigatória'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 123.456.789-00'),
  dataNascimento: Yup.string()
    .required('Data de nascimento é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
  endereco: Yup.string().required('Endereço é obrigatório'),
});

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { addUser } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (values) => {
    setIsSubmitting(true);
    try {
      await addUser(values);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar usuário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Icon name="person-add" size={50} color={colors.primary} />
        <Text style={styles.appName}>GestãoAgro</Text>
        <Text style={styles.welcomeText}>Registre-se para começar</Text>
      </View>

      <View style={styles.card}>
        <Formik
          initialValues={{ nomeCompleto: '', nomeUsuario: '', senha: '', email: '', cpf: '', dataNascimento: '', endereco: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View>
              <Input
                placeholder="Nome Completo"
                onChangeText={handleChange('nomeCompleto')}
                onBlur={handleBlur('nomeCompleto')}
                value={values.nomeCompleto}
                error={touched.nomeCompleto && errors.nomeCompleto}
                icon="person"
              />
              <Input
                placeholder="Nome de Usuário"
                onChangeText={handleChange('nomeUsuario')}
                onBlur={handleBlur('nomeUsuario')}
                value={values.nomeUsuario}
                error={touched.nomeUsuario && errors.nomeUsuario}
                icon="person-outline"
              />
              <Input
                placeholder="Senha"
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                error={touched.senha && errors.senha}
                secureTextEntry
                icon="lock"
              />
              <Input
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
                keyboardType="email-address"
                icon="email"
              />
              <Input
                placeholder="CPF (123.456.789-00)"
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                value={values.cpf}
                error={touched.cpf && errors.cpf}
                icon="assignment-ind"
              />
              <Input
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                value={values.dataNascimento}
                error={touched.dataNascimento && errors.dataNascimento}
                icon="calendar-today"
              />
              <Input
                placeholder="Endereço"
                onChangeText={handleChange('endereco')}
                onBlur={handleBlur('endereco')}
                value={values.endereco}
                error={touched.endereco && errors.endereco}
                icon="home"
              />
              <Button
                title={isSubmitting ? 'Registrando...' : 'Registrar'}
                onPress={handleSubmit}
                style={{ marginTop: 20 }}
                disabled={!isValid || isSubmitting}
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RegisterScreen;