import AsyncStorage from '@react-native-async-storage/async-storage';


{/*  asyncStorage.ts - A simple wrapper around AsyncStorage to handle JSON serialization and error handling for storing, retrieving, and removing data in React Native applications.
    This module provides three main functions: storeData for saving data, getData for retrieving data, and removeData for deleting data from AsyncStorage. Each function includes error handling to log any issues that occur during storage operations.
*/}
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

// Function to retrieve data from AsyncStorage by key, parsing the JSON string back into an object and handling any errors that may occur during the retrieval process
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data', e);
  }
};

// Function to remove data from AsyncStorage by key, handling any errors that may occur during the removal process
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};