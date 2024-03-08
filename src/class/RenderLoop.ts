class RenderLoop {
  msLastFrame: number
  callBack: (time?: number) => any
  isActive: boolean
  fps: number
  msFpsLimit: number
  run: (time?: number) => any
  constructor(callBack: (time?: number) => any, fps: number) {
    this.msLastFrame = 0
    this.callBack = callBack
    this.isActive = false
    this.fps = 0
    this.msFpsLimit = 0
    this.run = () => { }
    if (!fps && fps > 0) {
      this.msFpsLimit = 1000 / fps
      this.run = () => {
        let msCurrent = performance.now()
        let msDelta = (msCurrent - this.msLastFrame)
        let deltaTime = msDelta / 1000

        if (msDelta > this.msFpsLimit) {
          this.fps = Math.floor(1 / deltaTime)
          this.msLastFrame = msCurrent
          this.callBack(deltaTime)
        }

        if (this.isActive) window.requestAnimationFrame(this.run)
      }
    } else {
      this.run = () => {
        let msCurrent = performance.now()
        let deltaTime = (msCurrent - this.msLastFrame) / 1000.0
        this.fps = Math.floor(1 / deltaTime)
        this.msLastFrame = msCurrent
        this.callBack(deltaTime)
        if (this.isActive) window.requestAnimationFrame(this.run)
      }
    }
  }
  start() {
    this.isActive = true
    this.msLastFrame = performance.now()
    window.requestAnimationFrame(this.run)
    return this
  }

  stop() {
    this.isActive = false
  }
}


export default RenderLoop