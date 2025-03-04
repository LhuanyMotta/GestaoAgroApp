import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [productionRecords, setProductionRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const savedAnimals = await AsyncStorage.getItem('animals');
      const savedHealth = await AsyncStorage.getItem('healthRecords');
      const savedProduction = await AsyncStorage.getItem('productionRecords');

      if (savedAnimals) setAnimals(JSON.parse(savedAnimals));
      if (savedHealth) setHealthRecords(JSON.parse(savedHealth));
      if (savedProduction) setProductionRecords(JSON.parse(savedProduction));
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

  const clearData = async () => {
    await AsyncStorage.clear();
    setAnimals([]);
    setHealthRecords([]);
    setProductionRecords([]);
  };

  return (
    <DataContext.Provider
      value={{
        animals,
        healthRecords,
        productionRecords,
        loading,
        addAnimal,
        addHealthRecord,
        addProductionRecord,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};