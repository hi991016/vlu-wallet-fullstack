import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import LibraryItem from '../component/LibraryItem';

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
const data3 = [
    {
        id: '1',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '2',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '3',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '4',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '5',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '6',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '7',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
    {
        id: '8',
        name: 'The Litter Prince',
        price: '$45.99',
        image: require('../../assets/littleprince.png'),
    },
]

function LibraryScreen() {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={formatData(data3, 2)}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <LibraryItem data={item} onPress={() => { }} />}
                    contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View >
    );
}

const Library = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    title: 'Library',
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

export default Library

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
