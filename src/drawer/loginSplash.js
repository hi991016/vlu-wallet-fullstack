import React from 'react';
import { StyleSheet,Text,View,TouchableOpacity,StatusBar,Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
function LoginSplash({navigation}) {
  const isFocused = useIsFocused();
  return (
    <View style={{flex:1}}>
    {isFocused ?(
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.header}>
          <Animatable.Image
            animation='bounceIn'
            duration={1500}
            source={require('../../assets/logo-transparent.png')}
            style={styles.logo}
            resizeMode={'stretch'}
          />
        </View>
        <Animatable.View
          style={styles.footer}
          animation='fadeInUpBig'>
            <View style={{flex:1}}>
              <Swiper style={styles.wrapper} showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5} showsPagination={false}>
                <View>
                  <Text style={styles.title}>Kết nối đến ví điện tử của bạn</Text>
                  <Text style={styles.subtitle}>Bạn có tài khoản chưa?</Text>
                </View>
                <View>
                  <Text style={styles.title}>Thanh toán nhanh chóng</Text>
                  <Text style={styles.subtitle}>Không ai muốn chờ lâu cả</Text>
                </View>
                <View>
                  <Text style={styles.title}>Kiểm soát chi tiêu bản thân</Text>
                  <Text style={styles.subtitle}>Tạm biệt những câu hỏi tiền của mình đi đâu</Text>
                </View>
                <View>
                  <Text style={styles.title}>Ưu đãi hấp dẫn</Text>
                  <Text style={styles.subtitle}>Hàng loạt món quà khi quy đổi điểm thưởng</Text>
                </View>
              </Swiper>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signup} onPress={()=>navigation.navigate('SignUp')}>
                <View style={{flex:1,alignItems:'center'}}>
                    <Text style={styles.textSignup}>ĐĂNG KÝ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signin} onPress={()=>{navigation.navigate('SignIn')}}>
                <View style={{flex:1,alignItems:'center'}}>
                    <Text style={styles.textSignin}>ĐĂNG NHẬP</Text>
                </View>
              </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>):undefined}
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.6;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4388D6'
  },
  header:{
    flex:3,
    justifyContent:'center',
    alignItems:'center'
  },
  footer:{
    flex:2,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30
  },
  logo:{
    width:height_logo,
    height:height_logo
  },
  title:{
    fontWeight:'bold',
    fontSize:30
  },
  subtitle:{
    color:'gray',
    marginTop:5,
    marginBottom:10
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  signup:{
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'black',
    flexDirection:"row",
    marginVertical:10
  },
  textSignup:{
    color:'white',
    fontSize:20
  },
  signin:{
    borderWidth:3,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    flexDirection:"row",
    marginVertical:10
  },
  textSignin:{
    fontSize:20
  },
  wrapper: {}
});

export default LoginSplash;
