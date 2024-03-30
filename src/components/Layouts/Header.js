import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>ToDoList App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 25,
        backgroundColor: 'green',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
}); 