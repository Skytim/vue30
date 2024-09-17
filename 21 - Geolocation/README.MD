### Vue 3 Composition API 代码说明

#### 1. 使用 `setup()` 函数

```javascript
const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const speed = ref(0); // 定义一个响应式的速度变量
    const heading = ref(0); // 定义一个响应式的方向变量

    onMounted(() => {
      if (navigator.geolocation) {
        // 使用地理定位 API 监控设备的速度和方向
        navigator.geolocation.watchPosition(
          (data) => {
            speed.value = data.coords.speed ?? 0; // 更新速度
            heading.value = data.coords.heading ?? 0; // 更新方向
          },
          (err) => {
            console.error(err); // 如果获取地理位置出错，打印错误信息
          }
        );
      }
    });

    return { speed, heading }; // 返回给模板使用的变量
  },
}).mount("#app");
```