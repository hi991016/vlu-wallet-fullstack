import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Alert } from 'react-native'
import InputSpinner from "react-native-input-spinner";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BackgroundOval from './BackgroundOval';
import NumberFormat from 'react-number-format';
const DetailCanteen = ({navigation,route}) => {
    const [value, setValue] = React.useState(1);
    return (
      <>
          <StatusBar barStyle="dark-content" />
          <ScrollView style={styles.scrollview}>
              <View style={styles.container}>
                  <BackgroundOval />
                  <View styles={styles.img}>
                      <Image style={styles.imgSize} source={{uri:route.params.detail.image}} />
                  </View>
                  <View style={{ marginHorizontal: 30 }}>
                      <Text style={styles.desc}>{route.params.detail.name}</Text>
                  </View>
                  <View style={styles.info}>
                      <InputSpinner
                          max={10}
                          min={1}
                          step={1}
                          value={value}
                          onChange={(num) => {
                            setValue(num);
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
                      <NumberFormat
                         value={route.params.detail.price}
                         displayType={'text'}
                         thousandSeparator={true}
                         suffix={' ₫'}
                         renderText={formattedValue => <Text style={styles.price}>{formattedValue}</Text>} // <--- Don't forget this!
                       />
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Canteen',{item:route.params.detail,value:value})}>
                          <View style={styles.customButton}>
                              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                  Thêm vào giỏ
                              </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
          </ScrollView>
      </>
    )
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
