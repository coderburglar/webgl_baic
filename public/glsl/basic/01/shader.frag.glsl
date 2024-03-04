#version 300 es 
//颜色计算 rgb 只计算 rgb的情况下 vec3(r1,g1,b1) + vec3(r2,g2,b2)  => vec3(r1 + r2,g1 + g2 , b1 + b2)  减乘除一样
/**
 黑色 * 其他色 = 黑色
 白色 * 其他色 = 其他色
**/
/**
    坐标系 
    流程
    局部坐标系 => 世界坐标系=>相机坐标系=>裁剪坐标系=>规范化设备坐标系=>屏幕坐标系
    gl_Position (世界坐标系中的概念)
    gl_FragCoord(片元着色器的的一个坐标) =>canvas画布形式
    gl_PointCoord(点的)
**/
// #ifdef GL_ES
// precision mediump float;
// #endif
// void main(){ 
//     vec2 p = gl_FragCoord.xy / vec2(1024,1024);
//     // gl_FragColor = vec4(gl_PointCoord.xy,0.0,1.0);
//     gl_FragColor =vec4(p.xy,0.0,1.0);
// }

precision mediump float;

out vec4 finalColor;

void main(){
    finalColor = vec4(0.0,0.0,0.0,1.0);
}