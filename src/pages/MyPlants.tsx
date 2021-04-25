import React from 'react';

import {
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    Alert,
} from 'react-native';

import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { useState } from 'react';
import { loadPlants, PlantProps, removePlant } from '../libs/storage';
import { useEffect } from 'react';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlants();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} daqui à aproximadamente ${nextTime}.`
            );

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();

    }, []);

    function handleRemovePlant(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😢', 
                style: 'destructive',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);

                        setMyPlants( (oldData) =>
                            oldData.filter((item) => item.id != plant.id)
                        );

                    } catch {
                        Alert.alert('Não foi possível remover. ☹️');
                    }
                }
            }
        ]);
    }

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemovePlant(item)}
                        />
                    )}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.plantsList}
                    scrollEnabled={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotlight: {
        width: '100%',
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        fontFamily: fonts.text,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginVertical: 20,
    },
    plantsList: {
    }
});