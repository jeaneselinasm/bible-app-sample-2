import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export default function ChapterScreen() {
  const { translation, book } = useLocalSearchParams();
  const [chapters, setChapters] = useState<number>(0);

  useEffect(() => {
    async function loadBookData() {
      const response = await fetch(Asset.fromModule(require(`../../assets/${translation}/${book}.json`)).uri);
      const data = await response.json();
      setChapters(Object.keys(data.chapters).length);
    }
    loadBookData();
  }, []);

  return (
    <View>
      <Text>Chapters in {book}</Text>
      {[...Array(chapters)].map((_, i) => (
        <Link key={i} href={`/${translation}/${book}/${i + 1}`}>
          <Button title={`Chapter ${i + 1}`} />
        </Link>
      ))}
    </View>
  );
}
