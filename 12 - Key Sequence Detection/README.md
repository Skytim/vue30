# 12 -  Key Sequence Detection

## 摘要
製作一個判斷連續輸入指定內容的功能

### Vue 3 Composition API 的應用

#### 1. `setup` 函數
`setup` 函數是 Vue 3 Composition API 的核心。所有組件的邏輯都在這裡面定義，它在組件初始化時執行。`setup` 函數返回的資料和方法將會暴露給模板使用。

在這裡，我定義了兩個響應式變量：
- **`pressed`**：儲存按鍵記錄的響應式陣列。
- **`secretCode`**：一個儲存秘密字串的響應式變量。

```javascript
const pressed = ref([]);
const secretCode = ref("tim");
```

#### 2. ref

ref 是 Vue 3 Composition API 中用來創建響應式資料的工具。它可以包裝基本類型和對象，當這些資料變化時，Vue 會自動追蹤並更新相關的物件。

- pressed：用來儲存使用者按下的鍵，它是一個陣列。
- secretCode：預設為 “tim”，用來與使用者的按鍵輸入進行比較。

#### 3. onMounted 鉤子

onMounted 是 Vue 3 Composition API 中的生命週期鉤子，它相當於 Options API 中的 mounted。在這裡，我使用 onMounted 來監聽使用者的按鍵輸入。當使用者按下鍵盤時，會觸發以下邏輯：

- 將按下的鍵儲存到 pressed 陣列中。
- 確保 pressed 陣列的長度不超過 secretCode 的長度。
- 檢查 pressed 陣列中的字串是否與 secretCode 匹配。如果匹配，則觸發 cornify_add()，顯示彩蛋。