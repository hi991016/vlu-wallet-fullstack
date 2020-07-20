import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar,AsyncStorage } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import axios from 'axios';
var jwtDecode = require('jwt-decode');
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import HistoryItem from './component/HistoryItem';
const HistoryScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    if(username==''){
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
          setUsername(decoded.user);
      });
    }else{
    setLoad(true);
    axios.post('https://vlu-ewallet.herokuapp.com/payment/historyUser',{
      username:username
    }).then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
    }
  }, [username]);
  return (
          <>
            <StatusBar barStyle="light-content" />
            {load?(
              <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
                animation='bounceIn'>
                <LottieView style={{width:200}} source={require('../anim/2469-dino-dance.json')} autoPlay loop />
              </Animatable.View>
            ):(
              <Animatable.View animation='fadeInUpBig' style={styles.container}>
                  <View style={styles.panelBody}>
                      <FlatList
                          style={{marginBottom:30}}
                          data={data}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<HistoryItem data={item} onPress={() => {}} />)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </Animatable.View>
            )}
          </>
      )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelBody: {
        flex: 1,
    },
    searchContainer: {
        backgroundColor: '#fff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
