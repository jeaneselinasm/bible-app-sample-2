import { View,  StyleSheet, ScrollView } from 'react-native';
import { Text, List } from 'react-native-paper';
import * as React from 'react';
import { Link } from 'expo-router';
export default function Tab() {
  const translations = [
    {
      id : 1,
      name : "Terjemahan Baru (TB)"
    },
    {
      id : 2,
      name : "English Standard Version (ESV)"
    },
    {
      id : 3,
      name : "Sawi (saw)"
    }
  ]


  const bibleBooks = [
    { id: 1, name: "Kejadian" },
    { id: 2, name: "Keluaran" },
    { id: 3, name: "Imamat" },
    { id: 4, name: "Bilangan" },
    { id: 5, name: "Ulangan" },
    { id: 6, name: "Yosua" },
    { id: 7, name: "Hakim-Hakim" },
    { id: 8, name: "Rut" },
    { id: 9, name: "1 Samuel" },
    { id: 10, name: "2 Samuel" },
    { id: 11, name: "1 Raja-Raja" },
    { id: 12, name: "2 Raja-Raja" },
    { id: 13, name: "1 Tawarikh" },
    { id: 14, name: "2 Tawarikh" },
    { id: 15, name: "Ezra" },
    { id: 16, name: "Nehemia" },
    { id: 17, name: "Ester" },
    { id: 18, name: "Ayub" },
    { id: 19, name: "Mazmur" },
    { id: 20, name: "Amsal" },
    { id: 21, name: "Pengkhotbah" },
    { id: 22, name: "Kidung Agung" },
    { id: 23, name: "Yesaya" },
    { id: 24, name: "Yeremia" },
    { id: 25, name: "Ratapan" },
    { id: 26, name: "Yehezkiel" },
    { id: 27, name: "Daniel" },
    { id: 28, name: "Hosea" },
    { id: 29, name: "Yoel" },
    { id: 30, name: "Amos" },
    { id: 31, name: "Obaja" },
    { id: 32, name: "Yunus" },
    { id: 33, name: "Mikha" },
    { id: 34, name: "Nahum" },
    { id: 35, name: "Habakuk" },
    { id: 36, name: "Zefanya" },
    { id: 37, name: "Hagai" },
    { id: 38, name: "Zakharia" },
    { id: 39, name: "Maleakhi" },
    { id: 40, name: "Matius" },
    { id: 41, name: "Markus" },
    { id: 42, name: "Lukas" },
    { id: 43, name: "Yohanes" },
    { id: 44, name: "Kisah Para Rasul" },
    { id: 45, name: "Roma" },
    { id: 46, name: "1 Korintus" },
    { id: 47, name: "2 Korintus" },
    { id: 48, name: "Galatia" },
    { id: 49, name: "Efesus" },
    { id: 50, name: "Filipi" },
    { id: 51, name: "Kolose" },
    { id: 52, name: "1 Tesalonika" },
    { id: 53, name: "2 Tesalonika" },
    { id: 54, name: "1 Timotius" },
    { id: 55, name: "2 Timotius" },
    { id: 56, name: "Titus" },
    { id: 57, name: "Filemon" },
    { id: 58, name: "Ibrani" },
    { id: 59, name: "Yakobus" },
    { id: 60, name: "1 Petrus" },
    { id: 61, name: "2 Petrus" },
    { id: 62, name: "1 Yohanes" },
    { id: 63, name: "2 Yohanes" },
    { id: 64, name: "3 Yohanes" },
    { id: 65, name: "Yudas" },
    { id: 66, name: "Wahyu" }
  ];
  
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <Text>This is setting page</Text>
      <Text variant="titleLarge" >
        Bible Translations
      </Text>
      <List.Accordion
        title="Terjemahan"
        left={props => <List.Icon {...props} icon="book" />}>
       {translations.map((translation)=>(
        <List.Item
        title={translation.name}
        />
       ))}
      </List.Accordion>
      
<ScrollView>

      <List.Accordion
        title="Kitab"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
          {bibleBooks.map((book) =>
          <List.Item 
          title={book.name} />
          )}
        
        <List.Item title="Second item" />
      </List.Accordion>
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
