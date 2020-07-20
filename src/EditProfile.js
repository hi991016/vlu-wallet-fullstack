import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Alert, AsyncStorage, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
var jwtDecode = require('jwt-decode');
const EditProfile = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [errName, setErrName] = React.useState(false);
  const [errEmail, setErrEmail] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [sname, setSname] = React.useState('');
  const [source, setSource] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [changeSuccess, setChangeSuccess] = React.useState(false);
  React.useEffect(() => {
    if (username == '') {
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
        setName(decoded.name);
        setAvatar(decoded.avatar);
        setEmail(decoded.email);
        setUsername(decoded.user);
      });
    } else {
      let subname = name.split(' ');
      if (subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
      else setSname(subname[0].charAt(0));
    }
  }, [username]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      setSource(`data:image/jpg;base64,${result.base64}`);
      setAvatar(result.uri);
    }
  };

  function changeInfo() {
    let isErr = false;
    let mess = '';
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
    if (isErr) {
      setErrMessage(mess);
      return;
    }
    setDialogVisible(true);
    let linkUpload = '';
    if (source != '') {
      const data = new FormData()
      data.append('file', source)
      data.append('upload_preset', 'vanlangwallet')
      fetch('https://api.cloudinary.com/v1_1/dqsjh9n0u/image/upload', {
        method: "post",
        body: data
      }).then(res => res.json()).
        then(data => {
          linkUpload = data.url;
          axios.post('https://vlu-ewallet.herokuapp.com/user-login/changeInfo', {
            username: username,
            name: name,
            email: email,
            avatar: linkUpload
          }).then(res => {
            if (res.data.thongbao == 'Success') {
              setErrName(false);
              setErrMessage(mess);
              AsyncStorage.setItem('userToken', res.data.token);
              setChangeSuccess(true);
            }
          }).catch(err => {
            console.error(err);
          })
        }).catch(err => {
          Alert.alert("Lỗi khi upload ảnh")
        })
    } else {
      axios.post('https://vlu-ewallet.herokuapp.com/user-login/changeInfo', {
        username: username,
        name: name,
        email: email
      }).then(res => {
        if (res.data.thongbao == 'Success') {
          setErrName(false);
          setErrMessage(mess);
          AsyncStorage.setItem('userToken', res.data.token);
          setChangeSuccess(true);
        }
      }).catch(err => {
        console.error(err);
      })
    }

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9faff', paddingVertical: 30, paddingHorizontal: 40 }}>
      <StatusBar barStyle='light-content' />
      <Dialog visible={dialogVisible}>
        <Animatable.View
          animation='fadeInUpBig'>
          {changeSuccess ? (
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Animatable.Image
                  animation='bounceIn'
                  duration={1500}
                  source={require('../assets/Tick_Mark_Dark-512.jpg')}
                  style={styles.logo}
                  resizeMode={'stretch'}
                />
              </View>
            </TouchableOpacity>
          ) : (
              <LottieView style={{ width: 300 }} source={require('../anim/51-preloader.json')} autoPlay loop />
            )}
        </Animatable.View>
      </Dialog>

      {avatar == '' ? (
        <View style={{ alignSelf: "center", marginBottom: 30 }}>
          <View style={styles.profileImage}>
            <Avatar
              size="large"
              containerStyle={{ backgroundColor: "#BCBEC1" }}
              rounded
              title={sname}
              activeOpacity={0.7} />
          </View>
          <View style={styles.edit}>
            <TouchableOpacity onPress={pickImage}>
              <AntDesign name="edit" size={20} color="#fff" style={{ marginTop: -2, marginLeft: 0 }} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
          <View style={{ alignSelf: "center", marginBottom: 30 }}>
            <View style={styles.profileImage}>
              <Image source={{ uri: avatar }} style={styles.image} resizeMode="center" />
            </View>
            <View style={styles.edit}>
              <TouchableOpacity onPress={pickImage}>
                <AntDesign name="edit" size={20} color="#fff" style={{ marginTop: -2, marginLeft: 0 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}


      {errName ? (
        <View style={styles.inputErr}>
          <TextInput placeholder={'Họ Tên'} style={styles.textInput} value={name} onChangeText={setName} />
        </View>
      ) : (
          <View style={styles.input}>
            <TextInput placeholder={'Họ Tên'} style={styles.textInput} value={name} onChangeText={setName} />
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
      <Text style={{ color: 'red' }}>{errMessage}</Text>
      <TouchableOpacity style={styles.signup} onPress={() => changeInfo()}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.textSignup}>XÁC NHẬN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Text style={{color: '#7f7f7f', fontSize: 18, top: 10}}>HỦY</Text>
      </TouchableOpacity>
    </View>
  )
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.4;
const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: "row",
    marginVertical: 8
  },
  inputErr: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: "row",
    marginVertical: 8
  },
  textInput: {
    marginLeft: 20,
    flex: 1,
    fontSize: 18
  },
  signup: {
    marginTop: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'black',
    flexDirection: "row",
    marginVertical: 10
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  textSignup: {
    color: 'white',
    fontSize: 18
  },
  profileImage: {
    marginTop: -75,
    overflow: 'hidden'
  },
  edit: {
    backgroundColor: "gray",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 360,
    width: 90,
    height: 90,
  }
})

export default EditProfile
