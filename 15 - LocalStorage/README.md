## Vue 應用程式說明

這個 Vue 應用程式使用 Vue 3 的 Composition API 來管理待辦事項清單，並將其儲存在 `localStorage` 中。以下是程式碼的主要部分：

### 引入 Vue 的 Composition API 函數

```javascript
const { ref, reactive, onMounted } = Vue;
```

- ref：用來定義可變的引用，通常用於基本數據類型或 DOM 元素。
- reactive：用來定義響應式的物件，通常用於複雜數據結構。
- onMounted：在組件掛載完成後執行的生命週期鉤子。


### 定義 Vue 應用程式
使用 setup 函數來初始化組件的狀態和行為。


```javascript
const app = {
  setup() {
    const items = ref(JSON.parse(localStorage.getItem('items')) || []);
    const item = ref('');

    const addItem = () => {
      const newItem = {
        text: item.value,
        done: false
      };

      items.value.push(newItem);
      localStorage.setItem('items', JSON.stringify(items.value));
      item.value = '';
    };

    const toggleDone = (e) => {
      if (!e.target.matches('input')) return; // skip this unless it's an input
      const index = e.target.getAttribute('index');
      items.value[index].done = !items.value[index].done;
      localStorage.setItem('items', JSON.stringify(items.value));
    };

    onMounted(() => {
      items.value = JSON.parse(localStorage.getItem('items')) || [];
    });

    return {
      items,
      item,
      addItem,
      toggleDone
    };
  }
};
```

### 響應式狀態
- items：使用 ref 定義的待辦事項清單，初始值為從 localStorage 中獲取的資料。
- item：使用 ref 定義的新待辦事項的文本。

### 事件處理函數
- addItem：新增待辦事項到清單中，並更新 localStorage。
- toggleDone：切換待辦事項的完成狀態，並更新 localStorage。


### 掛載後的初始化
- 在組件掛載後，使用 onMounted 鉤子從 localStorage 中獲取資料並初始化 items。
- 返回模板中使用的變數和函數
- 返回 items、item、addItem 和 toggleDone，以便在模板中使用。



