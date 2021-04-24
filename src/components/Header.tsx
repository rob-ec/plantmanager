import React from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/avatar.jpg';

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Rob</Text>
            </View>

            <Image style={styles.userImg} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontFamily: fonts.text,
        fontSize: 32,
        color: colors.heading,
    },
    userName: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40,
    },
    userImg: {
        width: 56,
        height: 56,
        borderRadius: 40,
    },
});