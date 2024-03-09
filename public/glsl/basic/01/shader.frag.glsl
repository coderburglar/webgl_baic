#version 300 es
precision mediump float;
out vec4 finalColor;
uniform vec2 iResolution;

void main() {
    vec2 uv = gl_PointCoord.xy / iResolution;
    // Calculate color based on uv coordinates
    vec3 color = vec3(0.0, uv.y, 1.0);
    // Output to screen
    finalColor = vec4(color, 1.0);
}
