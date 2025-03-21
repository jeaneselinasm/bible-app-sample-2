import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export default function BookScreen() {
  const { translation } = useLocalSearchParams();
  const [books, setBooks] = useState<string[]>([]);

  useEffect(() => {
    async function loadBooks() {
      const response = await fetch(Asset.fromModule(require(`../../assets/data/${translation}/books.json`)).uri);
      const data = await response.json();
      setBooks(data.books);
    }
    loadBooks();
  }, []);

  return (
    <View>
      <Text>Books in {translation.replace("_", " ")}</Text>
      {books.map((book) => (
        <Link key={book} href={`/${translation}/${book}`}>
          <Button title={book} />
        </Link>
      ))}
    </View>
  );
}
