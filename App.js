import 'react-native-gesture-handler';
import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, StatusBar, TouchableOpacity, Alert, Dimensions, View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { Dialog } from 'react-native-simple-dialogs';
import axios from 'axios';
import HomeScreen from './src/HomeScreen';
import DrawerContent from './src/component/DrawerContent';
import Vmart from './src/drawer/Vmart';
import Library from './src/drawer/Library';
import Canteen from './src/drawer/Canteen';
import LoginSplash from './src/drawer/loginSplash';
import SignUp from './src/drawer/signUp';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const AuthContext = React.createContext();
function DrawerHome({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} onPress={() => signOut()} />}>
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
      <Drawer.Screen name="Canteen" component={Canteen} />
      <Drawer.Screen name="Vmart" component={Vmart} />
      <Drawer.Screen name="Library" component={Library} />
    </Drawer.Navigator>
  );
};

function StackLogin({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginSplash" component={LoginSplash}
        options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp}
        options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
function SignIn({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [errUsername, setErrUsername] = React.useState(false);
  const [errPass, setErrPass] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);
  return (
    <View style={styles.containerlogin}>
      <StatusBar barStyle='light-content' />
      <Dialog dialogStyle={{ backgroundColor: 'transparent' }} visible={dialogVisible}>
        <Animatable.View
          animation='fadeInUpBig'>
          <LottieView style={{ width: 300 }} source={require('./anim/51-preloader.json')} autoPlay loop />
        </Animatable.View>
      </Dialog>
      <View style={styles.header}>
        <Animatable.Image
          animation='bounceIn'
          duration={1500}
          source={require('./assets/logo-transparent.png')}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginSplash')}>
              <FontAwesome5 name="chevron-left" size={24} color="#000" style={{ paddingHorizontal: 0 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', }}>
              <Text style={styles.textSignin}>Đăng nhập</Text>
            </View>
          </View>
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
          <Text style={{ color: 'red', top: 5, marginBottom: 5, paddingHorizontal: 5 }}>{errMessage}</Text>
          <TouchableOpacity style={styles.signup} onPress={() => signin()}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.textSignup}>ĐĂNG NHẬP</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
  function signin() {
    let isErr = false;
    let mess = '';
    if (username == '') {
      setErrUsername(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrUsername(false)
    if (pass == '') {
      setErrPass(true);
      mess = '*Vui lòng nhập đủ thông tin'
      isErr = true;
    } else setErrPass(false);
    if (isErr) {
      setErrMessage(mess);
      return;
    }
    setDialogVisible(true);
    axios.post('https://vlu-ewallet.herokuapp.com/user-login/signin', {
      username: username,
      password: pass
    }).then(res => {
      if (res.data.thongbao == 'Success') {
        setDialogVisible(false);
        setErrMessage(mess);
        var serverToken = res.data.token;
        signIn({ serverToken });
        navigation.navigate('LoginSplash');
      } else {
        setDialogVisible(false);
        mess = '*' + res.data.thongbao;
        setErrUsername(true);
        setErrMessage(mess);
      }
    }).catch(err => {
      console.error(err);
    })
  }
}
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        AsyncStorage.setItem('userToken', data.serverToken);
        dispatch({ type: 'SIGN_IN', token: data.serverToken });
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer style={styles.container}>
        {state.isLoading ? (undefined
          //   <Stack.Navigator>
          // <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
          // </Stack.Navigator>
        ) : state.userToken == null ? (
          <StackLogin />
        ) : (
              <DrawerHome />
            )}

      </NavigationContainer>
    </AuthContext.Provider>
  );

}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.6;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  containerlogin: {
    flex: 1,
    backgroundColor: '#4388D6'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  textSignin: {
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
    marginVertical: 5
  },
  inputErr: {
    borderColor: 'red',
    borderWidth: 3,
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
    marginTop: 15,
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
    fontSize: 20
  }
});
