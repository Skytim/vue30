var app = {
  data: function () {
    return {
      video: this.$refs.video,
      ctx: this.$refs.ctx,
      snap: this.$refs.snap,
      strip: this.$refs.strip,
    };
  },
  methods: {
    getVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
          console.log(localMediaStream);

          //  DEPRECIATION :
          //       The following has been depreceated by major browsers as of Chrome and Firefox.
          //       video.src = window.URL.createObjectURL(localMediaStream);
          //       Please refer to these:
          //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
          //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

          this.video.srcObject = localMediaStream;
          this.video.play();
        })
        .catch((err) => {
          console.error(`OH NO!!!`, err);
        });
    },
    paintToCanvas() {
      var width = this.video.videoWidth;
      var height = this.video.videoHeight;
      this.canvas.width = width;
      this.canvas.height = height;

      return setInterval(() => {
        this.ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = this.ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;

        // pixels = greenScreen(pixels);
        // put them back
        this.ctx.putImageData(pixels, 0, 0);
      }, 16);
    },
    takePhoto() {
      // played the sound
      this.snap.currentTime = 0;
      this.snap.play();

      // take the data out of the canvas
      const data = this.canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = data;
      link.setAttribute("download", "handsome");
      link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
      this.strip.insertBefore(link, strip.firstChild);
    },
  },
  mounted() {
    this.getVideo();
  },
};
Vue.createApp(app).mount("#app");
