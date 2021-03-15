# Array Cardio Day2

## 摘要

本篇延續 Day4 的陣列常使用方法做介紹。本篇包含 lodah 中常用的`some`，`every`，`find`，`findIndex`, `slice()`

## 內容

-   `some`: `lodash.some()`，只要一個條件符合就回傳`true`。`(new Date).getFullYear()`可以取得當前日期的年份。

> 題目：查詢陣列內是否有人成年

```javascript
var isAdult = _.some(people, function (person) {
    return new Date().getFullYear() - person.year >= 19;
});

console.log({ isAdult });
```

-   `every`: `lodash.every()`，要每一個都符合條件才回傳`true`。`

> 題目：查詢陣列內是否皆為成年。

```javascript
var allAdults = _.every(people, function (person) {
    return new Date().getFullYear() - person.year >= 19;
});
console.log({ allAdults });
```

-   `find`:有點類似`filter()`，但是`filter`會回傳全部符合的項目，`find()`則回傳單一項目。

> 題目：找陣列 id 等於 823423，並回傳該元素。

```javascript
var comment = _.find(comments, function (comment) {
    return comment.id === 823423;
});
console.log(comment);
```

-   `findIndex()`:和`find()`功能一樣，只是會查找`index`。

> 題目：找陣列 id 等於 823423，並回傳 index

```javascript
const index = _.findIndex(comments, function (comment) {
    return comment.id === 823423;
});
```

刪除元素可以使用

-   `splice(index, num)`，第一個參數是要刪除的 index 起點, 第二個參數是要刪除的數量，第三個參數之後是要新加入的內容。會回傳刪除後的陣列。
-   `slice(index, index)`，第一個參數為起點，第二個參數為終點（不包含終點），若第二個參數不填預設為最後。回傳一個 array object。若是利用拆分的方式，掠過`index`不處理。可以達到`splice()`的效果。
-   `...`spread operator(ES6 功能)，可以將陣列轉換成單一數組，或將單一數組轉換成陣列。下面的例子因為連續使用`comments.slice()`，所以會讓數值變成`[Array[], Array[]]`，為了打破第二層的 array，需使用`...`，把結構轉變成`[{}, {}, {}, {}, ...]`。

> 題目：刪除該 index 元素。

```javascript
const newComments = [..._.slice(comments, 0, index), ..._.slice(comments, index + 1)];
console.log(newComments);
```
