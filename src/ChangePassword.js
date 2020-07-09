import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,StatusBar,TextInput ,AsyncStorage,Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import {Dialog} from 'react-native-simple-dialogs';
import axios from 'axios';
var jwtDecode = require('jwt-decode');
    const ChangePassword = ({navigation}) => {
      React.useEffect(() => {
          AsyncStorage.getItem('userToken', (err, result) => {
            var decoded = jwtDecode(result);
              setUsername(decoded.user);
          });
    }, []);

    const [username, setUsername] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [errPass, setErrPass] = React.useState(false);
    const [errNewPass, setErrNewPass] = React.useState(false);
    const [errConfirmPass, setErrConfirmPass] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [changeSuccess, setChangeSuccess] = React.useState(false);

    function changePass(){
      let isErr = false;
      let mess = '';
      if(pass == ''){
        setErrPass(true);
        mess = '*Vui lòng nhập đủ thông tin'
        isErr=true;
      }else setErrPass(false)
      if(newPass == ''){
        setErrNewPass(true);
        mess = '*Vui lòng nhập đủ thông tin'
        isErr=true;
      }else setErrNewPass(false)
      if(confirmPass == ''){
        setErrConfirmPass(true);
        mess = '*Vui lòng nhập đủ thông tin'
        isErr=true;
      }else setErrConfirmPass(false)
      if(isErr){
        setErrMessage(mess);
        return;
      }
      if(newPass.length < 6 ){
        mess = '*Mật khẩu quá ngắn';
        setErrMessage(mess);
        setErrNewPass(true);
        return;
      }else{setErrNewPass(false)}
      if(newPass != confirmPass){
        mess = '*Mật khẩu nhập lại không chính xác';
        setErrMessage(mess);
        setErrConfirmPass(true);
        return;
      }else{setErrConfirmPass(false);}
      setDialogVisible(true);
      axios.post('https://vlu-ewallet.herokuapp.com/user-login/changePass', {
         username:username,
         password:pass,
         newpass:newPass
       }).then(res =>{
         if(res.data == 'Success' ) {
           setErrPass(false);
           setErrMessage(mess);
           setChangeSuccess(true);
         }else{
           setDialogVisible(false);
           mess = '*'+res.data ;
           setErrPass(true);
           setErrMessage(mess);
         }
       }).catch(err =>{
           console.error(err);
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9faff', paddingVertical:30,paddingHorizontal:40}}>
            <StatusBar barStyle='light-content'/>
            <Dialog visible={dialogVisible}>
              <Animatable.View
                animation='fadeInUpBig'>
                {changeSuccess?(
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
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
            {errPass?(
              <View style={styles.inputErr}>
                <TextInput placeholder={'Mật khẩu cũ'} style={styles.textInput}  secureTextEntry={true} value={pass} onChangeText={setPass}/>
              </View>
            ):(
              <View style={styles.input}>
                <TextInput placeholder={'Mật khẩu cũ'} style={styles.textInput}  secureTextEntry={true} value={pass} onChangeText={setPass}/>
              </View>
            )}
            {errNewPass?(
              <View style={styles.inputErr}>
                <TextInput placeholder={'Mật khẩu mới'} style={styles.textInput}  secureTextEntry={true} value={newPass} onChangeText={setNewPass}/>
              </View>
            ):(
              <View style={styles.input}>
                <TextInput placeholder={'Mật khẩu mới'} style={styles.textInput}  secureTextEntry={true} value={newPass} onChangeText={setNewPass}/>
              </View>
            )}
            {errConfirmPass?(
              <View style={styles.inputErr}>
                <TextInput placeholder={'Nhập lại mật khẩu'} style={styles.textInput}  secureTextEntry={true} value={confirmPass} onChangeText={setConfirmPass}/>
              </View>
            ):(
              <View style={styles.input}>
                <TextInput placeholder={'Nhập lại mật khẩu'} style={styles.textInput}  secureTextEntry={true} value={confirmPass} onChangeText={setConfirmPass}/>
              </View>
            )}
            <Text style={{color:'red'}}>{errMessage}</Text>
            <TouchableOpacity style={styles.signup} onPress={()=>changePass()}>
              <View style={{flex:1,alignItems:'center'}}>
                  <Text style={styles.textSignup}>ĐỔI MẬT KHẨU</Text>
              </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword
const {height} = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.4;
const styles = StyleSheet.create({
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
  logo:{
    width:height_logo,
    height:height_logo
  },
  textSignup:{
    color:'white',
    fontSize:20
  }
})
