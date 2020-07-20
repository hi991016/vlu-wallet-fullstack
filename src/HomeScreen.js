import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScanScreen from './ScanScreen';
import PaymentParking from './PaymentParking';
import PaymentScreen from './PaymentScreen';
import ProfileScreen from './ProfileScreen';
import ButtonScan from './component/ButtonScan';
import Home from './component/Home';
import PayNowScreen from './PayNowScreen';
import AddMoneyScreen from './AddMoneyScreen';
import CardScreen from './CardScreen';
import HistoryScreen from './HistoryScreen';
import Infochart from './Infochart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';

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
                <Tab.Screen name=" " component={StackScan} />
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
                    title:'Voucher',
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
                    title:'Ví Tiền',
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
            <Stack.Screen name="History" component={HistoryTab}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

const TopTab = createMaterialTopTabNavigator();

function HistoryTab({ navigation }) {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Lịch sử" component={HistoryScreen} />
      <TopTab.Screen name="Thống kê" component={Infochart} />
    </TopTab.Navigator>
  );
}

function StackProfile({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={{
                    title:'Thông tin tài khoản',
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
                    title:'Đổi mật khẩu',
                    headerStyle: {
                        backgroundColor: "#e1e6ea",
                    },
                    headerTitleStyle: { color: '#434c73' },
                    headerTitleAlign: "center",
                    headerTintColor: '#434c73',
                }}
            />
            <Stack.Screen name="EditProfile" component={EditProfile}
                options={{
                    title:'Chỉnh sửa thông tin',
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


function StackScan({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CameraScan" component={ScanScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen name="PaymentParking" component={PaymentParking}
                options={{headerShown: false}}
            />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen}
                options={{headerShown: false}}
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
