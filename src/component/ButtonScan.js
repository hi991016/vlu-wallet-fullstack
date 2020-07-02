import React from 'react'
import { StyleSheet, View } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonScan = () => {
    return (
        <View style={{ position: "absolute", alignItems: "center" }}>

            <View style={styles.scan}>
                <TouchableOpacity activeOpacity={0.9} underlayColor="#fff">
                    <LinearGradient style={[styles.LinearGradient]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4776e6', '#8e54e9']}
                    >
                        <IonIcons name='ios-qr-scanner' size={55} color='#fff' />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.center}/>
            <View style={styles.center1}/> */}
        </View>
    )
}

export default ButtonScan

const styles = StyleSheet.create({
    LinearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        width: 70,
        height: 70,
    },
    scan: {
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        width: 70,
        height: 70,
        position: "absolute",
        top: -45,
        shadowColor: "#fff",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: '#fff',
        elevation: 5,
    },
    center: {
        alignSelf: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        width: 100,
        height: 400,
        top: 10,
        borderRadius: 40,
    },
    center1: {
        alignSelf: 'center',
        backgroundColor: '#86a8e7',
        position: 'absolute',
        width: 70,
        height: 70,
        top: -70,
        borderRadius: 100,
    },
})
