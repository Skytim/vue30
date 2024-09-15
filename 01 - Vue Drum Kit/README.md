# Vue Drum kit

## 前言

該範例使用 Vue 3 的 Composition API 來管理狀態和行為，並且利用了 Vue 的響應式數據和生命週期鉤子來處理鍵盤事件和動畫過渡效果。

### 功能概述

1. **鍵盤事件監聽**：應用程式會監聽鍵盤按鍵事件，並根據按下的按鍵播放相應的鼓聲音效。
2. **動畫過渡效果**：當按下按鍵時，對應的按鍵元素會添加一個動畫效果，並在動畫結束後移除該效果。
3. **響應式數據**：使用 Vue 的響應式數據來管理當前按下的按鍵，確保 UI 能夠即時更新。

### 技術細節

- **Vue 3**：使用 Vue 3 的 Composition API 來組織和管理應用程式的狀態和行為。
- **HTML5 Audio**：使用 HTML5 的 Audio API 來播放聲音文件。
- **CSS3 動畫**：使用 CSS3 的過渡效果來實現按鍵按下時的動畫效果。

以下是完整的 HTML 和 JavaScript 程式碼：

### 摘要

1. playSound 方法負責播放按鍵對應的音效，並且將該按鍵的對應值添加到 activeKeys 陣列中以觸發視覺效果，利用`String.fromCharCode` 將 [ascii 轉成英文字母](https://zh.wikipedia.org/wiki/ASCII)

```javascript
const playSound = (e) => {
    const key = keys.value.find((k) => k.code === e.keyCode);
    if (!key) return;

    const audio = new Audio(`sounds/${key.sound}.wav`);
    activeKeys.value.push(key.code);
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        activeKeys.value = activeKeys.value.filter((code) => code !== key.code);
    }, 100);
};
```

2. 在 `onMounted` 的生命週期註冊上述的事件。
3. 利用`vue for`迴圈顯示 object

```html
<div
    v-for="key in keys"
    :key="key.code"
    :data-key="key.code"
    :class="['key', { playing: activeKeys.includes(key.label) }]"
    @transitionend="removeTransition"
>
    <kbd>{{ key.label }}</kbd>
    <span class="sound">{{ key.sound }}</span>
</div>
```


Display:

### CSS 概念

1. flex 基本用法:
    - align-items : center; //垂直置中
    - justify-content:center; //水平置中
2. transition 動畫效果用法: property duration timing-function delay;ex:transition:all 0.07s ease
    - property:有 width, color...
    - timing function:
        - ease cubic-bezier(0.25, 0.1, 0.25, 1.0)
        - liner cubic-bezier(0.0, 0.0, 1.0, 1.0)
        - ease-in cubic-bezier(0.42, 0.0, 1.0, 1.0)
        - ease-out cubic-bezier(0.0, 0.0, 0.58, 1.0)
        - ease-in-out cubic-bezier(0.42, 0.0, 0.58, 1.0)
3. 可以直接註冊標籤，並在 css 內敘述標籤功能。
4. 背景圖片

```html
html{ background:url(http://...) background-size:cover }
```

### 參考

1. [v-for](https://cn.vuejs.org/api/built-in-directives.html#v-for)
2. [onMounted()](https://cn.vuejs.org/api/composition-api-lifecycle#onmounted)
