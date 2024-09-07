# 11 - Custom Video Player

## 摘要

這段程式碼是一個使用 Vue.js 的範例，來控制一個 HTML <video> 元素的播放功能，包括播放、暫停、快進、音量/播放速率調整等功能。以下是這段程式碼的功能詳述

這段程式碼使用了 Vue 3 的 **Composition API**，以下是其關鍵功能的詳細解釋：

### 功能概述
- **播放與暫停影片**：透過 `togglePlay` 函數，根據影片是否正在播放來決定執行 `play()` 或 `pause()`。
- **更新按鈕圖示**：根據影片的播放狀態，切換按鈕顯示的圖示（播放或暫停）。
- **快進與倒退**：透過 `skip` 函數，根據按鈕的 `data-skip` 屬性來調整影片當前時間。
- **控制範圍**：調整影片的音量與播放速度，透過 `handleRangeUpdate` 函數來設定這些屬性。
- **更新進度條**：使用 `handleProgress` 函數來計算影片播放進度，並更新進度條的長度。
- **拖曳進度條**：`scrub` 函數允許使用者透過點擊進度條來快速跳到影片的某個時間點。

### Vue 3 Composition API 的應用

1. **`ref`**
   - 使用 `ref` 來創建響應式變量，如 `video`、`toggle`、`progress` 和 `progressBar`，這些變量對應 DOM 元素，允許你透過 `.value` 來操作它們。

2. **`onMounted` Hook**
   - 使用 `onMounted` 來註冊事件監聽器，當影片被點擊時會觸發播放或暫停功能。這與 Vue 2 中的 `mounted` 生命週期函數類似，但更適合 Composition API。

3. **方法定義**
   - 所有的功能邏輯（如 `togglePlay`、`updateButton`、`skip` 等）都在 `setup` 函數內定義，並透過 `return` 將這些方法暴露給模板使用。

4. **事件綁定與樣式更新**
   - 透過事件（如點擊、範圍輸入變更）來控制影片的播放行為，並即時更新進度條等 UI 元素。

---