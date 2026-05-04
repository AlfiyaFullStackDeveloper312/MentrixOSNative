import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({value, onChange, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
  },
});
