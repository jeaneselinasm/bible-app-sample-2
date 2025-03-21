import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to Bible App</Text>
      <Link href="/translations">
        <Button title="Choose Translation" />
      </Link>
    </View>
  );
}
