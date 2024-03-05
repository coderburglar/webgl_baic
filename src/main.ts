import GlInstance from "./index";
import {fetchData, fetchDataText} from "./utils";

async function  main(){
    let glInstance = new GlInstance()
    glInstance.setSize(window.innerWidth,window.innerHeight)
    glInstance.clear()

    //读取shader
    const vertexShader = await fetchDataText(fetchData(import.meta.env.BASE_URL + 'glsl/basic/01/shader.vert.glsl'));
    const fragShader =await fetchDataText(fetchData(import.meta.env.BASE_URL + 'glsl/basic/01/shader.frag.glsl'));

    console.log(vertexShader,fragShader)

    glInstance.initShader(vertexShader,fragShader);
}

window.addEventListener('load',async ()=>{
    await main()
})