function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// buttons.forEach(button => button.addEventListener('click', startTimer));
// document.customForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const mins = this.minutes.value;
//   console.log(mins);
//   timer(mins * 60);
//   this.reset();
// });


const app = {
  data() {
    return {
      data: [{ time: 20, info: '20 Secs' },
      { time: 300, info: 'Work 5' },
      { time: 900, info: 'Quick 15' },
      { time: 1200, info: 'Snack 20' },
      { time: 3600, info: 'Lunch Break' }],
      countdown: null,
      minutes: null,
    }
  },
  methods: {
    startTimer(e) {
      const seconds = parseInt(e.target.dataset.time);
      this.timer(seconds);
    },
    timer(seconds) {
      var self = this;
      // clear any existing timers
      clearInterval(self.countdown);

      const now = Date.now();
      const then = now + seconds * 1000;
      self.displayTimeLeft(seconds);
      self.displayEndTime(then);

      self.countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
          clearInterval(self.countdown);
          return;
        }
        // display it
        self.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
      document.title = display;
      this.$refs.displayTimeLeft.textContent = display;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const adjustedHour = hour > 12 ? hour - 12 : hour;
      const minutes = end.getMinutes();
      this.$refs.displayTimeEnd.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
    },
    processForm(e) {
      e.preventDefault();
      const mins = this.minutes;
      console.log(mins);
      this.timer(mins * 60);
      e.reset();
    }
  }
}
Vue.createApp(app).mount('#app')