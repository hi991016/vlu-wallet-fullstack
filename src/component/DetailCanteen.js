import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Alert } from 'react-native'
import InputSpinner from "react-native-input-spinner";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BackgroundOval from './BackgroundOval';

class DetailCanteen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <ScrollView style={styles.scrollview}>
                    <View style={styles.container}>
                        <BackgroundOval />
                        <View styles={styles.img}>
                            <Image style={styles.imgSize} source={require('../../assets/rice.png')} />
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                            <Text style={styles.desc}>Rice with Grilled Pork Chop</Text>
                        </View>
                        <View style={styles.info}>
                            <InputSpinner
                                max={10}
                                min={1}
                                step={1}
                                value={this.state.value}
                                onChange={(num) => {
                                    console.log(num);
                                }}
                                rounded={false}
                                style={styles.quantity}
                                borderRadius
                                color={'#fff'}
                                fontSize={18}
                                buttonLeftImage={
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={
                                            require('../../assets/minus.png')
                                        }
                                    />
                                }
                                buttonRightImage={
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={
                                            require('../../assets/plus.png')
                                        }
                                    />
                                }
                            />
                            <Text style={styles.price}>$7.99</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.goBack()}>
                                <View style={styles.customButton}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                        Add to Cart
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}

export default DetailCanteen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imgSize: {
        alignSelf: 'center',
        marginTop: 60,
        width: 300,
        height: 300,
        borderRadius: 120,
    },
    price: {
        fontSize: 29,
        fontWeight: 'bold'
    },
    info: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30
    },
    quantity: {
        borderRadius: 60,
        borderColor: '#cccccc',
        borderWidth: 1.8,
    },
    customButton: {
        marginTop: 70,
        backgroundColor: '#febc40',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 270,
        height: 60,
    },
    scrollview: {
        flex: 1,
        backgroundColor: '#fff'
    },
    desc: {
        fontSize: 29,
        fontWeight: 'bold'
    }
})
