# Axios Type Ahead

## 摘要

本篇主要介紹 `Axios`用 ajax 的方式來取資料(城市名稱)，並依使用者輸入字符的不同查找不同的資料，會使用到正規表達式來處理字串。
[Axios](https://github.com/axios/axios)

## 內容

-   `Axios`:是 目前許多開發者所使用的 ajax libray，需要透過引入方式使用使用，詳見[Axios](https://github.com/axios/axios)。`Axios API`有許多優點，其中一個是實作了`Promise`的語法結構，讓使用者可以更有效的解析(resolve)回傳的資料。

-   `Promise`: `Promise`是一個`非同步(async)操作執行後的結果`。當`Promise`初始話時，狀態為`等待中(pending)`，當執行 async 任務後，會回傳結果，無論成功(fulfilled)或是拒絕(rejected)皆會回傳，且不會在改變回傳的內容，所以每次執行時都會回傳新的`Promise`物件。

-   `Response`:當`Promise`被`解析(resolve)`後會回傳`Response`物件，可以直接以`.then()`方式進行串接解析，且能使用`Response`提供的`json()`方法取得資料。

> 1. 資料抓取:

-   使用 Axios 從一個遠端的 JSON 端點取得城市資料。這些資料包括城市名稱、州名以及人口數，並被存放在 initCities 這個 ref 中。
-   這個操作是在 Vue 的 onMounted 生命周期鉤子中完成的，也就是說，當元件被掛載到 DOM 上後，會自動發送請求來取得資料，確保應用程式一開始就能擁有完整的城市資料來進行搜尋。

```javascript
const endpoint = ref(
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
);
const initCities = ref([]);

onMounted(() => {
    axios.get(endpoint.value).then((response) => {
        initCities.value = response.data;
    });
});
```

-   findMatches 函數是應用程式的核心功能之一，它負責根據使用者的輸入來篩選城市和州。這個函數使用正則表達式（RegExp）來檢查使用者輸入的文字是否與資料中的城市或州名匹配。
-   這個函數會回傳一個符合條件的資料陣列。如果使用者輸入空白，則回傳一個空陣列，避免無效的匹配操作。

-   `RegExp()`:用來做正規表達試的參數， `g`代表 global,`i`代表 insensitive,不受大小寫影響。

```javascript
const findMatches = (wordToMatch, cities) => {
    if (wordToMatch === "") {
        return [];
    }
    const regex = new RegExp(wordToMatch, "gi");
    return cities.filter((place) => place.city.match(regex) || place.state.match(regex));
};
```

到這邊就確定可以透過`findMatches()`取到特定的資料了。

> 接下來要把資料依照查找的字串 render 出來。

-   displayMatches 函數是事件處理器，綁定在輸入框的@input 事件上。當使用者在輸入框中鍵入文字時，displayMatches 會自動調用 findMatches 來篩選匹配的城市或州，並將結果存放在 displayCities 這個 ref 中。
-   displayCities 中的資料會即時更新，並顯示在介面上的建議列表（<ul class="suggestions">）中，使使用者能夠即時看到匹配結果。

```javascript
<input
  type="text"
  class="search"
  placeholder="City or State"
  @input="displayMatches"
/>

const displayMatches = (e) => {
  displayCities.value = findMatches(e.target.value, initCities.value);
};
```

> 最後再處理人數的顯示處理問題。

-   用`numberWithCommas`處理正規表達式的問題，函數負責將人口數字格式化，將其轉換為帶有千分位逗號的格式（例如：1000000 -> 1,000,000），以提高數據的可讀性。
-   這個格式化功能在顯示匹配結果時使用，將每個城市的 population 數字格式化後顯示在建議列表的每個項目中。

```javascript
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

<span class="population">{{ numberWithCommas(data?.population) }}</span>
```
