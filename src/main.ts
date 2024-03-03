import GlInstance from "./index";

function  main(){
    let glInstance = new GlInstance()
    glInstance.setSize(window.innerWidth,window.innerHeight)
    glInstance.clear()
}

window.addEventListener('load',()=>{
    console.log(1)
    main()
})