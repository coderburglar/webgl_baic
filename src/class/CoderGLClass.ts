class CoderGLClass {
    gl: WebGL2RenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        this.gl = this.awakeGLInstance(canvas);
    }

    private awakeGLInstance(canvas: HTMLCanvasElement) {
        let gl
        try {
            gl = canvas.getContext('webgl2');
        } catch (e) {
            console.error("获取 WebGL 上下文时出现错误：", e);
            throw new Error("错误")
        }
        return gl;
    }

    clearColor() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        return this.gl
    }

    setSize(w: number, h: number) {

        (this.gl.canvas as HTMLElement).style.width = w + 'px';
        (this.gl.canvas as HTMLElement).style.height = h + 'px'
        this.gl.canvas.width = w;
        this.gl.canvas.height = h;
        this.gl.viewport(0, 0, w, h);
    }

}

export default CoderGLClass