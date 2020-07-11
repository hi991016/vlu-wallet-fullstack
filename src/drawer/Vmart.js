import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {  Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import VmartItem from '../component/VmartItem';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import axios from 'axios';

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
    const [products, setProducts] = React.useState([]);
    const [fullProducts, setFullProducts] = React.useState([]);
    const [keyword, setKeyword] = React.useState('');
    const [load, setLoad] = React.useState(false);
    React.useEffect(() => {
      setLoad(true);
      axios.get('https://vlu-ewallet.herokuapp.com/market-manager/getData').then(res =>{
         setFullProducts(res.data);
         setProducts(res.data);
         setLoad(false);
       }).catch(err =>{
           console.error(err);
        })

    }, []);
    function searchFilterFunction(text){
      setKeyword(text)
      const newData = fullProducts.filter(item => {
        const itemData = `${item.name}` +'';
        const textData = text.toLowerCase();
        return itemData.toLowerCase().indexOf(textData) > -1;
      });
      setProducts(newData);
    };
    return (
        <View style={styles.container}>
          {load?(
            <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
              animation='bounceIn'>
              <LottieView style={{width:200}} source={require('../../anim/2469-dino-dance.json')} autoPlay loop />
            </Animatable.View>
          ):(
            <Animatable.View animation='fadeInUpBig'>
                <FlatList
                    data={formatData(products, 2)}
                    numColumns={2}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({ item }) => <VmartItem data={item} onPress={() => {}} />}
                    contentContainerStyle={{ paddingLeft: 11, paddingRight: 11 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<SearchBar placeholder='Tìm kiếm...' value={keyword}
                       containerStyle={{backgroundColor:'#fff'}}
                       onChangeText={(text)=>searchFilterFunction(text)}
                       lightTheme round />}
                />
            </Animatable.View>
          )}
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
