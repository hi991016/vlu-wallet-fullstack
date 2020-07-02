import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const W = Dimensions.get('window').width;

const BackgroundHeader = ({ style }) => {
    return (
       <> 
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.LinearGradient, style]}
            colors={['#7f7fd5', '#86a8e7', '#91eae4']}
        >
            <View style={styles.line} />
            <View style={[styles.line, { top: 130, left: -150 }]} />
            <View style={[styles.line, { top: 160, left: 0 }]} />
        </LinearGradient>
        </>
    );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
    LinearGradient: {
        height: (W * 2) / 4,
        borderBottomLeftRadius: 175,
        borderBottomRightRadius: 175,
    },
    line: {
        position: 'absolute',
        width: W,
        top: 100,
        left: -300,
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: [
            {
                rotate: '-35deg'
            },
        ],
        borderRadius: 60,
    },
});
