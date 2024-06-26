import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { Avatar, LoaderContainer, Padding, Rate } from "../../common";
import { useAuth } from "../../hooks";
import { HeaderProps } from "./types";
import { NAVIGATE } from "../../constants";
import { useTheme } from "@rneui/themed";

const { width } = Dimensions.get('window');

export function Header({
  title,
  isNotCircle,
}: HeaderProps) {
  const calculatedWidth = width - 32 - (isNotCircle ? 0 : 60);
  const { isLoading, user } = useAuth();
  const { navigate } = useNavigation();
  const {
    theme: {
      mode,
      colors : {
        element1,
      },
    },
  } = useTheme();

  function handleNavigate() {
    if (title) return;

    navigate(NAVIGATE.Profile);
  }

  return (
    <LoaderContainer isLoading={isLoading}>
      <Padding style={styles.root}>
        {!isNotCircle && (
          <Avatar name={user?.name} size="large" />
        )}
        <View
          style={{
            ...styles.headerContainer,
            width: calculatedWidth,
          }}
        >
          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.avatarPress}
          >
            <Text
              style={{
                ...styles.avatarText,
                color: element1,
              }}
            >
              {title ? title : user?.name || 'Noname'}
            </Text>
            {!title && (
              <Entypo
                name="chevron-small-right"
                size={28}
                style={{
                  color: element1,
                }}
              />
            )}
          </TouchableOpacity>
          <Rate />
        </View>
      </Padding>
    </LoaderContainer>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPress: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
})
