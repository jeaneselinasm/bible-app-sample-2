import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

const translations = ["bahasa_indonesia", "english"];

export default function TranslationScreen() {
  return (
    <View>
      <Text>Select a Translation</Text>
      {translations.map((t) => (
        <Link key={t} href={`/${t}`}>
          <Button title={t.replace("_", " ")} />
        </Link>
      ))}
    </View>
  );
}
