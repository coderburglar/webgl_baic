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

    initShader(vshaderText:string,fshaderText:string){
        const vshader =shaderUtil.createShader(this.gl.gl,vshaderText,this.gl.gl.VERTEX_SHADER)
        const fshader =shaderUtil.createShader(this.gl.gl,fshaderText,this.gl.gl.FRAGMENT_SHADER)
        console.log(vshader,fshader)
        const shaderProg = ShaderUtil.createProgram(this.gl.gl,vshader!,fshader!,true);
       if(!shaderProg)return
        this.gl.gl.useProgram(shaderProg)
        const aPositionLoc = this.gl.gl.getAttribLocation(shaderProg,"a_position");
        const uPointSizeLoc = this.gl.gl.getUniformLocation(shaderProg,"uPointSize");
        this.gl.gl.deleteProgram(shaderProg);

        //测试一下
        const aryVertx = new Float32Array([0,0,0]);
        const bufVers = this.gl.gl.createBuffer()

        this.gl.gl.bindBuffer(this.gl.gl.ARRAY_BUFFER,bufVers)
        this.gl.gl.bufferData(this.gl.gl.ARRAY_BUFFER,aryVertx,this.gl.gl.STATIC_DRAW);
        // this.gl.gl.bindBuffer(this.gl.gl.ARRAY_BUFFER,null);

    }
}


export  default  BaseClass