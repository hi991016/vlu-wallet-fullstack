import React from 'react';
import { View, StyleSheet, ImageBackground,AsyncStorage,Image,Text } from 'react-native';
import {
    Title,
    Caption,
    Drawer,
    Paragraph,
} from 'react-native-paper';
import { Avatar } from 'react-native-elements';
var jwtDecode = require('jwt-decode');
import NumberFormat from 'react-number-format';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialCommunityIcons, Feather, AntDesign, } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const DrawerContent = (props) => {
    const{onPress} = props;
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [wallet, setWallet] = React.useState(-1);
    const [point, setPoint] = React.useState(-1);
    const [sname, setSname] = React.useState('');
    React.useEffect(() => {
        AsyncStorage.getItem('userToken', (err, result) => {
          var decoded = jwtDecode(result);
            setUsername(decoded.user);
            setName(decoded.name);
            setEmail(decoded.email);
            setAvatar(decoded.avatar);
            setWallet(decoded.wallet);
            setPoint(decoded.point);
        });
          let subname = name.split(' ');
          if(subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
          else  setSname(subname[0].charAt(0));

    } );
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <ImageBackground
                        source={require('../component/asset/drawer.jpg')}
                        style={{ width: undefined, paddingBottom: 22, marginTop: -8 }}
                        resizeMode='cover'
                    // imageStyle={{opacity: 0.5}} backgroundColor(0, 0, 0, 0.5)
                    >
                        <View style={styles.userInfo}>
                            <View style={{ flexDirection: 'row', marginTop: 35 }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => { props.navigation.navigate('Profile') }}>
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
                                <View style={{ marginLeft: 15, flexDirection: 'column', marginTop: -4 }}>
                                    <Title style={styles.title}>{name}</Title>
                                    <Caption style={styles.caption}>{email}</Caption>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Số dư: </Caption>
                                    <NumberFormat
                                       value={wallet}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       suffix={' ₫'}
                                       renderText={formattedValue => <Text style={[styles.paragraph, styles.caption]}>{formattedValue}</Text>} // <--- Don't forget this!
                                     />
                                </View>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>VPoint: </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>{point}</Paragraph>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    {/* <Drawer.Section style={{ marginTop: 22 }}></Drawer.Section> */}
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <AntDesign name="home" color='#1f2233' size={size} />
                            )}
                            label="Trang Chủ"
                            onPress={() => { props.navigation.navigate('Home') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <AntDesign name="user" color='#1f2233' size={size} />
                            )}
                            label="Thông Tin Tài Khoản"
                            onPress={() => { props.navigation.navigate('Profile') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialCommunityIcons name="food" color='#1f2233' size={size} />
                            )}
                            label="Căn Tin"
                            onPress={() => { props.navigation.navigate('Canteen') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialCommunityIcons name="store" color='#1f2233' size={size} />
                            )}
                            label="Vmart"
                            onPress={() => { props.navigation.navigate('Vmart') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <Feather name="book" color='#1f2233' size={size} />
                            )}
                            label="Thư Viện"
                            onPress={() => { props.navigation.navigate('Library') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawer}>
             <DrawerItem
                  icon={({ size }) => (
                      <AntDesign name="poweroff" color='#1f2233' size={size} />
                  )}
                  label="Đăng Xuất"
                  labelStyle={{ fontWeight: 'bold', color: '#1f2233' }}
                  onPress={onPress}
              />

            </Drawer.Section>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfo: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        // fontWeight: 'bold',
        color: '#fff'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#fff'
    },
    drawerSection: {
        marginTop: 10,
    },
    bottomDrawer: {
        marginBottom: 0,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    image: {
       borderRadius: 360,
       width: 55,
       height: 55
     }
})
