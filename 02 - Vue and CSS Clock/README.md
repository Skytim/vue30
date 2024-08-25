### 摘要

該時鐘頁面邏輯可以分為幾個關鍵部分：初始化狀態、計算屬性、設置時間、組件掛載和自動更新。下面我會詳細解釋每個部分的具體邏輯和它們在應用中的作用。

1.  Setup 是 Vue 3 的 Composition API 函數，負責初始化組件的狀態和邏輯。ref 是用來定義響應式變量的，這裡定義了三個 ref 變量，分別用來存儲時針、分針和秒針的旋轉角度

-   hourDegrees：存儲時針的旋轉角度。
-   minuteDegrees：存儲分針的旋轉角度。
-   secondDegrees：存儲秒針的旋轉角度。

2. 計算屬性

```javascript
const hourStyle = computed(() => ({
    transform: `rotate(${hourDegrees.value}deg)`,
}));

const minuteStyle = computed(() => ({
    transform: `rotate(${minuteDegrees.value}deg)`,
}));

const secondStyle = computed(() => ({
    transform: `rotate(${secondDegrees.value}deg)`,
}));
```

computed 是 Vue 3 的 Composition API 函數，用於創建計算屬性。這些屬性是基於其他響應式數據計算得出的，並且會在依賴的數據發生變化時自動更新。

    •	hourStyle：根據 hourDegrees 的值計算並返回時針的旋轉樣式。
    •	minuteStyle：根據 minuteDegrees 的值計算並返回分針的旋轉樣式。
    •	secondStyle：根據 secondDegrees 的值計算並返回秒針的旋轉樣式。

這些計算屬性將被綁定到模板中的相應 div 上，用來動態設置時鐘指針的旋轉角度。

3. 設置時間

```javascript
const setDate = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsValue = (seconds / 60) * 360 + 90;

    const mins = now.getMinutes();
    const minsValue = (mins / 60) * 360 + (seconds / 60) * 6 + 90;

    const hour = now.getHours();
    const hourValue = (hour / 12) * 360 + (mins / 60) * 30 + 90;

    secondDegrees.value = secondsValue;
    minuteDegrees.value = minsValue;
    hourDegrees.value = hourValue;
};
```
