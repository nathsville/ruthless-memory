import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { Edition } from "../data";
import { DiscFace } from "./DiscFace";

function labelTexture(edition: Edition) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const c = canvas.getContext("2d")!;
  c.fillStyle = edition.color;
  c.fillRect(0, 0, 1024, 1024);
  c.strokeStyle = edition.ink;
  c.lineWidth = 2;
  c.beginPath();
  c.arc(512, 512, 477, 0, Math.PI * 2);
  c.stroke();
  c.fillStyle = edition.ink;
  c.textAlign = "center";
  c.font = "112px Anton";
  c.fillText("RUTHLESS", 512, 317);
  c.font = '32px "DM Sans"';
  c.fillText(edition.type + "  /  " + edition.capacity, 512, 380);
  const words = edition.name.split(" ");
  c.font = "100px Anton";
  c.fillText(words[0], 512, words.length > 1 ? 680 : 710);
  if (words.length > 1) c.fillText(words.slice(1).join(" "), 512, 790);
  c.font = '22px "DM Sans"';
  c.fillText("MAKE IT LAST. PLAY IT LOUD.", 512, 890);
  const text = "INDEPENDENT MEMORIES  ★  YOURS TO KEEP  ★  ";
  c.font = '20px "DM Sans"';
  [...text].forEach((letter, i) => {
    const a = -Math.PI * 0.9 + (i / text.length) * Math.PI * 1.8;
    c.save();
    c.translate(512 + Math.sin(a) * 438, 512 - Math.cos(a) * 438);
    c.rotate(a);
    c.fillText(letter, 0, 0);
    c.restore();
  });
  c.beginPath();
  c.arc(512, 512, 102, 0, Math.PI * 2);
  c.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function Disc3D({
  edition,
  className = "",
  interactive = true,
}: {
  edition: Edition;
  className?: string;
  interactive?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    let disposed = false,
      frame = 0,
      visible = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.z = 9.3;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const group = new THREE.Group();
    scene.add(group);
    const silver = new THREE.MeshPhysicalMaterial({
      color: "#e4d7e9",
      metalness: 1,
      roughness: 0.19,
      iridescence: 1,
      iridescenceIOR: 1.45,
      iridescenceThicknessRange: [120, 530],
      side: THREE.DoubleSide,
    });
    const hologram = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      side: THREE.DoubleSide,
      vertexShader:
        "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader:
        "varying vec2 vUv;uniform float uTime;void main(){vec2 p=vUv-.5;float a=atan(p.y,p.x);float r=length(p);vec3 spectrum=.55+.45*cos(6.283185*(a*.48+vec3(0.,.33,.67)+uTime*.018));float light=pow(abs(sin(a*2.+uTime*.12)),12.);float grooves=.035*sin(r*2400.);vec3 col=mix(vec3(.72,.76,.82),spectrum,.52)+light*.38+grooves;gl_FragColor=vec4(col,1.);}",
    });
    const disk = new THREE.Mesh(new THREE.RingGeometry(0.19, 2, 160), hologram);
    group.add(disk);
    const texture = labelTexture(edition);
    const front = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 1.86, 160),
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        toneMapped: false,
      }),
    );
    front.position.z = 0.025;
    group.add(front);
    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 0.045, 160, 1, true),
      silver,
    );
    rim.rotation.x = Math.PI / 2;
    group.add(rim);
    const hub = new THREE.Mesh(
      new THREE.RingGeometry(0.19, 0.39, 100),
      new THREE.MeshPhysicalMaterial({
        color: "#e7d4e8",
        metalness: 0.7,
        roughness: 0.12,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    );
    hub.position.z = 0.035;
    group.add(hub);
    const light = new THREE.DirectionalLight("#ffffff", 4);
    light.position.set(-3, 4, 6);
    scene.add(light);
    const pink = new THREE.PointLight("#ff63ca", 30);
    pink.position.set(4, -2, 3);
    scene.add(pink);
    let px = 0,
      py = 0;
    let spin = -0.12;
    let last = performance.now();
    group.rotation.set(0.15, -0.36, -0.13);
    const resize = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      renderer.setSize(r.width, r.height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(el);
    const move = (e: PointerEvent) => {
      if (!interactive) return;
      const r = el.getBoundingClientRect();
      px = THREE.MathUtils.clamp(
        (e.clientX - r.left - r.width / 2) / (r.width / 2),
        -1,
        1,
      );
      py = THREE.MathUtils.clamp(
        (e.clientY - r.top - r.height / 2) / (r.height / 2),
        -1,
        1,
      );
    };
    const leave = () => {
      px = py = 0;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    function draw(now: number) {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (!reduced.matches) {
        spin += dt * 0.075;
        hologram.uniforms.uTime.value = now / 1000;
        group.rotation.z = spin + Math.sin(now * 0.00065) * 0.07;
        group.rotation.x = THREE.MathUtils.lerp(
          group.rotation.x,
          0.12 + py * 0.3,
          0.055,
        );
        group.rotation.y = THREE.MathUtils.lerp(
          group.rotation.y,
          -0.3 + px * 0.48 + Math.sin(now * 0.0005) * 0.14,
          0.055,
        );
        group.position.y = Math.sin(now * 0.0012) * 0.055;
      }
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(draw);
    setReady(true);
    void document.fonts.ready.then(() => {
      if (disposed) return;
      const next = labelTexture(edition);
      const mat = front.material as THREE.MeshBasicMaterial;
      mat.map?.dispose();
      mat.map = next;
      mat.needsUpdate = true;
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((mat) => {
            if ("map" in mat && mat.map instanceof THREE.Texture)
              mat.map.dispose();
            mat.dispose();
          });
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [edition, interactive]);
  return (
    <div
      ref={host}
      className={`disc-3d ${className}`}
      role="img"
      aria-label={`Reflective RUTHLESS ${edition.name} ${edition.type} disc`}
    >
      <div className={`disc-fallback ${ready ? "is-ready" : ""}`}>
        <DiscFace edition={edition} />
      </div>
    </div>
  );
}
