import React from 'react';
import { StyleSheet,Text,View,TouchableOpacity,StatusBar,Dimensions,TextInput,ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {  AntDesign } from '@expo/vector-icons';
function LoginSplash({navigation}) {
  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [errUsername, setErrUsername] = React.useState(false);
  const [errPass, setErrPass] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  return (
    <View style={{flex:1}}>
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
          <ScrollView>
            <View style={{flexDirection:'row', alignItems:'center',marginBottom:10}}>
              <TouchableOpacity onPress={() => navigation.navigate('LoginSplash')}>
                  <AntDesign name="left" size={30} color="#434c73" style={{ paddingHorizontal: 18 }} />
              </TouchableOpacity>
              <View style={{flex:1,alignItems:'center',marginRight:50}}>
                <Text style={styles.textSignin}>Đăng nhập</Text>
              </View>
            </View>
            {errUsername?(
              <View style={styles.inputErr}>
                  <TextInput placeholder={'Tên đăng nhập'} style={styles.textInput} value={username} onChangeText={setUsername}/>
              </View>
            ):(
              <View style={styles.input}>
                <TextInput placeholder={'Tên đăng nhập'} style={styles.textInput} value={username} onChangeText={setUsername}/>
              </View>
            )}
            {errPass?(
              <View style={styles.inputErr}>
                <TextInput placeholder={'Mật khẩu'} style={styles.textInput}  secureTextEntry={true} value={pass} onChangeText={setPass}/>
              </View>
            ):(
              <View style={styles.input}>
                <TextInput placeholder={'Mật khẩu'} style={styles.textInput}  secureTextEntry={true} value={pass} onChangeText={setPass}/>
              </View>
            )}
            <Text style={{color:'red'}}>{errMessage}</Text>
            <TouchableOpacity style={styles.signup} onPress={()=>signin()}>
              <View style={{flex:1,alignItems:'center'}}>
                  <Text style={styles.textSignup}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </View>
    </View>
  );
  function signin(){

  }
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4388D6'
  },
  header:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  footer:{
    flex:1,
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
  textSignin:{
    fontWeight:'bold',
    fontSize:25
  },
  input:{
    borderColor:'gray',
    borderWidth:3,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    height:60,
    flexDirection:"row",
    marginVertical:5
  },
  inputErr:{
    borderColor:'red',
    borderWidth:3,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    height:60,
    flexDirection:"row",
    marginVertical:5
  },
  textInput:{
    marginLeft:20,
    flex:1,
    fontSize:17
  },
  signup:{
    marginTop:25,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    height:60,
    backgroundColor:'black',
    flexDirection:"row",
    marginVertical:10
  },
  textSignup:{
    color:'white',
    fontSize:20
  }
});

export default LoginSplash;
