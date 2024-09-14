## Vue 應用程式說明

這個 Vue 應用程式實現了滑鼠移動時文字陰影效果，並使用 Vue 3 的 Composition API 來管理狀態和行為。以下是程式碼的主要部分：

### 引入 Vue 的 Composition API 函數

```javascript
const { ref, reactive, onMounted } = Vue;
```

-   ref：用來定義可變的引用，通常用於基本數據類型或 DOM 元素。
-   reactive：用來定義響應式的物件，通常用於複雜數據結構。
-   onMounted：在組件掛載完成後執行的生命週期鉤子。

### 定義 Vue 應用程式

使用 setup 函數來初始化組件的狀態和行為。

```javascript
const app = {
    setup() {
        const hero = ref(null);
        const text = ref(null);
        const walk = ref(500);

        const shadow = (e) => {
            const { offsetWidth: width, offsetHeight: height } = hero.value;
            let { offsetX: x, offsetY: y } = e;
            if (e.target !== hero.value) {
                x = x + e.target.offsetLeft;
                y = y + e.target.offsetTop;
            }

            const xWalk = Math.round((x / width) * walk.value - walk.value / 2);
            const yWalk = Math.round((y / height) * walk.value - walk.value / 2);

            text.value.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)`;
        };

        return {
            hero,
            text,
            shadow,
        };
    },
};

Vue.createApp(app).mount("#app");
```
