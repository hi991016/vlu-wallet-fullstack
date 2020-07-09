import React from 'react'
import { StyleSheet, Text, View,AsyncStorage } from 'react-native'
import QRCode from 'react-native-qrcode-generator';
var jwtDecode = require('jwt-decode');
const CardScreen = () => {
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [wallet, setWallet] = React.useState(-1);
    const [info, setInfo] = React.useState('');
    React.useEffect(() => {
      if(name!='' && email !='' && username!=''&&wallet != -1) setInfo('Ten tai khoan:' + username +'\nTen:' + name +'\nEmail:' + email + '\nSo du:' + wallet);
      else{
        AsyncStorage.getItem('userToken', (err, result) => {
          var decoded = jwtDecode(result);
            setUsername(decoded.user);
            setName(decoded.name);
            setEmail(decoded.email);
            setWallet(decoded.wallet);
        });
      }
    }, [wallet]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          {info!=''?(  <QRCode
              value={info}
              size={300}
              bgColor='black'
              fgColor='white'/>):undefined}
        </View>
    )
}

export default CardScreen

const styles = StyleSheet.create({})
