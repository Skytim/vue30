# Canvas

##  摘要

本篇主要透過Html的`canvas` 標籤搭配Vue做出畫布的效果。
主要適用於顏色的變化(`hsl`)及軌跡的粗細縮放。

## 內容

> 首先先定義畫布的大小

- html內已經定義了標籤`canvas` 用 Vue 選取後，需先設定畫布的內容，在 Vue的生命週期mount中，使用`getContext('2d')`定義為2d繪圖。接下來可以定義畫布範圍，若不定義範圍則使用html定義的範圍，若需改寫則須重新定義，這邊定義為`window.innerWidth`及`window.innerHeight`。

  ```javascript
    this.canvas = this.$refs['draw'];
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  ```

> 接下來定義繪製的顯示方式

- Canvas已經有內建許多屬性，可參考[Canvas](http://www.w3school.com.cn/tags/html_ref_canvas.asp)，這邊會設定4種屬性。

  - `ctx.strokeStyle`定義繪畫的顏色，
  - `ctx.lineJoin`定義兩線相交時的拐角練習，
  - `ctx.lineCap`定義結束端點樣式。
  - `ctx.lineWidth`定義寬度。

  ```javascript
    this.ctx.strokeStyle = '#BADA55';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 100;
  ```

> 接下來定義繪畫的起始方式。

- 利用`isDrawing`等於`true`代表正在繪圖，`false`代表不在繪圖。

  ```javascript
    data: function () {
        return {
            isDrawing: false,
        }
    }
  ```

> 加入事件來驅動繪畫

- 這邊會使用到`@mousedown`按下滑鼠， `@mousemove`移動滑鼠，`@mouseup`放開滑鼠及 `@mouseout` 滑鼠移開使窗。
按下滑鼠後`isDrawing`為`true`開始繪畫。`@mouseup`時代表繪圖完成`isDrawing`為`false`，`mouseout`移開視窗時`isDrawing`為`false`。

  ```html
  <canvas id="draw" width="800" height="800" ref="draw" @mousedown="mousedownAction($event)"
    @mousemove="draw($event)" @mouseup="isDrawingFalse()"  @mouseout="isDrawingFalse()"></canvas>
  ```

> 先定義繪畫的方法，並查看監聽事件是否有效。

- 定義`draw`這個方法。首先可以先判定`isDrawing`是否為`true`，為`false`則返回。

  ```javascript
  draw(e){
    if (!isDrawing) return; //設定停止
    console.log(e); //此時可以打開使用者工具看看有無回傳座標相關訊息，若有則代表到目前為止皆為成功!
  }
  ```

> 接下來開始定義繪畫的內容

- 定義繪畫內容會用到4個參數。

  - `this.ctx.beginPath()` 當作繪畫啟動。
  - `this.ctx.moveTo(a,b)` 當作起始位置。
  - `this.ctx.lineTo(a,b)` 當作終點位置。
  - `this.ctx.stroke()` 代表繪製以定義的路徑。

- 先在function外定義最後的位置為`lastX, lastY`。`e.offsetX`代表回傳事件的當前座標，所以我們可以定義`e.offsetX, e.offsetY`為每次的起始位置。

  ```javascript
  let lastX = 0;
  let lastY = 0;

  draw(e){
      if (!this.isDrawing) return;
        this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        this.ctx.beginPath();
        // start from
        this.ctx.moveTo(this.lastX, this.lastY);
        // go to
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
  }

  ```

- 到這邊應該會發現繪製的途徑都是以同一個點當作起始位置，所以我們需要動態的更動起始位置，在`draw`方法內加入`[lastX, lastY] = [e.offsetX, e.offsetY];`更新起始位置。

  ```javascript
    draw(e) {
        if (!this.isDrawing) return; // stop the fn from running when they are not moused down
        this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        this.ctx.beginPath();
        // start from
        this.ctx.moveTo(this.lastX, this.lastY);
        // go to
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];

        this.hue++;
        if (this.hue >= 360) {
            this.hue = 0;
        }
        if (this.ctx.lineWidth >= 100 || this.ctx.lineWidth <= 1) {
            this.direction = !this.direction;
        }

        if (this.direction) {
            this.ctx.lineWidth++;
        } else {
            this.ctx.lineWidth--;
        }
    }
  ```

> 到目前為止應該就能呈現在畫布上畫圖的效果了!如果你還想要再做些效果?像是顏色，以及繪畫的粗細?這邊先來時做顏色的變化吧!

- `hsl`是一個色彩表示的方式`hsl(hue, Saturation, Lightness)`。

  - `hue`代表顏色的度數0-360，0是紅色 ，120是綠色，240是藍色；
  - `Saturation`代表灰階程度，0%為灰黑，100%為彩色，一般設置為100%。
  - `Lightness`為亮度，0%代表黑，100%代表白，一般設置為50%。

  ```javascript
  let hue = 0;

  function draw(e){
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;//重新定義顏色
    ...
    this.hue++;

    if (this.hue >= 360) {
        this.hue = 0; //若++到360自動歸零
    }
  }
  ```

> 顏色定義完後，再來定義寬度，處理方式是由細到粗，並回歸到細。

- 定義`direction`為粗細的參數，並定義其在`draw`中的變化。

- 當`direction`為`ture`時，`ctx.lineWidth`遞增，當增加到100時把`direction`改成`false`。

- 當`direction`為`false`時，`ctx.lineWidth`遞減，當撿到1時把`direction`改成`true`。

```javascript
  let direction = true;
  draw(e){
    ...
    if (this.ctx.lineWidth >= 100 || this.ctx.lineWidth <= 1) {
      this.direction = !this.direction;
    }

    if (this.direction) {
        this.ctx.lineWidth++;
    } else {
        this.ctx.lineWidth--;
    }
  }
```
