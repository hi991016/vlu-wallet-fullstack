import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Paragraph,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialCommunityIcons, Feather, AntDesign, } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrawerContent = (props) => {
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
                                    <Avatar.Image
                                        // source={{
                                        //     uri: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.0-9/p960x960/52605935_934151033454704_7951083993703645184_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_oc=AQlA-rPeV0To6VOr7fiIPrV3nGrQ70QaKmtjvOBaKEj3SvPULbmkDVg0h3W_z3Jmz5jwa6GngayIZkbJVCSTAlsz&_nc_ht=scontent.fsgn2-6.fna&_nc_tp=6&oh=10861eb536322399e8273b85ed6f56cc&oe=5EFAFD50',
                                        // }}
                                        source={
                                            require('../../assets/avatar.jpg')
                                        }
                                        size={50}
                                    />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 15, flexDirection: 'column', marginTop: -4 }}>
                                    <Title style={styles.title}>Cáo</Title>
                                    <Caption style={styles.caption}>@vanlanguni.vn</Caption>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Balance: </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>$1016</Paragraph>
                                </View>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Point: </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>11</Paragraph>
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
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <AntDesign name="user" color='#1f2233' size={size} />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                            labelStyle={{ color: '#1f2233' }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialCommunityIcons name="food" color='#1f2233' size={size} />
                            )}
                            label="Canteen"
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
                            label="Library"
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
                    label="Log Out"
                    labelStyle={{ fontWeight: 'bold', color: '#1f2233' }}
                // onPress={() => {}}
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
})
