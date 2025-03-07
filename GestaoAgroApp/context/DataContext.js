import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [productionRecords, setProductionRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const savedAnimals = await AsyncStorage.getItem('animals');
      const savedHealth = await AsyncStorage.getItem('healthRecords');
      const savedProduction = await AsyncStorage.getItem('productionRecords');
      const savedUsers = await AsyncStorage.getItem('users');

      if (savedAnimals) setAnimals(JSON.parse(savedAnimals));
      if (savedHealth) setHealthRecords(JSON.parse(savedHealth));
      if (savedProduction) setProductionRecords(JSON.parse(savedProduction));
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      setLoading(false);
    };

    loadData();
  }, []);

  const saveData = async (key, data) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const addAnimal = async (animal) => {
    const newAnimals = [...animals, animal];
    setAnimals(newAnimals);
    await saveData('animals', newAnimals);
  };

  const addHealthRecord = async (record) => {
    const newRecords = [...healthRecords, record];
    setHealthRecords(newRecords);
    await saveData('healthRecords', newRecords);
  };

  const addProductionRecord = async (record) => {
    const newRecords = [...productionRecords, record];
    setProductionRecords(newRecords);
    await saveData('productionRecords', newRecords);
  };

  const addUser = async (user) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    await saveData('users', newUsers);
  };

  const clearData = async () => {
    await AsyncStorage.clear();
    setAnimals([]);
    setHealthRecords([]);
    setProductionRecords([]);
    setUsers([]);
  };

  return (
    <DataContext.Provider
      value={{
        animals,
        healthRecords,
        productionRecords,
        users,
        loading,
        addAnimal,
        addHealthRecord,
        addProductionRecord,
        addUser,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};