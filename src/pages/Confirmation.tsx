import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string,
}

const emojis = {
    hug: '🤗',
    smile: '😁',
}

export function Confirmation() {
    
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleStart() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title={buttonTitle} 
                        onPress={handleStart}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 22,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        textAlign: 'center',
        color: colors.heading,
        paddingVertical: 10,
    },
    footer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 50,
    }
})