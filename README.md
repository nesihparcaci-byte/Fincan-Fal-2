# Fincan Falı — Android başlangıç projesi

Bu proje Expo + React Native ile hazırlanmış bir **başlangıç demosudur**. Fotoğraf çekme/galeriden seçme ve örnek bir ücretsiz yorum ekranı içerir.

## Gereksinimler
- Node.js LTS
- Android telefon veya Android Studio emülatörü
- Google hesabı ve Google Play Console hesabı (yayın aşamasında)

## Çalıştırma
1. ZIP'i aç.
2. Bu klasörde terminal aç.
3. `npm install`
4. `npx expo start`
5. Expo Go ile QR kodu tara veya Android emülatöründe çalıştır.

## Önemli: yayın öncesi tamamlanması gerekenler
- Şu anki fal metni **örnek/demo metnidir**; fotoğrafı yapay zekâ ile analiz etmez.
- İlk ücretsiz hak cihazda yerel state ile tutuluyor; kullanıcı verisi temizlenince sıfırlanabilir. Gerçek ürün için sunucu tarafında hesap/limit kontrolü gerekir.
- Ödüllü reklam butonu henüz reklam göstermez. Üretim için Google AdMob rewarded ads SDK'sı ve ödül doğrulaması kurulmalı.
- Premium butonu henüz ödeme almaz. Dijital özellikler/abonelikler için Google Play Billing entegrasyonu gerekir.
- Görseli güvenli bir sunucuya gönderip yapay zekâ API'siyle yorumlatan backend kurulmalı. API anahtarı **asla uygulamanın içine gömülmemeli**.
- Gizlilik politikası, kullanıcı verilerinin silinmesi, fotoğraf saklama süresi, destek e-postası, mağaza açıklaması, yaş derecelendirmesi ve veri güvenliği formu hazırlanmalı.
- `app.json` içindeki `com.ornek.fincanfali` paket adını kendi benzersiz paket kimliğinle değiştir.
- Google Play için güncel hedef Android API seviyesi ve yeni kişisel geliştirici hesaplarının test şartları yayın öncesi kontrol edilmeli.

## Android App Bundle (AAB)
EAS Build yapılandırması kurulduktan sonra Android için üretim AAB'si oluşturulabilir. Yayına hazır olabilmesi için yukarıdaki reklam, ödeme, backend, gizlilik ve mağaza gereksinimleri tamamlanmalıdır.
