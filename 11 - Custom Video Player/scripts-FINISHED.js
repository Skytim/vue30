const app = {
    data: function () {
        return {
            mousedown: false,
        };
    },
    methods: {
        togglePlay() {
            const method = this.$refs.video.paused ? "play" : "pause";
            this.$refs.video[method]();
        },

        updateButton(e) {
            const icon =  this.$refs.video.paused ? "►" : "❚ ❚";
            console.log(icon);
            this.$refs.toggle.textContent = icon;
        },

        skip(e) {
            this.$refs.video.currentTime += parseFloat(e.target.dataset.skip);
        },

        handleRangeUpdate(e) {
            this.$refs.video[e.target.name] = e.target.value;
        },

        handleProgress() {
            const percent = (this.$refs.video.currentTime / this.$refs.video.duration) * 100;
            this.$refs.progressBar.style.flexBasis = `${percent}%`;
        },
        scrub(e) {
            const scrubTime = (e.offsetX / this.$refs.progress.offsetWidth) * this.$refs.video.duration;
            this.$refs.video.currentTime = scrubTime;
        },
    },
    mounted() {},
};
Vue.createApp(app).mount("#app");
