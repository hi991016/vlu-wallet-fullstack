import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Image, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import CanteenItem from '../component/CanteenItem';
import DetailCanteen from '../component/DetailCanteen';
import SlidingUpPanel from 'rn-sliding-up-panel';

const { height } = Dimensions.get("window");

const data = [
    {
        id: '1',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '2',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '3',
        name: 'Bounce Rice',
        price: '$11.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '4',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '5',
        name: 'Bounce Rice',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '6',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '7',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
    {
        id: '8',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.png'),
    },
]
const Stack = createStackNavigator();

const _draggedValue = new Animated.Value(90);

const formatData = (data, numColumns) => {
    const full = Math.floor(data.length / numColumns);
    let numLastRow = data.length - (full * numColumns);
    while (numLastRow !== numColumns && numLastRow !== 0) {
        data.push({ _id: numLastRow, empty: true });
        numLastRow++;
    }
    return data;
};

class CanteenScreen extends React.Component {
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
                <View>
                    <SearchBar
                        placeholder="Search here"
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme round
                        containerStyle={styles.searchContainer}
                    />
                </View>
                <View style={styles.container}>
                    <View>
                        <FlatList
                            data={formatData(data, 2)}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <CanteenItem data={item} onPress={() => { this.props.navigation.navigate('Detail Canteen', { detail: item }); }} />}
                            contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <SlidingUpPanel
                            ref={null}
                            draggableRange={{ top: height - 140, bottom: 30 }}
                            backdropOpacity={0}
                            animatedValue={_draggedValue}
                            snappingPoints={[360]}
                            height={height + 20}
                            friction={0.9}
                        >
                            <View style={{ flex: 1, backgroundColor: '#000', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, }}>
                                <View style={styles.PanelHandle}></View>
                                <ScrollView>
                                    <View style={styles.cart}>
                                        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', }}>Cart</Text>
                                        <View style={styles.bgCart}>
                                            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>2</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 8 }}>
                                        <View style={styles.panelCart}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Image source={require('../../assets/rice.png')} style={{ width: 70, height: 70, borderRadius: 120 }} />
                                                <Text style={{ color: '#fff', fontSize: 17 }}>1</Text>
                                                <Text style={{ color: '#fff', fontSize: 17 }}>x</Text>
                                            </View>
                                            <View style={{ flex: 1, paddingHorizontal: 25 }}>
                                                <Text numberOfLines={3} style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Rice with Grilled Pork Chop</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: '#919090', fontSize: 17 }}>$7.99</Text>
                                            </View>
                                        </View>
                                        <View style={styles.panelCart}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Image source={require('../../assets/rice.png')} style={{ width: 70, height: 70, borderRadius: 120 }} />
                                                <Text style={{ color: '#fff', fontSize: 17 }}>1</Text>
                                                <Text style={{ color: '#fff', fontSize: 17 }}>x</Text>
                                            </View>
                                            <View style={{ flex: 1, paddingHorizontal: 25 }}>
                                                <Text numberOfLines={3} style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Bounce Rice</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: '#919090', fontSize: 17 }}>$11.99</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.totalCart}>
                                        <Text style={{ color: '#919090', fontSize: 25 }}>Total:</Text>
                                        <Text style={{ color: '#fff', fontSize: 33, fontWeight: 'bold' }}>$19.98</Text>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <TouchableOpacity activeOpacity={0.7}>
                                            <View style={styles.customButton}>
                                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                                    Order
                                        </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </SlidingUpPanel>
                    </View >
                </View >
            </>
        );
    }
}


const Canteen = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Canteen"
                component={CanteenScreen}
                options={{
                    title: 'Canteen',
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name="md-arrow-back" size={24} color="#434c73" style={{ paddingHorizontal: 18 }} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="Detail Canteen" component={DetailCanteen}
                options={({ route }) => ({
                    headerTransparent: true,
                    headerTitleStyle: { color: '#000' },
                    headerTitleAlign: "center",
                    headerTintColor: '#000',
                    // title: route.params.detail.name
                    title: null
                })}
            />
        </Stack.Navigator>
    );
}

export default Canteen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9faff',
    },
    PanelHandle: {
        height: 5,
        width: 50,
        backgroundColor: '#666',
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 6,
    },
    cart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    bgCart: {
        backgroundColor: '#febc40',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 120,
        width: 55,
        height: 55,
    },
    panelCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 12,
    },
    totalCart: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 160,
        marginHorizontal: 22,
    },
    customButton: {
        marginTop: 35,
        backgroundColor: '#febc40',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 280,
        height: 50,
    },
    searchContainer: {
        backgroundColor: '#f9faff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
