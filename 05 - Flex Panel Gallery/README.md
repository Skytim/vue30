# Flex Panel Gallery

## 摘要

本教學打造出了一個互動式的“彈性面板”界面，使用了 Vue 3 Composition API 和 CSS 的 flexbox 布局和過渡動畫。主要功能如下

## 內容
Vue應用創建：
•	使用 Vue 3 的 Composition API (createApp) 來創建應用。
•	在 setup 函數中初始化應用的狀態和方法。
•	Reactive State（反應式狀態）：
•	使用 reactive 創建一個包含五個面板狀態的對象。每個面板包含以下屬性：
•	class: 面板的CSS類名，用於設置背景圖片。
•	text1, text2, text3: 面板上顯示的文本。
•	isOpen: 用於控制面板是否展開。
•	isActive: 用於控制面板中的文本動畫是否激活。
•	事件處理函數：
•	toggleOpen(index): 切換指定面板的 isOpen 狀態。當面板被點擊時，觸發這個函數來展開或收縮面板。
•	toggleActive(index, event): 當面板過渡結束後（過渡完成），如果 transitionend 事件的 propertyName 包含 flex，則切換 isActive 狀態。這是用來激活文本的進出動畫效果。
•	模板綁定：
•	在返回的 setup 中，我們將狀態 panels 和方法 toggleOpen, toggleActive 返回給 Vue 模板使用。模板會根據這些狀態和方法來渲染並處理交互事件。
