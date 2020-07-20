import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar,FlatList,AsyncStorage ,TouchableOpacity,Alert,Dimensions} from 'react-native'
import axios from 'axios';
var jwtDecode = require('jwt-decode');
import VoucherItem from './component/voucherItem';
import * as Animatable from 'react-native-animatable';
import {Dialog,ConfirmDialog } from 'react-native-simple-dialogs';
import LottieView from 'lottie-react-native';
const Voucher = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [point, setPoint] = React.useState(0);
  const [exchange, setExchange] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [changeSuccess, setChangeSuccess] = React.useState(false);
  React.useEffect(() => {
    setLoad(true);
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
        setUsername(decoded.user);
    });
    axios.get('https://vlu-ewallet.herokuapp.com/voucher/getData').then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
  }, []);
  function postConfirm(){
    setConfirmDialogVisible(false);
    setDialogVisible(true)
    axios.post('https://vlu-ewallet.herokuapp.com/voucher/exchange', {
       username:username,
       point:point,
       exchange:exchange
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
          setChangeSuccess(true);
          AsyncStorage.setItem('userToken',res.data.token);
       }else{
         setDialogVisible(false);
         Alert.alert(
           'Thông báo',
           'Tài khoản của bạn không đủ điểm thưởng!',
           [{
               text: 'OK',
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
            {load?(
              <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
                animation='bounceIn'>
                <LottieView style={{width:200}} source={require('../anim/2469-dino-dance.json')} autoPlay loop />
              </Animatable.View>
            ):(
              <Animatable.View animation='fadeInUpBig'  style={styles.container}>
                  <ConfirmDialog
                      title="Xác nhận"
                      message="Bạn chắc chắn muốn đổi voucher?"
                      visible={confirmDialogVisible}
                      onTouchOutside={() => setConfirmDialogVisible(false)}
                      positiveButton={{
                          title: "Có",
                          onPress: () => postConfirm()
                      }}
                      negativeButton={{
                          title: "Không",
                          onPress: () => setConfirmDialogVisible(false)
                      }}
                      />
                  <Dialog visible={dialogVisible}>
                    <Animatable.View
                      animation='fadeInUpBig'>
                      {changeSuccess?(
                        <TouchableOpacity onPress={()=>{navigation.navigate('Home');setDialogVisible(false);}}>
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
                  <View style={styles.panelBody}>
                      <FlatList
                          style={{marginBottom:30}}
                          data={data}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<VoucherItem data={item} onPress={()=>{
                            setPoint(item.point);
                            setExchange(item.exchange);
                            setConfirmDialogVisible(true)
                          }}/>)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </Animatable.View>
            )}
          </>
      )
}

export default Voucher
const {height} = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.4;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelBody: {
        flex: 1,
    },
    logo:{
        width:height_logo,
        height:height_logo
    },
})
