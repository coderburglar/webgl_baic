import CoderGLClass from "./CoderGLClass";

class BaseClass{
    canvas:HTMLCanvasElement
    gl:CoderGLClass
    constructor(canvasID:string = 'glCanvas') {
        const canvas = this.awakeCanvas()
        this.checkCurrentCanvas(canvas)
        this.gl = new CoderGLClass(this.canvas)
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
}


export  default  BaseClass