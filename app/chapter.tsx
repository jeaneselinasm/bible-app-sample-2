import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, router } from "expo-router"
import { ArrowLeft, Share2 } from "lucide-react-native"
import { bibleData } from "../data/bible-data"

export default function ChapterScreen() {
  const { translation, book, chapter } = useLocalSearchParams()

  const bookName = typeof book === "string" ? book : "Genesis"
  const chapterNumber = typeof chapter === "string" ? Number.parseInt(chapter, 10) : 1
  const translationName = typeof translation === "string" ? translation : "KJV"

  const currentBookData = bibleData.books.find((b) => b.name === bookName)
  const currentChapterData = currentBookData?.chapters.find((c) => c.number === chapterNumber)

  const goBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {bookName} {chapterNumber}
        </Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.chapterContainer}>
          <Text style={styles.translationText}>{translationName}</Text>

          {currentChapterData?.verses.map((verse) => (
            <View key={verse.number} style={styles.verse}>
              <Text style={styles.verseNumber}>{verse.number}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            if (chapterNumber > 1) {
              router.push({
                pathname: "/chapter",
                params: {
                  translation: translationName,
                  book: bookName,
                  chapter: chapterNumber - 1,
                },
              })
            } else {
              const currentBookIndex = bibleData.books.findIndex((b) => b.name === bookName)
              if (currentBookIndex > 0) {
                const prevBook = bibleData.books[currentBookIndex - 1]
                router.push({
                  pathname: "/chapter",
                  params: {
                    translation: translationName,
                    book: prevBook.name,
                    chapter: prevBook.chapters.length,
                  },
                })
              }
            }
          }}
        >
          <Text style={styles.footerButtonText}>Previous Chapter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            const maxChapters = currentBookData?.chapters.length || 1
            if (chapterNumber < maxChapters) {
              router.push({
                pathname: "/chapter",
                params: {
                  translation: translationName,
                  book: bookName,
                  chapter: chapterNumber + 1,
                },
              })
            } else {
              const currentBookIndex = bibleData.books.findIndex((b) => b.name === bookName)
              if (currentBookIndex < bibleData.books.length - 1) {
                router.push({
                  pathname: "/chapter",
                  params: {
                    translation: translationName,
                    book: bibleData.books[currentBookIndex + 1].name,
                    chapter: 1,
                  },
                })
              }
            }
          }}
        >
          <Text style={styles.footerButtonText}>Next Chapter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  chapterContainer: {
    padding: 16,
  },
  translationText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  verse: {
    flexDirection: "row",
    marginBottom: 16,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginRight: 8,
    width: 20,
    textAlign: "right",
    paddingTop: 2,
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
})

