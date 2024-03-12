enum ShaderType {
    NONE = 0,VERTEX=1,FRAGMENT =2
}
interface ShaderProgramSource{
    VertexShader:string,
    FragmentShader:string
}

class ShaderUtil {
    /**
     * @description 创建shader 绑定shader 编译shader
     * @param {WebGL2RenderingContext} gl - webgl上下文
     * @param {string} src - shader文本
     * @param {WebGLRenderingContextBase.VERTEX_SHADER | WebGLRenderingContextBase.FRAGMENT_SHADER} type -shader的类型
     * @return {WebGLShader} -返回shader
     * **/
    static createShader(gl: WebGL2RenderingContext, src, type: any) {
        //创建一片区域
        const shader = gl.createShader(type)
        if (!shader) return
        //把数据扔在区域里面
        gl.shaderSource(shader, src)
        //编译shader
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("编译失败", gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)
            return null
        }
        return shader
    }

    static createProgram(gl: WebGL2RenderingContext, vShader: WebGLShader, fshader: WebGLShader, doValidote: any) {
        const prog = gl.createProgram() as WebGLProgram;
        gl.attachShader(prog, vShader);
        gl.attachShader(prog, fshader);
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("链接失败", gl.getProgramInfoLog(prog))
            gl.deleteProgram(prog)
            return null
        }
        if (doValidote) {
            gl.validateProgram(prog)

            if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
                console.error("验证失败", gl.getProgramInfoLog(prog));

                gl.deleteProgram(prog)
                return null
            }
        }
        // cherno 在 opengl 课程提到不建议删除源码,因为会无法调试,并且这个地方很小.
        // gl.detachShader(prog, vShader)
        // gl.detachShader(prog, fshader)
        gl.deleteShader(vShader)
        gl.deleteShader(fshader)
        return prog
    }

    async  parseShader(filePath) {
        const ss = await fetch(filePath)
            .then(res => res.text())
            .then(res => {
                const lines = res.split('\n');
                let shaderSource = {
                    [ShaderType.VERTEX]: '',
                    [ShaderType.FRAGMENT]: ''
                };
                let type = ShaderType.NONE;
                while (lines.length) {
                    const line = lines.shift();
                    if (line.includes("#shader")) {
                        if (line.includes("vertex"))
                            type = ShaderType.VERTEX;
                        else if (line.includes("fragment"))
                            type = ShaderType.FRAGMENT;
                    } else {
                        shaderSource[type] += line + '\n';
                    }
                }
                return {
                    VertexShader: shaderSource[ShaderType.VERTEX],
                    FragmentShader: shaderSource[ShaderType.FRAGMENT]
                };
            });
        return ss;
    }

}


export default ShaderUtil