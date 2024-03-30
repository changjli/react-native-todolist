import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Button(props) {
    return (
        <TouchableOpacity onPress={props.action}>
            <View style={{ ...styles.button, backgroundColor: props.color }}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
})