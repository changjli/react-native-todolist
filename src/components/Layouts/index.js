import React from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Header from './Header'

export default function Layout(props) {
    return (
        <View style={styles.outer}>
            {/* header */}
            <View>
                <Header />
            </View>
            {/* content */}

            <View style={styles.container}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    }
})


