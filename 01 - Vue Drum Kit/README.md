# Vue Drum kit

### 摘要

1. 透過輸入鍵盤的案件事件`keydown`觸發功能，利用`ref`定位取得對應的 key object，以及 audio，並將對應的 key object 加上 class，接著將相對應的 audio 放出音樂`audio.play()`。

2. 在 `mounted` 的生命週期註冊上述的事件。
3. 利用`vue for`迴圈顯示 object
4. 利用`ref`定位取得你想要的 object。
5. 利用`String.fromCharCode` 將 [ascii 轉成英文字母](https://zh.wikipedia.org/wiki/ASCII)
```
code:
  <span>{{String.fromCharCode(item.key)}}</span>
display:

```

### CSS概念

1. flex基本用法:
	- align-items : center; //垂直置中
	- justify-content:center; //水平置中
2. transition動畫效果用法: property duration timing-function delay;ex:transition:all 0.07s ease
	- property:有width, color...
	- timing function:
		- ease cubic-bezier(0.25, 0.1, 0.25, 1.0)
		- liner cubic-bezier(0.0, 0.0, 1.0, 1.0)
		- ease-in cubic-bezier(0.42, 0.0, 1.0, 1.0)
		- ease-out cubic-bezier(0.0, 0.0, 0.58, 1.0)
		- ease-in-out cubic-bezier(0.42, 0.0, 0.58, 1.0)
3. 可以直接註冊標籤，並在css內敘述標籤功能。
4. 背景圖片

```
html{
	background:url(http://...)
    background-size:cover
}
```

### 參考
1. [Vue $refs](https://blog.johnsonlu.org/vue-refs/)