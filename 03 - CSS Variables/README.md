# Update CSS variable with Vue

## 摘要
本篇最主要透過 CSS 以及 Vue 抓取物件去改變 CSS的值，範例是改變了內邊距(padding), 模糊度(blur)及顏色，並同時對標題得字進行改變。

大致說明如下:

1. Vue.js 設置：
    使用Composition API定義了Vue應用。
    ref用於創建響應式的資料屬性spacing, blur, 和 base，這些屬性分別控制間距、模糊效果和基礎顏色。
2. 響應式變化：
    watchEffect用於監控這些屬性的變化，當它們變化時，使用document.documentElement.style.setProperty來更新CSS變數的值。
    這些CSS變數被動態綁定到input元素的v-model指令中，當使用者調整這些控制項時，CSS樣式會自動更新。
3. 最終效果：
    使用者可以通過滑動條調整圖片的間距（Spacing）和模糊效果（Blur），並且可以使用顏色選擇器更改圖片的背景顏色（Base Color）。
	所有這些變化都會立即反映在圖片的樣式上，實現了即時的樣式更新效果。
