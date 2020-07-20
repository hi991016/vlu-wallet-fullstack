import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Image, StatusBar,RefreshControl,AsyncStorage,Alert ,Vibration} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import CanteenItem from '../component/CanteenItem';
import {Dialog} from 'react-native-simple-dialogs';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import DetailCanteen from '../component/DetailCanteen';
import SlidingUpPanel from 'rn-sliding-up-panel';
import NumberFormat from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import CartItem from '../component/cartItem'
var jwtDecode = require('jwt-decode');
import { useFocusEffect } from '@react-navigation/native'
const { height } = Dimensions.get("window");

const Stack = createStackNavigator();

const _draggedValue = new Animated.Value(90);

const formatData = (data, numColumns) => {
    const full = Math.floor(data.length / numColumns);
    let numLastRow = data.length - (full * numColumns);
    while (numLastRow !== numColumns && numLastRow !== 0) {
        data.push({ _id: numLastRow, empty: true });
        numLastRow++;
    }
    return data;
};


function CanteenScreen({ navigation ,route}) {
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const [fullProducts, setFullProducts] = React.useState([]);
  const [cartItem,setCartItem] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/canteen-manager/getData').then(res =>{
        setProducts(res.data);
        setFullProducts(res.data);
        setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
      setRefreshing(false);
  }, []);
  React.useEffect(() => {
        setLoad(true);
        AsyncStorage.getItem('userToken', (err, result) => {
          var decoded = jwtDecode(result);
            setUsername(decoded.user);
        });
        axios.get('https://vlu-ewallet.herokuapp.com/canteen-manager/getData').then(res =>{
           setFullProducts(res.data);
           setProducts(res.data);
           setLoad(false);
         }).catch(err =>{
             console.error(err);
          })
          registerForPushNotificationsAsync()
          const _notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);
  const _handleNotification = notification => {
    Vibration.vibrate();
    setNotification(notification);
  };

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        var token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token);
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
    };
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.item ) {
        let arr = cartItem;
        let find =false;
        for(let i = 0; i<arr.length;i++){
          if(arr[i].name == route.params.item.name){
            arr[i].amount +=  route.params.value;
            find = true;
            break;
          }
        }
        if(!find) arr.push({id:route.params.item._id,name:route.params.item.name,amount:route.params.value,price:route.params.item.price});
        let newAmount = amount + route.params.value;
        let newPrice = price + ( route.params.item.price * route.params.value);
        setAmount(newAmount);
        setPrice(newPrice)
        setCartItem(arr);
        route.params=  null;
      }
    }, [route.params?.item])
  );
  function searchFilterFunction(text){
    setKeyword(text)
    const newData = fullProducts.filter(item => {
      const itemData = `${item.name}` +'';
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });
    setProducts(newData);
  };
  function order(){
    setDialogVisible(true);
    var now = new Date();
    var d = new Date();
    d.setMinutes(d.getMinutes() +time);
    axios.post('https://vlu-ewallet.herokuapp.com/payment/newOrder', {
       username:username,
       cartItem:cartItem,
       type:'canteen',
       price:price,
       date:now.toString(),
       time:d.toString(),
       expoPushToken:expoPushToken
     }).then(res =>{
       if(res.data.thongbao == 'Success' ) {
           setDialogVisible(false);
           Alert.alert(
             'Đặt hàng thành công',
             '',
             [{
                 text: 'OK',
                 onPress: () => {navigation.navigate('Home');setDialogVisible(false);setCartItem([]);setAmount(0);setPrice(0);setTime(0)},
                 style: 'cancel'
               }],  { cancelable: false }
           );
          AsyncStorage.setItem('userToken',res.data.token);
       }else{
         setDialogVisible(false);
         Alert.alert(
           'Thông báo',
           'Tài khoản của bạn không đủ để thanh toán.Vui lòng kiểm tra lại!',
           [{
               text: 'OK',
               //onPress: () => navigation.goBack(),
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
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {load?(
              <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
                animation='bounceIn'>
                <LottieView style={{width:200}} source={require('../../anim/2469-dino-dance.json')} autoPlay loop />
              </Animatable.View>
            ):(
              <Animatable.View animation='fadeInUpBig' style={{flex:1}}>
                <Dialog visible={dialogVisible}>
                  <Animatable.View
                    animation='fadeInUpBig'>
                      <LottieView style={{width:300}} source={require('../../anim/51-preloader.json')} autoPlay loop />
                  </Animatable.View>
                </Dialog>
                <View>
                <FlatList
                    data={formatData(products, 2)}
                    numColumns={2}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({ item }) => {
                      if(item.empty === true){
                        return<View style={{backgroundColor:'transparent',flex:1}}/>
                      }
                       return(<CanteenItem data={item} onPress={() => { navigation.navigate('Detail Canteen', { detail: item }); }} />);
                     }}
                    contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<SearchBar placeholder='Tìm kiếm...' value={keyword}
                       containerStyle={{backgroundColor:'#fff'}}
                       onChangeText={(text)=>searchFilterFunction(text)}
                       lightTheme round />}
                />
              </View>
              <View style={{ flex: 1 ,height:height - 140 }}>
                  <SlidingUpPanel
                      ref={null}
                      draggableRange={{ top: height - 140, bottom: 30 }}
                      backdropOpacity={0}
                      animatedValue={_draggedValue}
                      snappingPoints={[100,400]}
                      height={height -140}
                      friction={0.9}
                  >
                      <View style={{ flex: 1, backgroundColor: '#000', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, }}>
                          <View style={styles.PanelHandle}></View>
                              <View style={styles.cart}>
                                  <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', flex:1 }}>Giỏ hàng</Text>
                                  <View style={styles.bgCart}>
                                      <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold'}}>{amount}</Text>
                                  </View>
                                  <TouchableOpacity onPress={()=>{setCartItem([]);setAmount(0);setPrice(0)}}>
                                    <Icon
                                      name="trash-o"
                                      size={40}
                                      color="white"
                                    />
                                  </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: 8 ,flex:1}}>
                                <FlatList
                                    data={cartItem}
                                    keyExtractor={item => `${item.id}`}
                                    renderItem={({ item }) => <CartItem data={item}/>}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                              </View>
                              <View style={{marginBottom:20}} >
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
                                {amount == 0?undefined:(
                                  <View style={{marginTop:10}}>
                                    <Text style={{color:'white',marginLeft:10}}>Bạn muốn lấy khi nào</Text>
                                    <View style={{flexDirection:'row'}}>
                                        {time==0?(
                                          <TouchableOpacity style={styles.roleBorderOnSet}>
                                            <Text style={{color:'white'}}>Bây giờ</Text>
                                          </TouchableOpacity>
                                        ):(
                                          <TouchableOpacity style={styles.roleBorder} onPress={()=>setTime(0)}>
                                            <Text style={{color:'white'}}>Bây giờ</Text>
                                          </TouchableOpacity>
                                        )}
                                        {time==30?(
                                          <TouchableOpacity style={styles.roleBorderOnSet}>
                                            <Text style={{color:'white'}}>Sau 30p</Text>
                                          </TouchableOpacity>
                                        ):(
                                          <TouchableOpacity style={styles.roleBorder} onPress={()=>setTime(30)}>
                                            <Text style={{color:'white'}}>Sau 30p</Text>
                                          </TouchableOpacity>
                                        )}
                                        {time==60?(
                                          <TouchableOpacity style={styles.roleBorderOnSet}>
                                            <Text style={{color:'white'}}>Sau 1h</Text>
                                          </TouchableOpacity>
                                        ):(
                                          <TouchableOpacity style={styles.roleBorder} onPress={()=>setTime(60)}>
                                            <Text style={{color:'white'}}>Sau 1h</Text>
                                          </TouchableOpacity>
                                        )}
                                        {time==120?(
                                          <TouchableOpacity style={styles.roleBorderOnSet}>
                                            <Text style={{color:'white'}}>Sau 2h</Text>
                                          </TouchableOpacity>
                                        ):(
                                          <TouchableOpacity style={styles.roleBorder} onPress={()=>setTime(120)}>
                                            <Text style={{color:'white'}}>Sau 2h</Text>
                                          </TouchableOpacity>
                                        )}
                                    </View>
                                  <View style={{ alignSelf: 'center' }}>
                                      <TouchableOpacity activeOpacity={0.7} onPress={()=>order()}>
                                          <View style={styles.customButton}>
                                              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                                  Đặt hàng
                                              </Text>
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                </View>
                                )}
                              </View>
                      </View>
                  </SlidingUpPanel>
              </View >
              </Animatable.View>
            )}
          </View >
      </>
    );
}




const Canteen = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Canteen"
                component={CanteenScreen}
                options={{
                    title: 'Căn Tin',
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name="md-arrow-back" size={24} color="#434c73" style={{ paddingHorizontal: 18 }} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="Detail Canteen" component={DetailCanteen}
                options={({ route }) => ({
                    headerTransparent: true,
                    headerTitleStyle: { color: '#000' },
                    headerTitleAlign: "center",
                    headerTintColor: '#000',
                    // title: route.params.detail.name
                    title: null
                })}
            />
        </Stack.Navigator>
    );
}

export default Canteen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9faff',
    },
    PanelHandle: {
        height: 5,
        width: 50,
        backgroundColor: '#666',
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 6,
    },
    cart: {
        flexDirection: 'row',
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
        marginHorizontal:10
    },
    panelCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 12,
    },
    totalCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 160,
        marginHorizontal: 22,
    },
    customButton: {
        marginTop: 25,
        backgroundColor: '#febc40',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 280,
        height: 50,
    },
    searchContainer: {
        backgroundColor: '#f9faff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roleBorder:{
      marginHorizontal:10,
      borderColor:'white',
      borderWidth:2,
      padding:10,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center',
      marginVertical:5
    },
    roleBorderOnSet:{
      marginHorizontal:10,
      borderColor:'#febc40',
      borderWidth:2,
      padding:10,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center',
      marginVertical:5
    },
    logo:{
        width:80,
        height:80
    },
})
