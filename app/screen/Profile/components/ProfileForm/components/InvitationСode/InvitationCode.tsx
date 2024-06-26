import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MainGradient } from "../../../../../../common/MainGradient";
import { InvitationCodeProps } from './types';
import { useTheme } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { useCopy } from '../../../../../../hooks/useCopy';

export function InvitationCode({
  code,
}: InvitationCodeProps) {
  const {
    theme: {
      mode,
      colors: {
        blue1,
        element1,
        element2,
      }
    }
  } = useTheme();
  const { handleCopy } = useCopy();

  return (
    <MainGradient style={styles.gradient}>
      <View style={styles.container}>
        <View>
          <Text style={{ ...styles.label, color: element2 }}>Персональный код</Text>
          <Text style={{ ...styles.code, color: element2 }}>{code}</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleCopy(code)}
          style={{ ...styles.copy, backgroundColor: blue1 }}
        >
          <Feather
            name="copy"
            size={24}
            color={mode === 'light' ? element2 : element1}
          />
        </TouchableOpacity>
      </View>
    </MainGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copy: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
  },
  code: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  }
});
