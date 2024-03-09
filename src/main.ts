import GlInstance from "./index";
import { fetchData, fetchDataText } from "./utils";
import RenderLoop from "./class/RenderLoop";

async function main() {
    let glInstance = new GlInstance()
    glInstance.setSize(window.innerWidth, window.innerHeight)
    glInstance.clear()

    //读取shader
    const vertexShader = await fetchDataText(fetchData(import.meta.env.BASE_URL + 'glsl/basic/01/shader.vert.glsl'));
    const fragShader = await fetchDataText(fetchData(import.meta.env.BASE_URL + 'glsl/basic/01/shader.frag.glsl'));
    let size = 10;
    glInstance.initShader(vertexShader, fragShader,size);
    // glInstance.draw()
    // glInstance.renderLoop.start()
    function  onRender(){
        glInstance.clear()
        glInstance.draw()
        size++
        glInstance.setUniform1f(glInstance.u_point_size,size)
    }
    const renderLoop = new RenderLoop(onRender.bind(glInstance),60).start()
}

window.addEventListener('load', async () => {
    await main()
})