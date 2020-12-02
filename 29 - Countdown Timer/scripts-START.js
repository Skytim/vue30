const app = {
    data() {
        return {
            data: [{ time: 20, info: '20 Secs' },
            { time: 300, info: 'Work 5' },
            { time: 900, info: 'Quick 15' },
            { time: 1200, info: 'Snack 20' },
            { time: 3600, info: 'Lunch Break' }]
        }
    },
    methods: {
    },
    mounted() {
    }
}
Vue.createApp(app).mount('#app')