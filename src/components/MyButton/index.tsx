import React from 'react';
import { Text, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { ButtonContainer } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface MyButtonProps extends TouchableOpacityProps {
    title: string;
    icon?: string;
}

export default function MyButton({ title, style, icon, ...rest }: MyButtonProps) {
    return (
        <ButtonContainer {...rest} style={[style]}>
            {
                icon &&
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>               
                    <Text style={styles.text}>{title}</Text>
                    <Icon name={icon} size={20} color="#FFF" />
                </View>
            }

            {
                !icon &&
                <Text style={styles.text}>{title}</Text>

            }

        </ButtonContainer>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16
    },
});