import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

var coin = require('./component/asset/coin.png');

const AddMoneyScreen = ({navigation}) => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#7f7fd5', '#86a8e7', '#91eae4']}
                    style={{ width: 280, height: 210, borderRadius: 20 }}
                >
                    <View style={styles.inside}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>Your Balance</Text>
                        <View style={{ paddingHorizontal: 20 }}>
                        <Text numberOfLines={3} style={{ color: '#fff', fontSize: 45, fontWeight: 'bold', textAlign: 'center' }}>$1016</Text>
                        </View>
                    </View>
                </LinearGradient>
                </View>
                <View style= {{flex: 1, marginTop: -180}}>
                    <Image source={coin} style={{ width: 355, height: 170 }} />
                </View>
                <View style={{ flex: 1, marginTop: 280 }}>
                <TouchableOpacity activeOpacity={0.7}>
                    <View style={styles.customButton}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>
                            Add Money
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default AddMoneyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inside: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customButton: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 280,
        height: 75,
    }
})
