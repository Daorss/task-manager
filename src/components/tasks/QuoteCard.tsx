import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { cardShadow } from "../../constants/theme";
import { fetchQuote, Quote } from "../../api/quotesApi";

// A live motivational quote pulled from a public API to encourage the user as
// they work through their tasks. Fetches on mount; the refresh icon re-calls
// the API for a fresh quote. Self-contained so the screen just drops it in.
export function QuoteCard({ onDismiss }: { onDismiss?: () => void }) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setQuote(await fetchQuote());
    } catch (e) {
      console.warn("Failed to fetch quote", e);
      setQuote({
        text: "Small steps every day add up to big results.",
        author: "PRITECH Tasks",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 16,
        backgroundColor: colors.cardBg,
        gap: 12,
        ...cardShadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSurface,
            }}
          >
            <MaterialIcons name="format-quote" size={22} color={colors.accent} />
          </View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 1,
              textTransform: "uppercase",
              color: colors.onSurfaceVariant,
            }}
          >
            Daily Motivation
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {/* Refresh — re-calls the API for a new quote. */}
          <Pressable
            onPress={load}
            hitSlop={8}
            disabled={loading}
            style={{ padding: 4 }}
          >
            <MaterialIcons
              name="refresh"
              size={20}
              color={colors.onSurfaceVariant}
            />
          </Pressable>
          {onDismiss && (
            <Pressable onPress={onDismiss} hitSlop={8} style={{ padding: 4 }}>
              <MaterialIcons
                name="close"
                size={18}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginVertical: 8 }} />
      ) : (
        quote && (
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 22,
                fontStyle: "italic",
                color: colors.onSurface,
              }}
            >
              “{quote.text}”
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: colors.onSurfaceVariant,
              }}
            >
              — {quote.author}
            </Text>
          </View>
        )
      )}
    </View>
  );
}
