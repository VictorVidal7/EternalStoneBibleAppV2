// src/features/bible-reader/screens/BibleReaderScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useBibleReader } from '../hooks/useBibleReader';
import { OptimizedBibleReader } from '../components/OptimizedBibleReader';
import { tokens } from '@/shared/constants/tokens';

export const BibleReaderScreen: React.FC = () => {
  const { verses, book, chapter, isLoading, nextChapter, previousChapter } =
    useBibleReader('Génesis', 1);

  const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(
    new Set()
  );

  const translateX = useSharedValue(0);

  // Gestos de swipe para cambiar capítulos
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      // Swipe derecha (capítulo anterior)
      if (event.translationX > 100 && event.velocityX > 300) {
        runOnJS(previousChapter)();
      }
      // Swipe izquierda (siguiente capítulo)
      else if (event.translationX < -100 && event.velocityX < -300) {
        runOnJS(nextChapter)();
      }
      
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleVersePress = useCallback((verseId: string) => {
    setHighlightedVerses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(verseId)) {
        newSet.delete(verseId);
      } else {
        newSet.add(verseId);
      }
      return newSet;
    });
  }, []);

  const handleVerseLongPress = useCallback((verseId: string) => {
    // Aquí podrías abrir un menú contextual para:
    // - Agregar marcador
    // - Compartir versículo
    // - Copiar al portapapeles
    console.log('Long press on verse:', verseId);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tokens.colors.primary[500]} />
        <Text style={styles.loadingText}>Cargando capítulo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {book} {chapter}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={previousChapter}
            style={styles.navigationButton}
          >
            <Text style={styles.navigationButtonText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextChapter}
            style={styles.navigationButton}
          >
            <Text style={styles.navigationButtonText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bible Text con gestos */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <OptimizedBibleReader
            verses={verses}
            highlightedVerses={highlightedVerses}
            onVersePress={handleVersePress}
            onVerseLongPress={handleVerseLongPress}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[0],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.neutral[0],
  },
  loadingText: {
    marginTop: tokens.spacing.md,
    fontSize: tokens.typography.sizes.base,
    color: tokens.colors.neutral[600],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    backgroundColor: tokens.colors.primary[500],
    ...tokens.shadows.md,
  },
  headerTitle: {
    fontSize: tokens.typography.sizes['2xl'],
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.neutral[0],
  },
  headerActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  navigationButton: {
    padding: tokens.spacing.sm,
    backgroundColor: tokens.colors.primary[600],
    borderRadius: tokens.borderRadius.md,
  },
  navigationButtonText: {
    fontSize: tokens.typography.sizes.lg,
    color: tokens.colors.neutral[0],
  },
  content: {
    flex: 1,
  },
});
