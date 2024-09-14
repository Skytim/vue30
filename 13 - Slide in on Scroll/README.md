## Vue 應用程式說明

這個 Vue 應用程式實現了滾動時圖片滑入效果，並使用 Vue 3 的 Composition API 來管理狀態和行為。以下是程式碼的主要部分：

### 引入 Vue 的 Composition API 函數

```javascript
const { ref, onMounted } = Vue;
```

- ref：用來定義可變的引用，通常用於基本數據類型或 DOM 元素。
- onMounted：在組件掛載完成後執行的生命週期鉤子。


### 定義 Vue 應用程式
使用 setup 函數來初始化組件的狀態和行為。


```javascript
const app = {
  setup() {
    const img1 = ref(null);
    const img2 = ref(null);
    const img3 = ref(null);
    const img4 = ref(null);
    const sliderImages = [img1, img2, img3, img4];

    // debounce function to optimize scroll event
    function debounce(func, wait = 20, immediate = true) {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    const checkSlide = () => {
      sliderImages.forEach((sliderImageRef) => {
        const sliderImage = sliderImageRef.value;
        const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add("active");
        } else {
          sliderImage.classList.remove("active");
        }
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", debounce(checkSlide));
    });

    return {
      img1,
      img2,
      img3,
      img4
    };
  },
};
```

### 響應式狀態

- img1, img2, img3, img4：使用 ref 定義的圖片引用，用於操作 DOM 元素。

### 事件處理函數

- debounce：防抖函數，用於優化滾動事件的處理。
- checkSlide：檢查圖片是否應該滑入視圖，並根據滾動位置添加或移除 active 類。

### 掛載後的初始化

在組件掛載後，使用 onMounted 鉤子添加滾動事件監聽器，並使用 debounce 函數優化滾動事件的處理。

### 返回模板中使用的變數和函數
返回 img1、img2、img3 和 img4，以便在模板中使用。
