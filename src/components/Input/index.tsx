import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

interface InputProps extends TextInputProps {
  readOnly?: boolean;
  numericOnly?: boolean;
  half?: boolean;
}

export default function Input(props: InputProps) {
  const { readOnly, numericOnly, half, ...restProps } = props;

  const handleTextChange = (text: string) => {
    restProps.onChangeText?.(text);
  }

  return (
    <TextInput
      placeholderTextColor="#000"
      style={[
        half ? styles.halfInput : styles.input,
        readOnly && styles.readOnlyInput,
      ]}
      {...restProps}
      onChangeText={handleTextChange}
      editable={!readOnly}
      keyboardType={numericOnly ? 'numeric' : 'default'}
    />
  );
}
