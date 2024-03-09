#version 300 es
in vec3 a_position;
uniform float uPointSize;
out vec3 size;
void main() {
    gl_Position = vec4(a_position, 1.0);
    gl_PointSize = uPointSize;
    size = vec3(0.0,1.0,0.0);
}