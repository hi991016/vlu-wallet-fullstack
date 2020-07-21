import React from 'react'
import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity,Alert,FlatList,AsyncStorage,Dimensions} from 'react-native'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import CartItem from './component/cartItem'
import NumberFormat from 'react-number-format';
import {Dialog} from 'react-native-simple-dialogs';
var jwtDecode = require('jwt-decode');
import axios from 'axios';
const PaymentScreen = ({navigation,route}) => {
  const [username, setUsername] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [price, setPrice] = React.useState(-1);
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState(-1);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [changeSuccess, setChangeSuccess] = React.useState(false);
  React.useEffect(() => {
    setLoad(true);
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
        setUsername(decoded.user);
    });
    axios.post('https://vlu-ewallet.herokuapp.com/temp/getTempdata', {
       id:route.params.id
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
         setLoad(false);
         setItems(res.data.data.cartItem);
         setPrice(res.data.data.price);
         setAmount(res.data.data.amount);
         setType(res.data.data.type);
         setExpoPushToken(res.data.data.expoPushToken);
       }else{
         Alert.alert(
           'Thông báo',
           'Giỏ hàng không tồn tại hoặc đã hết hạn',
           [{
               text: 'OK',
               onPress: () => navigation.goBack(),
               style: 'cancel'
             }],  { cancelable: false }
         );
       }
     }).catch(err =>{
         console.error(err);
      })

  }, []);
  function postPayment(){
    setDialogVisible(true);
    var now = new Date();
    axios.post('https://vlu-ewallet.herokuapp.com/payment/newPayment', {
       username:username,
       cartItem:items,
       type:type,
       price:price,
       date:now.toString()
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
          if(expoPushToken!=''){
              sendPushNotification();
          }
          setChangeSuccess(true);
          AsyncStorage.setItem('userToken',res.data.token);
       }else{
         setDialogVisible(false);
         Alert.alert(
           'Thông báo',
           'Tài khoản của bạn không đủ để thanh toán.Vui lòng kiểm tra lại!',
           [{
               text: 'OK',
               onPress: () => navigation.goBack(),
               style: 'cancel'
             }],  { cancelable: false }
         );
       }
     }).catch(err =>{
         console.error(err);
      })
  }

  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Thông báo',
      body: 'Hoàn tất thanh toán',
      data: { name: username },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

    return (
      <View style={{flex:1}}>
        { load ? (
          <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
            animation='bounceIn'>
            <LottieView style={{width:200}} source={require('../anim/2469-dino-dance.json')} autoPlay loop />
          </Animatable.View>
        ):(
          <Animatable.View  animation='fadeInUpBig' style={{ flex: 1, backgroundColor: '#000', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, marginTop:10}}>
                  <Dialog visible={dialogVisible}>
                    <Animatable.View
                      animation='fadeInUpBig'>
                      {changeSuccess?(
                        <TouchableOpacity onPress={()=>{navigation.navigate('Home');navigation.goBack();setDialogVisible(false);}}>
                          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                              <Animatable.Image
                                animation='bounceIn'
                                duration={1500}
                                source={require('../assets/Tick_Mark_Dark-512.jpg')}
                                style={styles.logo}
                                resizeMode={'stretch'}
                              />
                          </View>
                        </TouchableOpacity>
                      ):(
                        <LottieView style={{width:300, alignSelf: 'center'}} source={require('../anim/51-preloader.json')} autoPlay loop />
                      )}
                    </Animatable.View>
                  </Dialog>
                  <View style={styles.cart}>
                      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', }}>Giỏ hàng</Text>
                      <View style={styles.bgCart}>
                          <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>{amount}</Text>
                      </View>
                  </View>
                  <View style={{ marginTop: 8 ,flex:1}}>
                    <FlatList
                        data={items}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <CartItem data={item}/>}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View style={styles.totalCart}>
                      <Text style={{ color: '#919090', fontSize: 25 }}>Tổng cộng:</Text>
                      <NumberFormat
                         value={price}
                         displayType={'text'}
                         thousandSeparator={true}
                         suffix={' ₫'}
                         renderText={formattedValue => <Text style={{ color: '#fff', fontSize: 33, fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                       />
                  </View>
                  <View style={{ alignSelf: 'center',  marginBottom:30 }}>
                      <TouchableOpacity activeOpacity={0.7} onPress={()=>postPayment()}>
                          <View style={styles.customButton}>
                              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Thanh toán</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
          </Animatable.View>
        )}
      </View>
    )
}

export default PaymentScreen
const {height} = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.4;
const styles = StyleSheet.create({
  cart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 10,
  },
  bgCart: {
      backgroundColor: '#febc40',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 120,
      width: 55,
      height: 55,
  },
  totalCart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 22,
  },
  customButton: {
      marginTop: 35,
      backgroundColor: '#febc40',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 60,
      width: 280,
      height: 50,
  } ,
  logo:{
      width:height_logo,
      height:height_logo
  },
})
