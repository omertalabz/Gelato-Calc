# Gelato Bilanciamento — GitHub to Android APK

Профессиональный калькулятор балансировки джелато и сорбетов (RU / EN / IT / ES).

## Как собрать APK-файл через GitHub (бесплатно, без установки Android Studio)

1. Создайте новый **приватный (Private)** репозиторий на [GitHub](https://github.com/new).
2. Распакуйте архив `gelato-bilanciamento-github-apk.zip` и загрузите все файлы (включая скрытую папку `.github/workflows/build-apk.yml`) в ваш репозиторий:
   - Через веб-интерфейс GitHub (`Add file -> Upload files`) или через Git в терминале:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/<ВАШ_ЛОГИН>/<ВАШ_РЕПОЗИТОРИЙ>.git
     git push -u origin main
     ```
3. Откройте вкладку **Actions** в вашем репозитории на GitHub.
4. Дождитесь завершения задачи **Build Android APK** (обычно 3–5 минут).
5. Нажмите на завершённый запуск и скачайте файл из раздела **Artifacts** -> **Gelato-Bilanciamento-APK**.
6. Распакуйте полученный архив на компьютере или телефоне и установите `app-debug.apk` на Android-устройство.

---

## How to build an Android APK via GitHub Actions

1. Create a new **Private** repository on GitHub.
2. Upload all files from `gelato-bilanciamento-github-apk.zip` (including `.github/workflows/build-apk.yml`) to the `main` branch.
3. Open the **Actions** tab in your GitHub repository and wait for **Build Android APK** to finish.
4. Download **Gelato-Bilanciamento-APK** under **Artifacts** and install `app-debug.apk` on your Android phone.
