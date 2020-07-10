import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar ,AsyncStorage,Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
var jwtDecode = require('jwt-decode');
import { useFocusEffect } from '@react-navigation/native';
const ProfileScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [wallet, setWallet] = React.useState(-1);
  const [avatar, setAvatar] = React.useState('');
  const [sname, setSname] = React.useState('');

  React.useEffect(() => {
    if(wallet == -1){
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
          setName(decoded.name);
          setEmail(decoded.email);
          setAvatar(decoded.avatar);
          setWallet(decoded.wallet);
      });
    }else{
      let subname = name.split(' ');
      if(subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
      else  setSname(subname[0].charAt(0));
    }
  }, [wallet]);
  //  <Image source={require("./component/asset/avatar.jpg")} style={styles.image} resizeMode="center"/>
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
          setName(decoded.name);
          setEmail(decoded.email);
          setAvatar(decoded.avatar);
          setWallet(decoded.wallet);
      });
    }, [])
  );
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.BackgroundContainer}>
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                              {avatar==''?(
                                <Avatar
                                 size="large"
                                  containerStyle={{backgroundColor:"#BCBEC1"}}
                                  rounded
                                  title={sname}
                                  activeOpacity={0.7}/>
                                ):(
                                  <Image source={{uri:avatar}} style={styles.image} resizeMode="center" />
                                )}
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={{ color: '#1f2233', fontWeight: "200", fontSize: 23 }}>{name}</Text>
                            <Text style={{ color: '#1683fc', fontSize: 14 }}>{email}</Text>
                        </View>
                        <View style={styles.balanceContainer}>
                            <Text style={{ fontWeight: "500", color: '#77777a', fontSize: 15 }}>Số dư</Text>
                            {/* style={{backgroundColor: '#0986e6', paddingHorizontal: 10, borderRadius: 120}} */}
                            <Text style={{ fontWeight: "bold", color: "#0c1236", fontSize: 40 }}>{wallet}đ</Text>
                        </View>
                    </View>
                    <View style={styles.setting}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Card Visit')}}>
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18 }]}>Xuất thông tin(QR)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }} >
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Sửa thông tin cá nhân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        borderRadius: 360,
        width: 85,
        height: 85,
    },
    profileImage: {
        marginTop: -75,
        overflow: 'hidden'
    },
    edit: {
        backgroundColor: "#222",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 35,
        height: 35,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 5,
    },
    BackgroundContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 70,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 5,
        marginHorizontal: 20,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    balanceContainer: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
    },
    setting: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
     borderRadius: 360,
     width: 90,
     height: 90,
   }
})
