import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './styles';

interface InputProps extends TextInputProps {
  label: string;
}

export default function InputC(props: InputProps) {
  const { label, ...restProps } = props;

  const handleTextChange = (text: string) => {
    restProps.onChangeText?.(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label} </Text>

      <TextInput
        style={styles.input}
        {...restProps}
        onChangeText={handleTextChange}
      />
    </View>
  );
}
