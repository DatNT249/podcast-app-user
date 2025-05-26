# 📱 Expo React Native Project

Đây là dự án React Native sử dụng Expo, Yarn và EAS Build để triển khai ứng dụng.

## 🚀 Cài đặt

1. Cài đặt các dependencies:
   ```sh
   yarn install
   ```
2. Đăng nhập vào Expo:
   ```sh
   eas login
   ```

## 🏗️ Build ứng dụng

Sử dụng lệnh sau để build ứng dụng Android ở profile `development`:

```sh
   eas build --profile development --platform android
```

## 🛠️ Công cụ cần thiết

- **Node.js**: Phiên bản mới nhất (khuyến nghị dùng với `nvm` để quản lý phiên bản Node).
- **Yarn**: Trình quản lý gói.
- **Expo CLI**: Cài đặt bằng lệnh:
  ```sh
  npm install -g expo-cli
  ```
- **EAS CLI**: Cài đặt bằng lệnh:
  ```sh
  npm install -g eas-cli
  ```

## 📂 Cấu trúc thư mục

```
/project-root
│── assets/             # Chứa hình ảnh, fonts, icon...
│── app.json            # Cấu hình của Expo
│── eas.json            # Cấu hình EAS Build
│── package.json        # Danh sách dependencies
│── yarn.lock           # File khóa phiên bản packages
```

## 📜 Ghi chú

- Đảm bảo bạn đã thiết lập `eas.json` với profile `development` phù hợp.
- Nếu gặp lỗi khi build, kiểm tra lại môi trường hoặc dependencies bị thiếu.
