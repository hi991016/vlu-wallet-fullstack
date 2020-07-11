import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundHeader from './component/BackgroundHeader'
import { BarCodeScanner } from 'expo-barcode-scanner';
import IonIcons from 'react-native-vector-icons/Ionicons';
const ScanScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      console.log(data)
    };

    if (hasPermission === null) {
      return <Text>Kiểm tra thông tin cấp quyền</Text>;
    }
    if (hasPermission === false) {
      return <Text>Không thể dùng camera</Text>;
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
              <BarCodeScanner
                style={{position:'absolute'}}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
              <IonIcons name='ios-qr-scanner' size={300} color='#fff' />
            </View>
        </>
    )
}

export default ScanScreen

const styles = StyleSheet.create({})
