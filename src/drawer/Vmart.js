import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {  Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import VmartItem from '../component/VmartItem';

const data2 = [
    {
        id: '1',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '2',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '3',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '4',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '5',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '6',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '7',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
    {
        id: '8',
        name: 'Socola',
        price: '$5.99',
        image: require('../../assets/socola.png'),
    },
]

const Stack = createStackNavigator();

const formatData = (data, numColumns) => {
    const full = Math.floor(data.length / numColumns);
    let numLastRow = data.length - (full * numColumns);
    while (numLastRow !== numColumns && numLastRow !== 0) {
        data.push({ _id: numLastRow, empty: true });
        numLastRow++;
    }
    return data;
};

function VmartScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={formatData(data2, 2)}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <VmartItem data={item} onPress={() => {}} />}
                    contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View >
    );
}

const Vmart = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Vmart"
                component={VmartScreen}
                options={{
                    title: 'Vmart',
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color="#434c73" style={{ paddingHorizontal: 18 }} />
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default Vmart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
