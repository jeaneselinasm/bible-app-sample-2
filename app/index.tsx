"use client";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { ChevronDown, Book, Menu } from "lucide-react-native";
import { router } from "expo-router";
import { bibleData } from "../data/bible-data";
import { translationsData } from "../data/translation";
import { bibleBooks } from "../data/books";

export default function Home() {
  const [selectedTranslation, setSelectedTranslation] = useState("TB1");
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState("Kejadian");
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [isChapterOpen, setIsChapterOpen] = useState(false);

  const currentBookData = bibleBooks.find((el) => el.name === selectedBook);

  const navigateToChapter = (book: string, chapter: number) => {
    router.push({
      pathname: "/chapter",
      params: {
        translation: selectedTranslation,
        book: book,
        chapter: chapter,
      },
    });
  };

  const navigateToTest = () => {
    router.push({
      pathname: "/test",
     
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          {/* <Menu size={24} color="#333" /> */}
        </TouchableOpacity>
        <Text style={styles.title}>Alkitab - Sample App</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Selection Header */}
      <View style={styles.selectionHeader}>
        {/* Translation Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => {
              setIsTranslationOpen(!isTranslationOpen);
              setIsBookOpen(false);
              setIsChapterOpen(false);
            }}
          >
            <Text style={styles.selectorText}>{selectedTranslation}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isTranslationOpen && (
            <View style={styles.dropdown}>
              {translationsData.map((translation) => (
                <TouchableOpacity
                  key={translation.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTranslation(translation.name);
                    setIsTranslationOpen(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{translation.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Book Selector */}
        <View style={[styles.selectorContainer]}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => {
              setIsBookOpen(!isBookOpen);
              setIsTranslationOpen(false);
              setIsChapterOpen(false);
            }}
          >
            <Book size={16} color="#333" />
            <Text style={styles.selectorText}>{selectedBook}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isBookOpen && (
            <View style={[styles.dropdown, styles.bookDropdown]}>
              <ScrollView
                style={{ maxHeight: 400 }}
                contentContainerStyle={{ paddingVertical: 4 }}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                overScrollMode="always"
                keyboardShouldPersistTaps="handled"
              >
                {bibleBooks.map((book) => (
                  <TouchableOpacity
                    key={book.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedBook(book.name);
                      setSelectedChapter(1);
                      setIsBookOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{book.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Chapter Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => {
              setIsChapterOpen(!isChapterOpen);
              setIsTranslationOpen(false);
              setIsBookOpen(false);
            }}
          >
            <Text style={styles.selectorText}>Pasal {selectedChapter}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isChapterOpen && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 300 }}>
                {currentBookData &&
                  Array.from(
                    { length: currentBookData.chapter },
                    (_, i) => i + 1
                  ).map((chapterNumber) => (
                    <TouchableOpacity
                      key={chapterNumber}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedChapter(chapterNumber);
                        setIsChapterOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>
                        Pasal {chapterNumber}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.verseContainer}>
          <Text style={styles.chapterTitle}>
            {/* {selectedBook} {selectedChapter} ({selectedTranslation}) */}
            {selectedBook} {selectedChapter} ({selectedTranslation})
          </Text>

          {/* {currentChapterData?.verses.map((verse) => (
            <View key={verse.number} style={styles.verse}>
              <Text style={styles.verseNumber}>{verse.number}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))} */}
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            if (selectedChapter > 1) {
              setSelectedChapter(selectedChapter - 1);
            } else {
              const currentBookIndex = bibleData.books.findIndex(
                (book) => book.name === selectedBook
              );
              if (currentBookIndex > 0) {
                const prevBook = bibleData.books[currentBookIndex - 1];
                setSelectedBook(prevBook.name);
                setSelectedChapter(prevBook.chapters.length);
              }
            }
          }}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.readButton}
          onPress={() => navigateToChapter(selectedBook, selectedChapter)}
        >
          <Text style={styles.readButtonText}>Read Full Chapter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.readButton}
          onPress={() => navigateToTest()}
        >
          <Text style={styles.readButtonText}>Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const maxChapters = currentBookData?.chapters.length || 1;
            if (selectedChapter < maxChapters) {
              setSelectedChapter(selectedChapter + 1);
            } else {
              const currentBookIndex = bibleData.books.findIndex(
                (book) => book.name === selectedBook
              );
              if (currentBookIndex < bibleData.books.length - 1) {
                setSelectedBook(bibleData.books[currentBookIndex + 1].name);
                setSelectedChapter(1);
              }
            }
          }}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  menuButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  selectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    gap: 20,
  },
  selectorContainer: {
    position: "relative",
    flex: 1,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  selectorText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Increased elevation for Android
    marginTop: 4,
    zIndex: 1000, // Increased z-index
  },
  bookDropdown: {
    width: 150,
    maxHeight: 300,
    position: "absolute",
    zIndex: 1000, // Higher z-index
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  verseContainer: {
    padding: 16,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  verse: {
    flexDirection: "row",
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginRight: 8,
    width: 20,
    textAlign: "right",
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  readButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
  },
  readButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
