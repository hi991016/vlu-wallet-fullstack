import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
const w = Dimensions.get('window').width;

const BackgroundOval = () => {
    return (
        <View style={styles.container} />
    )
}

export default BackgroundOval

const styles = StyleSheet.create({
    container: {
        width: w,
        aspectRatio: 1,
        backgroundColor: '#febc40',
        position: 'absolute',
        borderRadius: w,
        left: 120,
        top: -80,
    }
})
