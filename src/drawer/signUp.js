import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, TextInput, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
function SignUp({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [errName, setErrName] = React.useState(false);
  const [errEmail, setErrEmail] = React.useState(false);
  const [errUsername, setErrUsername] = React.useState(false);
  const [errPass, setErrPass] = React.useState(false);
  const [errConfirmPass, setErrConfirmPass] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);
  return (

    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Dialog dialogStyle={{ backgroundColor: 'transparent' }} visible={dialogVisible}>
        <Animatable.View
          animation='fadeInUpBig'>
          <LottieView style={{ width: 300 }} source={require('../../anim/51-preloader.json')} autoPlay loop />
        </Animatable.View>
      </Dialog>
      <View style={styles.header}>
        <Animatable.Image
          animation='slideInRight'
          duration={1500}
          source={require('../../assets/logo-transparent.png')}
          style={styles.logo}
          resizeMode={'stretch'}
        />
      </View>
      <Animatable.View
        style={styles.footer}
        animation='fadeInUpBig'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome5 name="chevron-left" size={24} color="#000" style={{ paddingHorizontal: 0 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 15, }}>
              <Text style={styles.textSinup}>Đăng ký</Text>
            </View>
          </View>
          {errName ? (
            <View style={styles.inputErr}>
              <TextInput placeholder={'Họ tên'} style={styles.textInput} value={name} onChangeText={setName} />
            </View>
          ) : (
              <View style={styles.input}>
                <TextInput placeholder={'Họ tên'} style={styles.textInput} value={name} onChangeText={setName} />
              </View>
            )}
          {errEmail ? (
            <View style={styles.inputErr}>
              <TextInput placeholder={'Email'} style={styles.textInput} value={email} onChangeText={setEmail} />
            </View>
          ) : (
              <View style={styles.input}>
                <TextInput placeholder={'Email'} style={styles.textInput} value={email} onChangeText={setEmail} />
              </View>
            )}
          {errUsername ? (
            <View style={styles.inputErr}>
              <TextInput placeholder={'Tên đăng nhập'} style={styles.textInput} value={username} onChangeText={setUsername} />
            </View>
          ) : (
              <View style={styles.input}>
                <TextInput placeholder={'Tên đăng nhập'} style={styles.textInput} value={username} onChangeText={setUsername} />
              </View>
            )}
          {errPass ? (
            <View style={styles.inputErr}>
              <TextInput placeholder={'Mật khẩu'} style={styles.textInput} secureTextEntry={true} value={pass} onChangeText={setPass} />
            </View>
          ) : (
              <View style={styles.input}>
                <TextInput placeholder={'Mật khẩu'} style={styles.textInput} secureTextEntry={true} value={pass} onChangeText={setPass} />
              </View>
            )}
          {errConfirmPass ? (
            <View style={styles.inputErr}>
              <TextInput placeholder={'Nhập lại mật khẩu'} style={styles.textInput} secureTextEntry={true} value={confirmPass} onChangeText={setConfirmPass} />
            </View>
          ) : (
              <View style={styles.input}>
                <TextInput placeholder={'Nhập lại mật khẩu'} style={styles.textInput} secureTextEntry={true} value={confirmPass} onChangeText={setConfirmPass} />
              </View>
            )}
          <Text style={{ color: 'red', top: 5, marginBottom: 5, paddingHorizontal: 5 }}>{errMessage}</Text>
          <TouchableOpacity style={styles.signup} onPress={() => signup()}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.textSignup}>TẠO TÀI KHOẢN</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
  function signup() {
    let isErr = false;
    let mess = ''
    if (name == '') {
      setErrName(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrName(false)
    if (email == '') {
      setErrEmail(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrEmail(false)
    if (username == '') {
      setErrUsername(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrUsername(false)
    if (pass == '') {
      setErrPass(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrPass(false)
    if (confirmPass == '') {
      setErrConfirmPass(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrConfirmPass(false)
    if (isErr) {
      setErrMessage(mess);
      return;
    }
    if (username.length < 6) {
      mess = '*Tên đăng nhập quá ngắn';
      setErrMessage(mess);
      setErrUsername(true);
      return;
    } else { setErrUsername(false) }
    if (pass.length < 6) {
      mess = '*Mật khẩu quá ngắn';
      setErrMessage(mess);
      setErrPass(true);
      return;
    } else { setErrPass(false) }
    if (pass != confirmPass) {
      mess = '*Mật khẩu nhập lại không chính xác';
      setErrMessage(mess);
      setErrConfirmPass(true);
      return;
    } else { setErrConfirmPass(false); }
    setDialogVisible(true);
    axios.post('https://vlu-ewallet.herokuapp.com/user-login/signup', {
      name: name,
      email: email,
      username: username,
      password: pass
    }).then(res => {
      if (res.data == 'Success') {
        setDialogVisible(false);
        setErrMessage(mess);
        navigation.navigate('SignIn');
      } else {
        setDialogVisible(false);
        mess = '*' + res.data;
        setErrUsername(true);
        setErrMessage(mess);
      }
    }).catch(err => {
      console.error(err);
    })



  }
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4388D6'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  footer: {
    flex: 4.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 25,
    paddingHorizontal: 20
  },
  text_head: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  logo: {
    width: height_logo,
    height: height_logo,
    alignSelf: 'center',
  },
  textSinup: {
    fontWeight: 'bold',
    fontSize: 25
  },
  input: {
    borderColor: '#d4d2d6',
    borderWidth: 2.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: "row",
    marginVertical: 5,
  },
  inputErr: {
    borderColor: 'red',
    borderWidth: 2.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: "row",
    marginVertical: 5
  },
  textInput: {
    marginLeft: 20,
    flex: 1,
    fontSize: 17
  },
  signup: {
    marginTop: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'black',
    flexDirection: "row",
    marginVertical: 10
  },
  textSignup: {
    color: 'white',
    fontSize: 20,
  }
});

export default SignUp;
