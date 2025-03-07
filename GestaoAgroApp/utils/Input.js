import React from 'react';
import { TextInput, View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles, colors } from './theme';

const Input = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  error,
  keyboardType,
  icon,
  isValid,
  secureTextEntry, // Adicionando a propriedade secureTextEntry
}) => {
  const scaleValue = new Animated.Value(1);

  const handleFocus = () => {
    Animated.spring(scaleValue, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onBlur();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], marginBottom: 20 }}>
      <View style={inputStyles.inputContainer}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isValid ? colors.primary : error ? colors.error : colors.textSecondary}
            style={inputStyles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            inputStyles.inputWithIcon,
            error && styles.inputError,
            isValid && styles.inputValid,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry} // Passando a propriedade secureTextEntry
          placeholderTextColor="#888"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </Animated.View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
  },
  inputValid: {
    borderColor: colors.primary,
  },
});

export default Input;