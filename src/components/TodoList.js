import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function TodoList() {

    const [todos, setTodos] = useState([
        {
            action: 'Take a bath',
            key: 1,
        },
        {
            action: 'Wash dishes',
            key: 2,
        },
        {
            action: 'Study react native',
            key: 3,
        },
    ])


    return (
        <FlatList
            data={todos}
            renderItem={({ item }) => (
                <View style={styles.list}>
                    <Text>
                        {item.action}
                    </Text>
                </View>
            )}
        >
        </FlatList>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderStyle: 'dashed',
        borderRadius: 10,
    },
})