import CoderGLClass from "./CoderGLClass";
import RenderLoop from "./RenderLoop";
import ShaderUtil from "./ShaderUtil";
import shaderUtil from "./ShaderUtil";

class BaseClass {
    canvas!: HTMLCanvasElement
    gl: CoderGLClass
    shaderUtls: ShaderUtil
    u_point_size:WebGLUniformLocation
    // renderLoop: RenderLoop
    constructor(canvasID: string = 'glCanvas') {
        const canvas = this.awakeCanvas() as HTMLCanvasElement
        this.checkCurrentCanvas(canvas)
        this.gl = new CoderGLClass(this.canvas)
        this.shaderUtls = new ShaderUtil()
    }
    private awakeCanvas(canvasID: string = 'glCanvas') {
        let canvas;
        try {
            canvas = document.getElementById(canvasID);
        } catch (e) {
            console.log("sorry ,please checkout your canvasId,we will create a base canvas with id is glCanvas")
            canvas = document.createElement('canvas')
            canvas.setAttribute('id', 'glCanvas')
        }
        return canvas
    }
    private checkCurrentCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    //管理的主要方法
    clear() {
        return this.gl.clearColor()
    }
    setSize(w: number, h: number) {
        return this.gl.setSize(w, h)
    }
    draw() {
        this.clear()
        this.gl.gl.drawArrays(this.gl.gl.TRIANGLES, 0, 3)

    }
    initShader(vshaderText: string, fshaderText: string,size:number) {
        const vshader = shaderUtil.createShader(this.gl.gl, vshaderText, this.gl.gl.VERTEX_SHADER)
        const fshader = shaderUtil.createShader(this.gl.gl, fshaderText, this.gl.gl.FRAGMENT_SHADER)
        const shaderProg = ShaderUtil.createProgram(this.gl.gl, vshader!, fshader!, true);
        if (!shaderProg) return
        this.gl.gl.useProgram(null)
        //定义一组数据,但是我们要区分这只是顶点需要的位置数据,而不是顶点.
        const aryVertx = new Float32Array([0,0,0,.5,0,0,-.5,0,0]);
        //创建VBO顶点缓冲对象,与opengl不一样不需要显示传递一个id
        const bufVers = this.gl.gl.createBuffer()
        //返回的其实是一个index
        let a_position = this.gl.gl.getAttribLocation(shaderProg, 'a_position');
        let iResultion = this.gl.gl.getUniformLocation(shaderProg,'iResoultion')
        this.u_point_size = this.gl.gl.getUniformLocation(shaderProg, 'uPointSize');
        //给ARRAY_BUFFER缓冲区绑定buffer
        this.gl.gl.bindBuffer(this.gl.gl.ARRAY_BUFFER, bufVers)
        //把之前定义的顶点数据备份到VBO上 ,意味着其实aryVetrtx可以删除. 并且这个地方和opengl不一样不需要显示传递size,解释一下为什么需要gl.STATIC_DRAW,就是这种修改的我们把他放在显卡能够告诉写入的内存部分.
        this.gl.gl.bufferData(this.gl.gl.ARRAY_BUFFER, aryVertx, this.gl.gl.STATIC_DRAW);
        //赋值的操作
        this.gl.gl.useProgram(shaderProg)
        this.setUniform1f(this.u_point_size, size);
        this.gl.gl.uniform2f(iResultion,500,500);
        //启用顶点属性数组
        this.gl.gl.enableVertexAttribArray(a_position);
        //位置内存分布,
        this.gl.gl.vertexAttribPointer(a_position, 2, this.gl.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 8);


    }


    setUniform1f(name:WebGLUniformLocation,size:number){
        this.gl.gl.uniform1f(name,size);
    }
}


export default BaseClass