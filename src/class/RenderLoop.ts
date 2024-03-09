class RenderLoop {
  /**
   * @description 上一帧的时间数
   * **/
  msLastFrame: number
  /**
   * @description 要执行的回调函数
   * **/
  callBack: (time?: number) => any
  /**
   *@description 当前渲染是否循环
   *  **/
  isActive: boolean
  /**
   * @description 当前的帧率
   * **/
  fps: number
  /**
   * @description 用于限制时间间隔
   * **/
  msFpsLimit: number
  /**
   * @description 渲染的主要方法
   * **/
  run: (time?: number) => any
  constructor(callBack: (time?: number) => any, fps: number) {
    this.msLastFrame = 0
    this.callBack = callBack
    this.isActive = false
    this.fps = fps
    this.msFpsLimit = 0
    this.run = () => { }
    if (!fps&&fps > 100) {
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
  /**
   * @description 启用循环
   * **/
  start() {
    this.isActive = true
    this.msLastFrame = performance.now()
    window.requestAnimationFrame(this.run)
  }
  /**
   * @description 停止循环
   * **/
  stop() {
    this.isActive = false
  }
}


export default RenderLoop