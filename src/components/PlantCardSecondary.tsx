import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';

import { SvgFromUri } from 'react-native-svg';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecondary = ({
    data,
    handleRemove,
    ...rest
}: PlantProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white} />
                        </RectButton>

                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50}
                />

                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regas às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.green_dark,
        marginLeft: 10,
    },
    details: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontFamily: fonts.heading,
        fontSize: 16,
        color: colors.body_dark,
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        paddingLeft: 15,
    }
})