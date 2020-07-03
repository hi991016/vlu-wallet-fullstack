import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.BackgroundContainer}>
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={require("./component/asset/avatar.jpg")} style={styles.image} resizeMode="center" />
                            </View>
                            <View style={styles.edit}>
                                <TouchableOpacity>
                                    <AntDesign name="edit" size={20} color="#fff" style={{ marginTop: -2, marginLeft: 0 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={{ color: '#1f2233', fontWeight: "200", fontSize: 23 }}>Cáo</Text>
                            <Text style={{ color: '#1683fc', fontSize: 14 }}>phu.t170110@vanlanguni.vn</Text>
                        </View>
                        <View style={styles.balanceContainer}>
                            <Text style={{ fontWeight: "500", color: '#77777a', fontSize: 15 }}>Balance</Text>
                            {/* style={{backgroundColor: '#0986e6', paddingHorizontal: 10, borderRadius: 120}} */}
                            <Text style={{ fontWeight: "bold", color: "#0c1236", fontSize: 40 }}>$1016</Text>
                        </View>
                    </View>
                    <View style={styles.setting}>
                        <TouchableOpacity>
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18 }]}>My QR Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.text, { color: "red", fontSize: 18, marginTop: 18, }]}>Log Out</Text>
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
})
