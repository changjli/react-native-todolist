import { Alert, FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Layout from './src/components/Layouts';
import { useEffect, useState } from 'react';
import Button from './src/components/Buttons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import UseTodoApi from './src/helpers/api/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Todo from './src/screens/Todo';

export default function App() {
  // seharusnya disini router tapi anggep aja halaman karena baru ada satu 
  return (
    <Todo />
  )
}

