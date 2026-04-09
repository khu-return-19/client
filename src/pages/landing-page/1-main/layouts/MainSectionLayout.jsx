import { useRef, useEffect } from "react";
import HeroContent from "../components/HeroContent";
import bgBlack from "assets/imgs/main-black.svg";
import bgBlue from "assets/imgs/gradient_3.svg";
import bgMain from "assets/imgs/main.svg";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2 u_mouse;
uniform vec2 u_res;
uniform float u_time;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - u_mouse.y / u_res.y);
  float dist = distance(uv, mouse);

  float pull = exp(-dist * 5.0) * 0.6;
  uv += (mouse - uv) * pull;

  float wave = sin(dist * 20.0 - u_time * 6.0) * 0.02 * exp(-dist * 1.5);
  uv += normalize(uv - mouse) * wave;

  gl_FragColor = texture2D(u_tex, clamp(uv, 0.0, 1.0));
}
`;

function MainSectionLayout() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const w = section.offsetWidth;
    const h = section.offsetHeight;

    if (w < 894) return;

    const glCanvas = document.createElement("canvas");
    glCanvas.width = w;
    glCanvas.height = h;
    glCanvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:1;";
    section.appendChild(glCanvas);

    const gl = glCanvas.getContext("webgl");
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(gl.getUniformLocation(prog, "u_res"), w, h);
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime  = gl.getUniformLocation(prog, "u_time");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]));

    const img = new Image();
    img.onload = () => {
      const oc = document.createElement("canvas");
      oc.width = w;
      oc.height = h;
      oc.getContext("2d").drawImage(img, 0, 0, w, img.height * (w / img.width));
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, oc);
    };
    img.src = bgBlue;

    let mouseX = w / 2;
    let mouseY = h / 2;
    let animId = null;
    let idleTimer = null;
    let isRunning = false;

    const stopLoop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
        isRunning = false;
      }
    };

    const draw = (t) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(draw);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(stopLoop, 1500);
    };

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove);

    gl.viewport(0, 0, w, h);

    return () => {
      stopLoop();
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      section.removeChild(glCanvas);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-full relative overflow-hidden">
      {window.innerWidth < 894 ? (
        <img src={bgMain} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      ) : (
        <img src={bgBlack} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      )}
      <div className="relative w-full h-full flex items-center justify-center z-20">
        <HeroContent />
      </div>
    </section>
  );
}

export default MainSectionLayout;
