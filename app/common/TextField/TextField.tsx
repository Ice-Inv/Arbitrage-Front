import { TextInput } from "react-native"
import { FieldProps } from "./types"
import { useTheme } from "@rneui/themed"

export function TextField({
  onChange,
  value,
  placeholder,
  isSecure,
  isDisable = false,
}: FieldProps) {
  const {theme} = useTheme();

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={isSecure}
      autoCapitalize="none"
      style={{
        borderRadius: 8,
        backgroundColor: theme.mode === 'dark' ? theme.colors.bg3 : theme.colors.element4,
        color:  theme.mode === 'dark' ? theme.colors.element2 : theme.colors.element1,
        marginTop: 15,
        padding: 12,
        width: '100%',
      }}
      placeholderTextColor={theme.colors.element3}
      editable={!isDisable}
    />
  )
}