#  Axios Type Ahead

## 摘要
本篇主要介紹 `Axios`用 ajax的方式來取資料(城市名稱)，並依使用者輸入字符的不同查找不同的資料，會使用到正規表達式來處理字串。
[Axios](https://github.com/axios/axios)

## 內容
- `Axios`:是 目前許多開發者所使用的 ajax libray，需要透過引入方式使用使用，詳見[Axios](https://github.com/axios/axios)。`Axios API`有許多優點，其中一個是實作了`Promise`的語法結構，讓使用者可以更有效的解析(resolve)回傳的資料。

- `Promise`: `Promise`是一個`非同步(async)操作執行後的結果`。當`Promise`初始話時，狀態為`等待中(pending)`，當執行async任務後，會回傳結果，無論成功(fulfilled)或是拒絕(rejected)皆會回傳，且不會在改變回傳的內容，所以每次執行時都會回傳新的`Promise`物件。

- `Response`:當`Promise`被`解析(resolve)`後會回傳`Response`物件，可以直接以`.then()`方式進行串接解析，且能使用`Response`提供的`json()`方法取得資料。 

>利用 axios 取得資料

```javascript
const app = {
    data() {
      return {
        endpoint:
          "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
        initCities: [],
      };
    }
    },
    mounted() {
      var self = this;
      axios.get(self.endpoint).then(function (response) {
        self.initCities = response.data;
      });
    }
```

>接下來要處理輸入特定文字後取得特定資料。

- `RegExp()`:用來做正規表達試的參數， `g`代表global,`i`代表insensitive,不受大小寫影響。 

```javascript
findMatches(wordToMatch, cities) {
  if(wordToMatch===""){
    return [];
    }
    return cities.filter((place) => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
},
```

到這邊就確定可以透過`findMatches()`取到特定的資料了。

> 接下來要把資料依照查找的字串render出來。

- 對輸入框加入`keyup`及`change`監聽事件，並觸發`displayMatehes`的查找事件。

```javascript
<input
  type="text"
  class="search"
  placeholder="City or State"
  @change="displayMatches"
  @keyup="displayMatches"
/>

displayMatches(){
  this.displayCities = this.findMatches(e.target.value, this.initCities);
}
```

> 最後再處理人數的顯示處理問題。

- 用`numberWithCommas`處理正規表達試的問題。

```javascript
numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

<span class="population">{{ numberWithCommas(data?.population)}}</span>
```
