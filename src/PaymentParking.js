import React from 'react'
import { StyleSheet, Text, View ,AsyncStorage,Image,TouchableOpacity,Alert,FlatList,Dimensions} from 'react-native';
import NumberFormat from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
var jwtDecode = require('jwt-decode');
import {Dialog} from 'react-native-simple-dialogs';
import axios from 'axios';
const PaymentParking = ({navigation,route}) => {
  const [username, setUsername] = React.useState('');
  const [id, setId] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [type, setType] = React.useState('');
  const [paid, setPaid] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [changeSuccess, setChangeSuccess] = React.useState(false);
  React.useEffect(() => {
    setLoad(true);
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
        setUsername(decoded.user);
    });
    axios.post('https://vlu-ewallet.herokuapp.com/temp/getAParkingTicket', {
       id:route.params.id
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
         setLoad(false);
         setType(res.data.data.type);
         setId(res.data.data.id);
         setPaid(res.data.data.paid);
         setActive(res.data.data.active);
       }else{
         Alert.alert(
           'Thông báo',
           'Vé xe không tồn tại ',
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
    axios.post('https://vlu-ewallet.herokuapp.com/payment/newPaymentParking', {
       username:username,
       id:id,
       type:type,
       date:now.toString()
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
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
    return (
      <>
        { load ? (
          <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
            animation='bounceIn'>
            <LottieView style={{width:200}} source={require('../anim/2469-dino-dance.json')} autoPlay loop />
          </Animatable.View>
        ):(
          <View style={{flex:1}}>
            <View style={{flex:1}}>
            </View>
            <Animatable.View  animation='fadeInUpBig' style={{ flex: 1, backgroundColor: '#000', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10,marginTop:10}}>
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
                          <LottieView style={{width:300}} source={require('../anim/51-preloader.json')} autoPlay loop />
                        )}
                      </Animatable.View>
                    </Dialog>
                    <View style={styles.cart}>
                        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', }}>Vé giữ xe</Text>
                    </View>
                    <View style={{ marginTop: 8 ,flex:1,justifyContent:'center'}}>
                        {type=='moto'?(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',marginTop:10 }}>Loại: Xe máy </Text>
                        ):(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',marginTop:10 }}>Loại: Xe đạp </Text>
                        )}
                        {active?(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',marginTop:10 }}>Trạng thái: Đang giữ xe</Text>
                        ):(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop:10}}>Trạng thái: Chưa giữ xe</Text>
                        )}
                        {paid?(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',marginTop:10 }}>Thanh toán: Rồi</Text>
                        ):(
                          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop:10}}>Thanh toán: Chưa</Text>
                        )}
                    </View>
                    <View style={{ alignSelf: 'center',  marginBottom:30 }}>
                        {paid?undefined:(
                          <TouchableOpacity activeOpacity={0.7} onPress={()=>postPayment()}>
                              <View style={styles.customButton}>
                                  <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Thanh toán</Text>
                              </View>
                          </TouchableOpacity>
                        )}
                    </View>
            </Animatable.View>
          </View>
        )}
      </>
    )
}

export default PaymentParking
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
