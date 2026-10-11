import React, { useState } from "react";
import {
  Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, TouchableOpacity, View
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type Choice = "ad" | "premium" | null;

export default function App() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [freeReadingUsed, setFreeReadingUsed] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const [choice, setChoice] = useState<Choice>(null);

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Kamera izni", "Fotoğraf çekebilmek için kamera izni vermelisin.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"], allowsEditing: true, quality: 0.8
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setReading(null);
      setChoice(null);
    }
  }

  async function choosePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], allowsEditing: true, quality: 0.8
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setReading(null);
      setChoice(null);
    }
  }

  function requestReading() {
    if (!photo) {
      Alert.alert("Önce fotoğraf", "Lütfen fincanın içini gösteren bir fotoğraf çek veya galeriden seç.");
      return;
    }
    if (freeReadingUsed) {
      setChoice(null);
      Alert.alert(
        "Ücretsiz fal hakkın kullanıldı",
        "Devam etmek için reklam izleyerek bir fal hakkı kazanabilir veya Premium üyeliği seçebilirsin. Bu demo sürümünde reklam ve ödeme henüz etkin değil."
      );
      return;
    }
    // Demo only: connect this button to a secure server-side AI endpoint before release.
    setReading(
      "Fincanında yeni başlangıçları ve önüne çıkabilecek fırsatları simgeleyen şekiller var gibi görünüyor. " +
      "Yakın zamanda beklediğin bir haberle ilgili hareketlilik yaşayabilirsin. " +
      "Bu yorum eğlence amaçlıdır; fotoğraftaki telve şekillerinin kesin veya bilimsel bir anlamı yoktur."
    );
    setFreeReadingUsed(true);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>☾ GELENEKSEL FAL • YENİ BİR DENEYİM</Text>
        <Text style={styles.title}>Fincan Falı</Text>
        <Text style={styles.subtitle}>Bir fincan, biraz merak, yepyeni bir hikâye.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fincanını hazırla</Text>
          <Text style={styles.body}>Fincanın içindeki telve net görünsün. Fotoğrafı iyi ışıkta çek.</Text>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.preview} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.cup}>☕</Text>
              <Text style={styles.body}>Fincan fotoğrafın burada görünecek</Text>
            </View>
          )}
          <View style={styles.row}>
            <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
              <Text style={styles.buttonText}>📷 Fotoğraf çek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={choosePhoto}>
              <Text style={styles.buttonText}>Galeriden seç</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={requestReading}>
            <Text style={styles.primaryText}>Falımı yorumla ✨</Text>
          </TouchableOpacity>
          <Text style={styles.small}>İlk yorum ücretsiz. Sonraki yorumlar reklam veya Premium seçeneğiyle açılacak.</Text>
        </View>

        {reading && (
          <View style={styles.resultCard}>
            <Text style={styles.sectionTitle}>Fal yorumun ✨</Text>
            <Text style={styles.body}>{reading}</Text>
            <Text style={styles.disclaimer}>Eğlence amaçlıdır; önemli yaşam, sağlık veya finans kararlarını fal yorumlarına göre verme.</Text>
          </View>
        )}

        <View style={styles.premiumCard}>
          <Text style={styles.sectionTitle}>Daha fazla fal ister misin?</Text>
          <Text style={styles.body}>Reklam izleyerek ek hak kazanma ve Premium üyelik seçenekleri yakında burada.</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert("Yakında", "Ödüllü reklam entegrasyonu üretim sürümünde eklenecek.")}>
            <Text style={styles.buttonText}>Reklamla fal hakkı kazan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goldButton} onPress={() => Alert.alert("Premium", "Google Play Billing ile abonelik ve tek seferlik satın alma kurulacak.")}>
            <Text style={styles.goldText}>Premium üyeliği keşfet</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Fincan Falı • Eğlence ve kişisel yorum deneyimi</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#160f18" },
  container: { padding: 20, paddingBottom: 36 },
  eyebrow: { color: "#d5b67a", fontSize: 11, letterSpacing: 1.4, marginTop: 16 },
  title: { color: "#fff4df", fontSize: 36, fontWeight: "800", marginTop: 12 },
  subtitle: { color: "#c7b8c9", fontSize: 15, marginTop: 6, marginBottom: 22 },
  card: { backgroundColor: "#251a29", borderColor: "#4b344c", borderWidth: 1, borderRadius: 22, padding: 18 },
  sectionTitle: { color: "#fff0d2", fontSize: 20, fontWeight: "700", marginBottom: 8 },
  body: { color: "#d7cbd8", fontSize: 14, lineHeight: 21 },
  placeholder: { height: 190, borderRadius: 16, borderWidth: 1, borderColor: "#6b536a", borderStyle: "dashed", alignItems: "center", justifyContent: "center", marginTop: 16, marginBottom: 14, backgroundColor: "#1c1420" },
  cup: { fontSize: 52, marginBottom: 10 },
  preview: { width: "100%", height: 250, borderRadius: 16, marginTop: 16, marginBottom: 14, resizeMode: "cover" },
  row: { flexDirection: "row", gap: 10, marginTop: 2 },
  secondaryButton: { flex: 1, backgroundColor: "#443047", paddingVertical: 13, paddingHorizontal: 10, borderRadius: 12, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff0e5", fontWeight: "600", fontSize: 13, textAlign: "center" },
  primaryButton: { backgroundColor: "#d5b67a", paddingVertical: 16, borderRadius: 13, alignItems: "center", marginTop: 14 },
  primaryText: { color: "#241729", fontSize: 16, fontWeight: "800" },
  small: { color: "#b7a5b8", fontSize: 12, lineHeight: 18, marginTop: 12 },
  resultCard: { backgroundColor: "#2c2030", borderColor: "#8c7048", borderWidth: 1, borderRadius: 20, padding: 18, marginTop: 16 },
  disclaimer: { color: "#b8a7ba", fontSize: 11, lineHeight: 16, marginTop: 12 },
  premiumCard: { backgroundColor: "#211a25", borderRadius: 20, padding: 18, marginTop: 16, borderColor: "#514052", borderWidth: 1 },
  goldButton: { backgroundColor: "#d5b67a", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  goldText: { color: "#241729", fontWeight: "800" },
  footer: { color: "#857688", textAlign: "center", marginTop: 24, fontSize: 11 }
});
