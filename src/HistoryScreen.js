import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SearchBar } from 'react-native-elements';

const data = [
    {
        id: '1',
        title: 'Vmart',
        day: '19/06/2020',
        list: 'Monster, Mì hảo hảo',
        money: '$106',
        avatar: require('../assets/avatar.jpg')
    },
    {
        id: '2',
        title: 'Vmart',
        day: '10/06/2020',
        list: '7up, Phồng tôm',
        money: '$42',
        avatar: require('../assets/avatar.jpg')
    },
    {
        id: '3',
        title: 'Bike',
        day: '10/06/2020',
        money: '$3',
        avatar: require('../assets/avatar.jpg')
    },
    {
        id: '4',
        title: 'Vmart',
        day: '01/06/2020',
        list: 'OK',
        money: '$25',
        avatar: require('../assets/avatar.jpg')
    },
    {
        id: '5',
        title: 'Bike',
        day: '01/06/2020',
        money: '$3',
        avatar: require('../assets/avatar.jpg')
    },
    {
        id: '6',
        title: 'Bike',
        day: '01/06/2020',
        money: '$3',
        avatar: require('../assets/avatar.jpg')
    },
]
export default class HistoryScreen extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <View>
                        <SearchBar
                            placeholder="Search here"
                            onChangeText={this.updateSearch}
                            value={search}
                            lightTheme round
                            containerStyle={styles.searchContainer}
                        />
                    </View>
                    <View style={styles.panelBody}>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <>
                                        <View style={styles.panelContainer}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                                <View>
                                                    <Image source={item.avatar} style={styles.panelAvatar} />
                                                </View>
                                                <View style={styles.panelInfo}>
                                                    <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>{item.title}</Text>
                                                    <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>{item.day}</Text>
                                                    <Text numberOfLines={3} style={{ fontSize: 11, color: '#6c6c6c' }}>{item.list}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ fontSize: 18, color: '#1f2233', marginHorizontal: 2, fontWeight: 'bold' }}>{item.money}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelContainer: {
        borderWidth: 0.8,
        borderColor: '#666',
        padding: 14,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 15,
        marginTop: 15,
    },
    panelAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    panelInfo: {
        paddingHorizontal: 15,
        flex: 1,
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
