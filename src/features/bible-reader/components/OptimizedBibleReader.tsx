// src/features/bible-reader/components/OptimizedBibleReader.tsx
import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BibleVerse } from '@/shared/types/bible.types';
import { tokens } from '@/shared/constants/tokens';
import { useSettingsStore } from '@/app/store/settingsStore';

interface VerseItemProps {
  verse: BibleVerse;
  isHighlighted: boolean;
  fontSize: number;
  lineHeight: number;
  onPress: (verseId: string) => void;
  onLongPress: (verseId: string) => void;
}

// Componente de versículo individual memoizado
const VerseItem = memo<VerseItemProps>(
  ({ verse, isHighlighted, fontSize, lineHeight, onPress, onLongPress }) => {
    const handlePress = useCallback(() => {
      onPress(verse.id);
    }, [verse.id, onPress]);

    const handleLongPress = useCallback(() => {
      onLongPress(verse.id);
    }, [verse.id, onLongPress]);

    return (
      <Animated.View entering={FadeIn.duration(200)}>
        <Pressable
          onPress={handlePress}
          onLongPress={handleLongPress}
          style={[
            styles.verseContainer,
            isHighlighted && styles.highlightedVerse,
          ]}
        >
          <Text style={[styles.verseNumber, { fontSize: fontSize * 0.75 }]}>
            {verse.number}
          </Text>
          <Text
            style={[
              styles.verseText,
              {
                fontSize,
                lineHeight: fontSize * lineHeight,
              },
            ]}
            selectable
          >
            {verse.text}
          </Text>
        </Pressable>
      </Animated.View>
    );
  },
  // Optimización: solo re-renderizar si cambian estos props
  (prevProps, nextProps) =>
    prevProps.verse.id === nextProps.verse.id &&
    prevProps.isHighlighted === nextProps.isHighlighted &&
    prevProps.fontSize === nextProps.fontSize &&
    prevProps.lineHeight === nextProps.lineHeight
);

VerseItem.displayName = 'VerseItem';

interface OptimizedBibleReaderProps {
  verses: BibleVerse[];
  highlightedVerses?: Set<string>;
  onVersePress?: (verseId: string) => void;
  onVerseLongPress?: (verseId: string) => void;
}

export const OptimizedBibleReader: React.FC<OptimizedBibleReaderProps> = ({
  verses,
  highlightedVerses = new Set(),
  onVersePress = () => {},
  onVerseLongPress = () => {},
}) => {
  const { fontSize, lineHeight } = useSettingsStore();

  const renderItem = useCallback(
    ({ item }: { item: BibleVerse }) => (
      <VerseItem
        verse={item}
        isHighlighted={highlightedVerses.has(item.id)}
        fontSize={fontSize}
        lineHeight={lineHeight}
        onPress={onVersePress}
        onLongPress={onVerseLongPress}
      />
    ),
    [highlightedVerses, fontSize, lineHeight, onVersePress, onVerseLongPress]
  );

  const keyExtractor = useCallback((item: BibleVerse) => item.id, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={verses}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={80}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[0],
  },
  contentContainer: {
    padding: tokens.spacing.md,
  },
  verseContainer: {
    flexDirection: 'row',
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.borderRadius.md,
    marginBottom: tokens.spacing.xs,
  },
  highlightedVerse: {
    backgroundColor: tokens.colors.highlight.yellow,
  },
  verseNumber: {
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.primary[600],
    marginRight: tokens.spacing.sm,
    minWidth: 30,
  },
  verseText: {
    flex: 1,
    fontFamily: tokens.typography.fonts.reading,
    color: tokens.colors.neutral[900],
  },
});
