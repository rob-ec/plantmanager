import { useNavigation } from '@react-navigation/native';
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

export function Confirmation() {
    
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('PlantSelect');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😁
                </Text>

                <Text style={styles.title}>Prontinho</Text>
                <Text style={styles.subtitle}>
                    Vamos começar a cuidar das suas{'\n'}
                    plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title="Começar" 
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