import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundHeader from './BackgroundHeader';
import MenuItem from './MenuItem';

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
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <BackgroundHeader style={styles.bg} />
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.heading}>Hello again, </Text>
                        <Text style={styles.desc}>Cáo Fennec</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Profile') }}>
                        <Image source={require('../../assets/avatar.jpg')} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.totalContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={styles.totalInfo}>
                            <Text numberOfLines={3} style={{ color: '#068af7', fontWeight: '700', fontSize: 30 }}>$1016</Text>
                            <Text style={{ color: '#9c9c9c' }}>in your account</Text>
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
    img: {
        marginTop: 5,
        width: 50,
        height: 50,
        borderRadius: 15,
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
    }
})
