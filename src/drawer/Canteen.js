import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import CanteenItem from '../component/CanteenItem';
import DetailCanteen from '../DetailCanteen';
import SlidingUpPanel from 'rn-sliding-up-panel';
const { height } = Dimensions.get("window");

const data = [
    {
        id: '1',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '2',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '3',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '4',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '5',
        name: 'Bounce Rice',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '6',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '7',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
    {
        id: '8',
        name: 'Rice with Grilled Pork Chop',
        price: '$7.99',
        image: require('../../assets/rice.jpg'),
    },
]
const Stack = createStackNavigator();

const _draggedValue = new Animated.Value(180);

const formatData = (data, numColumns) => {
    const full = Math.floor(data.length / numColumns);
    let numLastRow = data.length - (full * numColumns);
    while (numLastRow !== numColumns && numLastRow !== 0) {
        data.push({ _id: numLastRow, empty: true });
        numLastRow++;
    }
    return data;
};

function CanteenScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={formatData(data, 2)}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CanteenItem data={item} onPress={() => { navigation.navigate('Detail Canteen', { detail: item }); }} />}
                    contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={{ flex: 1 }}>
                <SlidingUpPanel
                    ref={null}
                    draggableRange={{ top: height - 170, bottom: 32 }}        
                    backdropOpacity={0}
                    animatedValue={_draggedValue}
                    snappingPoints={[360]}
                    height={height + 20}
                    friction={0.9}
                >
                    <View style={{ flex: 1, backgroundColor: '#000', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10 }}>
                        <View style={styles.PanelHandle}></View>
                        <ScrollView>
                            
                        </ScrollView>
                    </View>
                </SlidingUpPanel>
            </View >
        </View >
    );
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
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                    title: route.params.detail.name
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
})
