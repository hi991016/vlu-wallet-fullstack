import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, StatusBar,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/HomeScreen';
import DrawerContent from './src/component/DrawerContent';
import Vmart from './src/drawer/Vmart';
import Library from './src/drawer/Library';
import Canteen from './src/drawer/Canteen';
const Drawer = createDrawerNavigator();

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
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
