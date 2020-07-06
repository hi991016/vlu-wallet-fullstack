import 'react-native-gesture-handler';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, StatusBar,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import DrawerContent from './src/component/DrawerContent';
import Vmart from './src/drawer/Vmart';
import Library from './src/drawer/Library';
import Canteen from './src/drawer/Canteen';
import LoginSplash from './src/drawer/loginSplash';
import SignUp from './src/drawer/signUp';
import SignIn from './src/drawer/signIn';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer style={styles.container}>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
          <Drawer.Screen name="Canteen" component={Canteen} />
          <Drawer.Screen name="Vmart" component={Vmart} />
          <Drawer.Screen name="Library" component={Library} />
          <Drawer.Screen name="StackLogin" component={StackLogin} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

function StackLogin({navigation}) {
  return (
    <Stack.Navigator>
       <Stack.Screen name="LoginSplash" component={LoginSplash}
       options={{headerShown: false}}/>
       <Stack.Screen name="SignUp" component={SignUp}
       options={{headerShown: false}}/>
       <Stack.Screen name="SignIn" component={SignIn}
       options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
