import CoderGLClass from "./CoderGLClass";
import ShaderUtil from "./ShaderUtil";
import shaderUtil from "./ShaderUtil";

class BaseClass{
    canvas:HTMLCanvasElement
    gl:CoderGLClass
    shaderUtls:ShaderUtil
    constructor(canvasID:string = 'glCanvas') {
        const canvas = this.awakeCanvas()
        this.checkCurrentCanvas(canvas)
        this.gl = new CoderGLClass(this.canvas)
        this.shaderUtls = new ShaderUtil()
    }
    private awakeCanvas(canvasID:string = 'glCanvas'){
        let canvas;
        try{
            canvas =document.getElementById(canvasID);
        }catch (e) {
            console.log("sorry ,please checkout your canvasId,we will create a base canvas with id is glCanvas")
            canvas = document.createElement('canvas')
            canvas.setAttribute('id','glCanvas')
        }
        return canvas
    }
    private  checkCurrentCanvas(canvas:HTMLCanvasElement){
        this.canvas = canvas
    }

    //管理的主要方法
    clear(){
      return   this.gl.clearColor()
    }
    setSize(w,h){
        return  this.gl.setSize(w,h)
    }
    draw(){
        this.clear()
        this.gl.gl.drawArrays(this.gl.gl.POINTS,0,1)

    }
    initShader(vshaderText:string,fshaderText:string){
        const vshader =shaderUtil.createShader(this.gl.gl,vshaderText,this.gl.gl.VERTEX_SHADER)
        const fshader =shaderUtil.createShader(this.gl.gl,fshaderText,this.gl.gl.FRAGMENT_SHADER)
        const shaderProg = ShaderUtil.createProgram(this.gl.gl,vshader!,fshader!,true);
        if(!shaderProg)return
        this.gl.gl.useProgram(shaderProg)
        //测试一下
        const aryVertx = new Float32Array([0,0,0]);
        const bufVers = this.gl.gl.createBuffer()
        let a_position =this.gl.gl.getAttribLocation(shaderProg,'a_position');

        this.gl.gl.bindBuffer(this.gl.gl.ARRAY_BUFFER,bufVers)
        this.gl.gl.bufferData(this.gl.gl.ARRAY_BUFFER,aryVertx,this.gl.gl.STATIC_DRAW);
        //赋值的操作
        // this.gl.gl.vertexAttrib4fv(a_position,aryVertx);
        this.gl.gl.vertexAttribPointer(a_position, 3, this.gl.gl.FLOAT, false, 0, 0);
        this.gl.gl.enableVertexAttribArray(a_position);
    }

}


export  default  BaseClass