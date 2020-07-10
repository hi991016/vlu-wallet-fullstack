import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions,AsyncStorage } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import BackgroundHeader from './BackgroundHeader';
import MenuItem from './MenuItem';
import { useFocusEffect } from '@react-navigation/native';
var jwtDecode = require('jwt-decode');
function Home({ navigation }) {
    const [category] = React.useState([
        {
            id: '1',
            title: 'Pay Now',
            icon: require('./asset/payment.png'),
            image: require('./asset/menu1.png'),
        },
        {
            id: '2',
            title: 'Add Money',
            icon: require('./asset/paynow.png'),
            image: require('./asset/menu2.png'),
        },
        {
            id: '3',
            title: 'Card Visit',
            icon: require('./asset/card.png'),
            image: require('./asset/menu3.png'),
        },
        {
            id: '4',
            title: 'History',
            icon: require('./asset/history.png'),
            image: require('./asset/menu4.png'),
        },
    ]);
    const [entry, setEntry] = React.useState('');
    const [name, setName] = React.useState('');
    const [wallet, setWallet] = React.useState(-1);
    const [avatar, setAvatar] = React.useState('');
    const [sname, setSname] = React.useState('');
    React.useEffect(() => {
      if(wallet == -1){
        const now = new Date();
        if(now.getHours() < 5 || now.getHours() > 18) setEntry('Buổi tối ấm áp')
        else if(now.getHours() >= 5 && now.getHours() <11) setEntry('Chào buổi sáng')
        else setEntry('Buổi chiều vui vẻ')
        AsyncStorage.getItem('userToken', (err, result) => {
          var decoded = jwtDecode(result);
            setName(decoded.name);
            setAvatar(decoded.avatar);
            setWallet(decoded.wallet);
        });
      }else{
        let subname = name.split(' ');
        if(subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
        else  setSname(subname[0].charAt(0));
      }
    }, [wallet]);
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem('userToken', (err, result) => {
          var decoded = jwtDecode(result);
            setName(decoded.name);
            setAvatar(decoded.avatar);
            setWallet(decoded.wallet);
        });
      }, [])
    );
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <BackgroundHeader style={styles.bg} />
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.heading}>{entry}</Text>
                        <Text style={styles.desc}>{name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Profile') }}>
                        {avatar==''?(
                          <Avatar
                           size="medium"
                            containerStyle={{backgroundColor:"#BCBEC1"}}
                            rounded
                            title={sname}
                            activeOpacity={0.7}/>
                          ):(
                            <Image source={{uri:avatar}} style={styles.image} resizeMode="center" />
                          )}
                    </TouchableOpacity>
                </View>
                <View style={styles.totalContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={styles.totalInfo}>
                            <Text numberOfLines={3} style={{ color: '#068af7', fontWeight: '700', fontSize: 30 }}>{wallet}đ</Text>
                            <Text style={{ color: '#9c9c9c' }}>trong tài khoản</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', }}>
                        <Image source={require('../../assets/savemoney.jpg')} style={styles.img2} />
                    </View>
                </View>
                <View style={styles.ListItem}>
                    <View >
                        <Text style={styles.option}>Select an Option</Text>
                    </View>
                    <View>
                    <FlatList
                        data={category}
                        renderItem={({ item }) => <MenuItem category={item} onPress={() => {
                            switch (item.id) {
                                case '1': navigation.navigate('Pay Now'); break;
                                case '2': navigation.navigate('Add Money'); break;
                                case '3': navigation.navigate('Card Visit'); break;
                                case '4': navigation.navigate('History'); break;
                                default: break;
                            }
                        }
                        }
                        />}
                        key={2}
                        numColumns={2}
                        keyExtractor={item => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                    </View>
                </View>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ListItem: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 13,
    },
    option: {
        marginTop: 8,
        fontSize: 13,
        marginHorizontal: 12,
        color: '#a8adab',
        fontWeight: "500"
    },
    bg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 210,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        paddingHorizontal: 25,
        marginTop: 40,
    },
    heading: {
        fontSize: 18,
        color: '#fff',
    },
    desc: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 0,
    },
    totalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5.5,
    },
    img2: {
        width: 110,
        height: 60,
    },
    totalInfo: {
        flex: 1,
        paddingHorizontal: 5,
    },
    image: {
       borderRadius: 100,
       width: 55,
       height: 55
     }
})
