<template>
  <canvas ref="backgroundCanvas" class="background"></canvas>
  <div class="wrapper">
    <canvas ref="foregroundCanvas" class="foreground"></canvas>
    <div class="content-wrapper">
      <div class="title">{{ 'Thuan Hai Cong Ho' }}</div>
    </div>
  </div>
</template>

<script>
import pianoImg from '@/assets/img/piano-1.jpg'

export default {
  data() {
    return {
      /** @type {CanvasRenderingContext2D} */
      ctxBg: null,
      /** @type {CanvasRenderingContext2D} */
      ctxFg: null,
      /** @type {HTMLCanvasElement} */
      canvasBg: null,
      /** @type {HTMLCanvasElement} */
      canvasFg: null,
      animationId: null,
      /** @type {HTMLImageElement} */
      bgImg: null,
      offsetX: 0,
      offsetY: 0,
      lastRenderTime: 0,
      speed: 200,
    }
  },
  mounted() {
    this.canvasBg = /** @type {HTMLCanvasElement} */ (this.$refs.backgroundCanvas)
    this.ctxBg = this.canvasBg.getContext('2d')
    this.canvasFg = /** @type {HTMLCanvasElement} */ (this.$refs.foregroundCanvas)
    this.ctxFg = this.canvasFg.getContext('2d')

    window.addEventListener('resize', this.resizeCanvas)
    this.resizeCanvas()

    this.bgImg = new Image()
    this.bgImg.src = pianoImg
    this.bgImg.onload = () => {
      this.lastRenderTime = performance.now()
      this.bgAnim()
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas)
    cancelAnimationFrame(this.animationId)
  },
  methods: {
    resizeCanvas() {
      this.canvasBg.width = this.canvasBg.clientWidth
      this.canvasBg.height = this.canvasBg.clientHeight

      this.canvasFg.width = this.canvasFg.clientWidth
      this.canvasFg.height = this.canvasFg.clientHeight
    },
    bgAnim() {
      const now = performance.now()
      const delta = (now - this.lastRenderTime) / 1000
      this.offsetX =
        (this.offsetX - this.speed * delta) % (this.bgImg.width - this.canvasBg.clientWidth)
      this.offsetY =
        (this.offsetY - this.speed * delta) % (this.bgImg.height - this.canvasBg.clientHeight)
      this.ctxBg.drawImage(
        this.bgImg,
        this.offsetX,
        this.offsetY,
        this.bgImg.width,
        this.bgImg.height,
      )
      this.ctxFg.drawImage(
        this.canvasBg,
        this.offsetX - (document.body.clientWidth - 500),
        this.offsetY - (document.body.clientHeight - 400),
        this.bgImg.width,
        this.bgImg.height,
      )
      this.lastRenderTime = now
      this.animationId = requestAnimationFrame(() => this.bgAnim())
    },
  },
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  position: absolute;
  width: 500px;
  height: 400px;
  background: radial-gradient(ellipse at top center, #fff3, #0000) #0008;
  border: 1px solid #fff3;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 5px 20px 2px #000;
  z-index: 1;
}

.foreground,
.background {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
}

.foreground {
  width: 500px;
  height: 400px;
  filter: blur(10px);
}
</style>
