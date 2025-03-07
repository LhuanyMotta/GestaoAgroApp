import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './context/DataContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CadastroAnimal from './screens/CadastroAnimal';
import HealthScreen from './screens/HealthScreen';
import ProductionScreen from './screens/ProductionScreen';
import ReportsScreen from './screens/ReportsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registro' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastroAnimal"
            component={CadastroAnimal}
            options={{ title: 'Cadastro de Animal' }}
          />
          <Stack.Screen
            name="HealthScreen"
            component={HealthScreen}
            options={{ title: 'Controle de Saúde' }}
          />
          <Stack.Screen
            name="ProductionScreen"
            component={ProductionScreen}
            options={{ title: 'Gestão de Produção' }}
          />
          <Stack.Screen
            name="ReportsScreen"
            component={ReportsScreen}
            options={{ title: 'Relatórios' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}