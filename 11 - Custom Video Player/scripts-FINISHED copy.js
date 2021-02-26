/* Get Our Elements */
// const player = document.querySelector(".player");
// const video = player.querySelector(".viewer");
// const progress = player.querySelector(".progress");
// const progressBar = player.querySelector(".progress__filled");
// const toggle = player.querySelector(".toggle");
// const skipButtons = player.querySelectorAll("[data-skip]");
// const ranges = player.querySelectorAll(".player__slider");

/* Hook up the event listeners */
// video.addEventListener("click", togglePlay);
// video.addEventListener("play", updateButton);
// video.addEventListener("pause", updateButton);
// video.addEventListener("timeupdate", handleProgress);

// toggle.addEventListener("click", togglePlay);
// skipButtons.forEach((button) => button.addEventListener("click", skip));
// ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
// ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));

// let mousedown = false;
// progress.addEventListener("click", scrub);
// progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
// progress.addEventListener("mousedown", () => (mousedown = true));
// progress.addEventListener("mouseup", () => (mousedown = false));

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

        updateButton() {
            const icon = this.paused ? "►" : "❚ ❚";
            console.log(icon);
            toggle.textContent = icon;
        },

        skip(e) {
            this.$refs.video.currentTime += parseFloat(e.target.dataset.skip);
        },

        handleRangeUpdate(e) {
            this.$refs.video[e.target.name] = e.target.value;
        },

        handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.flexBasis = `${percent}%`;
        },

        scrub(e) {
            const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        },
        
    },
    mounted() {},
};
Vue.createApp(app).mount("#app");
