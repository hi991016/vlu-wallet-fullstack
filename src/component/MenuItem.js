import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

function MenuItem(props) {
    const { category, onPress } = props;
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <TouchableOpacity activeOpacity={0.5} style={styles.itemBtn} onPress={onPress}>
                    <ImageBackground source={category.image} style={styles.bgImage}>
                        <View style={styles.center}>
                            <Image style={styles.icon} source={category.icon} />
                            <Text style={styles.title}>{category.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        padding: 10,
    },
    itemBtn: {
        backgroundColor: 'gray',
        borderRadius: 10,
        minHeight: 120,
        overflow: "hidden",
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        marginTop: 20,
        width: 53,
        height: 53,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
    },
    bgImage: {
        flex: 1,
        borderRadius: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
