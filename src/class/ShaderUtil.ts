class ShaderUtil {
    /**
     * @description 创建shader 绑定shader 编译shader
     * @param {WebGL2RenderingContext} gl - webgl上下文
     * @param {string} src - shader文本
     * @param {WebGLRenderingContextBase.VERTEX_SHADER | WebGLRenderingContextBase.FRAGMENT_SHADER} type -shader的类型
     * @return {WebGLShader} -返回shader
     * **/
    static  createShader(gl:WebGL2RenderingContext,src,type:any){
        //创建一片区域
        const shader = gl.createShader(type)
        //把数据扔在区域里面
        gl.shaderSource(shader,src)
        //编译shader
        gl.compileShader(shader)

        console.log("shader",shader)
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
            console.error("编译失败")
            gl.deleteShader(shader)
            return null
        }
        return  shader
    }

    static createProgram(gl:WebGL2RenderingContext,vShader:WebGLShader,fshader:WebGLShader,doValidote){
        const prog = gl.createProgram();
        gl.attachShader(prog,vShader);
        gl.attachShader(prog,fshader);
        gl.linkProgram(prog)

        if(doValidote){
            gl.validateProgram(prog)
            if(!gl.getProgramParameter(prog,gl.VALIDATE_STATUS)){
                gl.deleteProgram(prog)
                return null
            }
        }
        gl.detachShader(prog,vShader)
        gl.detachShader(prog,fshader)
        gl.deleteShader(vShader)
        gl.deleteShader(fshader)
        return  prog

    }
}


export  default  ShaderUtil