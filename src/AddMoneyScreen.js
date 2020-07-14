import React from 'react'
import { StyleSheet, Text, View, Image ,AsyncStorage} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
var jwtDecode = require('jwt-decode');
import axios from 'axios';
import LottieView from 'lottie-react-native';
var coin = require('./component/asset/coin.png');
import NumberFormat from 'react-number-format';
const AddMoneyScreen = ({navigation}) => {
    const [wallet, setWallet] = React.useState(-1);
    const [username, setUsername] = React.useState('');
    const [load, setLoad] = React.useState(false);
    const [finishLoad, setFinishLoad] = React.useState('');
    React.useEffect(() => {
      getMoney();
    }, []);
    function getMoney(){
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
          setUsername(decoded.user);
          setWallet(decoded.wallet);
      });
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#7f7fd5', '#86a8e7', '#91eae4']}
                    style={{ width: 280, height: 210, borderRadius: 20 }}
                >
                {load?(
                  <View style={styles.inside}>
                    <LottieView style={{width:200}} source={require('../anim/448-ripple-loading-animation.json')} autoPlay loop />
                  </View>
                ):(
                  <View style={styles.inside}>
                      <Text style={{ color: '#fff', fontSize: 15 }}>Số dư</Text>
                      <View style={{ paddingHorizontal: 20 }}>
                      <NumberFormat
                         value={wallet}
                         displayType={'text'}
                         thousandSeparator={true}
                         suffix={' đ'}
                         renderText={formattedValue => <Text numberOfLines={3} style={{ color: '#fff', fontSize: 45, fontWeight: 'bold', textAlign: 'center' }}>{formattedValue}</Text>} // <--- Don't forget this!
                       />
                      </View>
                  </View>
                )}

                </LinearGradient>
                </View>
                <View style= {{flex: 1, marginTop: -180}}>
                    <Image source={coin} style={{ width: 355, height: 170 }} />
                </View>
                <View style={{ flex: 1, marginTop: 280 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>checkMoney()}>
                    <View style={styles.customButton}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>
                            Kiểm tra tiền
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </>
    );
    function checkMoney(){
      setLoad(true)
      if(username =='' ){
        setLoad(false);
        return;
      }
      axios.post('https://vlu-ewallet.herokuapp.com/user-login/refreshtoken', {
         username:username,
       }).then(res =>{
           AsyncStorage.setItem('userToken',res.data);
           getMoney();
           setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
}

export default AddMoneyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inside: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customButton: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 280,
        height: 75,
    }
})
