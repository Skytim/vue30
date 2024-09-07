const { ref, onMounted } = Vue;

const app = {
    setup() {
        const mousedown = ref(false);
        const video = ref(null);
        const toggle = ref(null);
        const progress = ref(null);
        const progressBar = ref(null);

        const togglePlay = () => {
            const method = video.value.paused ? "play" : "pause";
            video.value[method]();
            updateButton();
        };

        const updateButton = () => {
            const icon = video.value.paused ? "►" : "❚ ❚";
            toggle.value.textContent = icon;
        };

        const skip = (e) => {
            video.value.currentTime += parseFloat(e.target.dataset.skip);
        };

        const handleRangeUpdate = (e) => {
            video.value[e.target.name] = e.target.value;
        };

        const handleProgress = () => {
            const percent = (video.value.currentTime / video.value.duration) * 100;
            progressBar.value.style.flexBasis = `${percent}%`;
        };

        const scrub = (e) => {
            const scrubTime = (e.offsetX / progress.value.offsetWidth) * video.value.duration;
            video.value.currentTime = scrubTime;
        };

        onMounted(() => {
            video.value.addEventListener("click", togglePlay);
        });

        return {
            mousedown,
            video,
            toggle,
            progress,
            progressBar,
            togglePlay,
            updateButton,
            skip,
            handleRangeUpdate,
            handleProgress,
            scrub,
        };
    },
};

Vue.createApp(app).mount("#app");
