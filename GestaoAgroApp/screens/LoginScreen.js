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
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      'Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais (@$!%*?#&)'
    )
    .required('Senha é obrigatória'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { users } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      const user = users.find((u) => u.email === values.email && u.senha === values.senha);
      if (user) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
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
        <Icon name="pets" size={50} color={colors.primary} />
        <Text style={styles.appName}>GestãoAgro</Text>
        <Text style={styles.welcomeText}>Bem-vindo ao sistema de gestão agropecuária</Text>
      </View>

      <View style={styles.card}>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View>
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
                placeholder="Senha"
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                error={touched.senha && errors.senha}
                secureTextEntry
                icon="lock"
              />
              <Button
                title={isSubmitting ? 'Entrando...' : 'Entrar'}
                onPress={handleSubmit}
                style={{ marginTop: 20 }}
                disabled={!isValid || isSubmitting}
              />
              <Button
                title="Registrar"
                onPress={() => navigation.navigate('Register')}
                style={{ marginTop: 10, backgroundColor: colors.secondary }}
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

export default LoginScreen;