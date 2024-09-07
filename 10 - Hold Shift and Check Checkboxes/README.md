# 10 Hold Shift and Check Checkboxes

## 摘要

本篇主要是要實作透過點擊checkbox後按下shift鍵之後一次選取多個checkbox的功能。

## 內容

這段程式碼使用了 Vue 3 的 **Composition API**，以下是我對 Vue 部分的詳細說明：

### 1. `setup` 函數
- `setup` 是 Vue 3 Composition API 的核心，我用它來定義組件的邏輯與狀態。在這個函數裡，我可以宣告資料、方法，以及其他組件的功能邏輯。
- 在這段程式碼中，我返回了 `items`、`checkedItems` 和 `handleCheck`，這些會暴露給 HTML 模板來使用。

### 2. `ref`
- 我使用 `ref` 來創建響應式資料，它可以包裝任何基本類型或物件，讓它變成響應式資料。程式碼中的 `items` 和 `checkedItems` 都是用 `ref` 宣告的，這表示它們是響應式的，Vue 會自動追蹤它們的變化並更新畫面。
- `items` 是一個字串陣列，代表每個待辦事項（inbox 項目）。
- `checkedItems` 則是一個布林值陣列，用來記錄每個核取方塊是否被勾選。

### 3. `handleCheck` 方法
- 這個方法用來處理當使用者點擊核取方塊時的邏輯。我讓它接收兩個參數：事件物件 `e` 和核取方塊的索引 `index`。
- 當使用者按住 Shift 鍵並點擊核取方塊時，會選取兩個點擊之間的所有核取方塊。這是透過計算 `lastCheckedIndex`（上一次點擊的核取方塊索引）和目前點擊的核取方塊索引範圍來實現的，這樣範圍內的核取方塊就能自動被勾選。
- 我使用 `lastCheckedIndex` 來記錄上一次點擊的核取方塊，以便在按住 Shift 鍵時，能夠確定應該選取的範圍。

### 4. 響應式資料的操作
- 在 `handleCheck` 方法中，我使用 `checkedItems.value[i]` 來存取和修改響應式陣列 `checkedItems` 中的元素。這是我在 Composition API 中處理 `ref` 資料的標準方式。

### 5. 返回值
- 我在 `setup` 函數中返回了一個物件，這個物件包含了需要暴露給模板的響應式資料和方法。`items` 和 `checkedItems` 資料，以及 `handleCheck` 方法，都透過這個返回物件暴露給 HTML 模板使用。
