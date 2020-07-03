import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from './ScanScreen';
import ProfileScreen from './ProfileScreen';
import ButtonScan from './component/ButtonScan';
import Home from './component/Home';
import PayNowScreen from './PayNowScreen';
import AddMoneyScreen from './AddMoneyScreen';
import CardScreen from './CardScreen';
import HistoryScreen from './HistoryScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';
import ChangePassword from './ChangePassword';

const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home';
                        } else if (route.name === ' ') {
                            return <ButtonScan />
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'user' : 'user';
                        }
                        return <AntDesign name={iconName} size={31} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#4f8cf8',
                    inactiveTintColor: '#b4b4b4',
                    showLabel: true,
                    style: {
                        backgroundColor: '#fdfdfd',
                    },
                }}
            >
                <Tab.Screen name="Home" component={StackScreen} />
                <Tab.Screen name=" " component={ScanScreen} />
                <Tab.Screen name="Profile" component={StackProfile} />
            </Tab.Navigator>
        )
    }
}

const Stack = createStackNavigator();

function StackScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Feather name="menu" size={25} color="#fff" style={{ paddingHorizontal: 20 }} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="Pay Now" component={PayNowScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
            <Stack.Screen name="Add Money" component={AddMoneyScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
            <Stack.Screen name="Card Visit" component={CardScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
            <Stack.Screen name="History" component={HistoryScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
        </Stack.Navigator>
    )
}

function StackProfile({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Feather name="menu" size={25} color="#434c73" style={{ paddingHorizontal: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="ChangePassword" component={ChangePassword}
                options={{
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
})
