### 摘要

1. 利用`refs`定位取得對應的 三個指針 (hour、minute、seconds)
2. 橫線使用`transform:rotate(90deg)`會變成直線，預設情況下，會以中心點當作軸心旋轉(50%)，若要移動軸心則要使用`transform-origin:100%`(最右側)。
3. `transition-timing-function:ease`可當作動畫的呈現效果。
4. 在 `mounted` 的生命週期註冊執行時間`setInterval(setDate, 1000)`，每一秒執行上述內容。
5. 取時間使用`now = new Date()`, 可以取得的分秒時`now.getSeconds()`。

```javascript
const now = new Date();
const seconds = now.getSeconds();
const secondsDegrees = ((seconds / 60) * 360) + 90;
this.$refs.secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

const mins = now.getMinutes();
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
this.$refs.minHand.style.transform = `rotate(${minsDegrees}deg)`;

const hour = now.getHours();
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
this.$refs.hourHand.style.transform = `rotate(${hourDegrees}deg)`;
```