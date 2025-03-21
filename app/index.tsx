"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { ChevronDown, Book, Menu } from "lucide-react-native"
import { router } from "expo-router"
import { bibleData } from "../data/bible-data"

export default function Home() {
  const [selectedTranslation, setSelectedTranslation] = useState("KJV")
  const [isTranslationOpen, setIsTranslationOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState("Genesis")
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [isChapterOpen, setIsChapterOpen] = useState(false)

  const currentBookData = bibleData.books.find((book) => book.name === selectedBook)
  const currentChapterData = currentBookData?.chapters.find((chapter) => chapter.number === selectedChapter)

  const navigateToChapter = (book: string, chapter: number) => {
    router.push({
      pathname: "/chapter",
      params: {
        translation: selectedTranslation,
        book: book,
        chapter: chapter,
      },
    })
  }

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
              setIsTranslationOpen(!isTranslationOpen)
              setIsBookOpen(false)
              setIsChapterOpen(false)
            }}
          >
            <Text style={styles.selectorText}>{selectedTranslation}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isTranslationOpen && (
            <View style={styles.dropdown}>
              {bibleData.translations.map((translation) => (
                <TouchableOpacity
                  key={translation}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTranslation(translation)
                    setIsTranslationOpen(false)
                  }}
                >
                  <Text style={styles.dropdownText}>{translation}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Book Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => {
              setIsBookOpen(!isBookOpen)
              setIsTranslationOpen(false)
              setIsChapterOpen(false)
            }}
          >
            <Book size={16} color="#333" />
            <Text style={styles.selectorText}>{selectedBook}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isBookOpen && (
            <View style={[styles.dropdown, styles.bookDropdown]}>
              <ScrollView style={{ maxHeight: 300 }}>
                {bibleData.books.map((book) => (
                  <TouchableOpacity
                    key={book.name}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedBook(book.name)
                      setSelectedChapter(1)
                      setIsBookOpen(false)
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
              setIsChapterOpen(!isChapterOpen)
              setIsTranslationOpen(false)
              setIsBookOpen(false)
            }}
          >
            <Text style={styles.selectorText}>Chapter {selectedChapter}</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>

          {isChapterOpen && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 300 }}>
                {currentBookData?.chapters.map((chapter) => (
                  <TouchableOpacity
                    key={chapter.number}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedChapter(chapter.number)
                      setIsChapterOpen(false)
                    }}
                  >
                    <Text style={styles.dropdownText}>{chapter.number}</Text>
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
            {selectedBook} {selectedChapter} ({selectedTranslation})
          </Text>

          {currentChapterData?.verses.map((verse) => (
            <View key={verse.number} style={styles.verse}>
              <Text style={styles.verseNumber}>{verse.number}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            if (selectedChapter > 1) {
              setSelectedChapter(selectedChapter - 1)
            } else {
              const currentBookIndex = bibleData.books.findIndex((book) => book.name === selectedBook)
              if (currentBookIndex > 0) {
                const prevBook = bibleData.books[currentBookIndex - 1]
                setSelectedBook(prevBook.name)
                setSelectedChapter(prevBook.chapters.length)
              }
            }
          }}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.readButton} onPress={() => navigateToChapter(selectedBook, selectedChapter)}>
          <Text style={styles.readButtonText}>Read Full Chapter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const maxChapters = currentBookData?.chapters.length || 1
            if (selectedChapter < maxChapters) {
              setSelectedChapter(selectedChapter + 1)
            } else {
              const currentBookIndex = bibleData.books.findIndex((book) => book.name === selectedBook)
              if (currentBookIndex < bibleData.books.length - 1) {
                setSelectedBook(bibleData.books[currentBookIndex + 1].name)
                setSelectedChapter(1)
              }
            }
          }}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  selectorContainer: {
    position: "relative",
    zIndex: 1,
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
    elevation: 3,
    marginTop: 4,
    zIndex: 10,
  },
  bookDropdown: {
    width: 150,
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
})

