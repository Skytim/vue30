# 05 Flex Panel Gallery

## 摘要

本教學打造出了一個互動式的“彈性面板”界面，使用了 Vue 3 Composition API 和 CSS 的 flexbox 布局和過渡動畫。主要功能如下

## 內容

該範例 使用 Vue 3 的 **Composition API** 來實現面板的展開與動畫效果。

#### 1. `setup` 函數

`setup` 函數是 Vue 3 Composition API 的核心，用於定義組件的邏輯和狀態。在這裡，我使用 `setup` 來初始化面板的資料，並定義與面板互動的邏輯。該函數返回的資料和方法會暴露給模板使用。

```javascript
setup() {
    const panels = reactive([
        {
            class: "panel1",
            text1: "Hey",
            text2: "Let's",
            text3: "Dance",
            isOpen: false,
            isActive: false,
        },
        // 其他面板資料
    ]);
    // 其他邏輯
    return {
        panels,
        toggleOpen,
        toggleActive,
    };
}
```

#### 2. reactive

reactive 用於創建響應式資料。這裡我使用 reactive 來定義 panels，它是一個包含面板資訊的陣列，每個面板都有對應的 CSS 類別、文本內容，以及控制展開和動畫的狀態變量 isOpen 和 isActive。

```javascript
const panels = reactive([
    {
        class: "panel1",
        text1: "Hey",
        text2: "Let's",
        text3: "Dance",
        isOpen: false,
        isActive: false,
    },
    // 其他面板
]);
```

#### 3. toggleOpen 函數

toggleOpen 函數用來切換面板的展開狀態。當使用者點擊某個面板時，對應的面板的 isOpen 屬性會在 true 和 false 之間切換，從而觸發 CSS 過渡效果，改變面板的大小和顯示更多文字。

```javascript
const toggleOpen = (index) => {
    panels[index].isOpen = !panels[index].isOpen;
};
```

#### 4. toggleActive 函數

toggleActive 函數用來在 CSS 過渡結束時切換 isActive 狀態。當過渡效果完成並且屬性名稱包含 flex 時，該函數會切換面板的 isActive 狀態，觸發文字的上下滑動效果。

```javascript
const toggleActive = (index, event) => {
    if (event.propertyName.includes("flex")) {
        panels[index].isActive = !panels[index].isActive;
    }
};
```

#### 5. 使用 v-for 迴圈渲染面板

在模板中，我使用 v-for 迴圈來渲染每個面板，並透過 @click 事件來綁定 toggleOpen 函數，透過 @transitionend 事件來監聽過渡效果的結束，從而調用 toggleActive 函數。

```html
<div class="panels">
    <div
        v-for="(panel, index) in panels"
        :key="index"
        :class="['panel', panel.class, { open: panel.isOpen, 'open-active': panel.isActive }]"
        @click="toggleOpen(index)"
        @transitionend="toggleActive(index, $event)"
    >
        <p>{{ panel.text1 }}</p>
        <p>{{ panel.text2 }}</p>
        <p>{{ panel.text3 }}</p>
    </div>
</div>
```


#### 結論

這段程式碼使用了 Vue 3 的 Composition API，包括 setup 函數、reactive、以及方法的定義，來實現面板的展開與動畫效果。toggleOpen 和 toggleActive 函數負責處理面板的展開和過渡動畫的切換。透過 Composition API 的靈活性，可以更方便地管理響應式狀態和事件處理邏輯。