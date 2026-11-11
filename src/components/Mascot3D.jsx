import { useEffect, useRef, useState } from 'react';

const asset = (name) => `${import.meta.env.BASE_URL}mascot/${name}`;

export default function Mascot3D() {
  const container = useRef(null);
  const actions = useRef({});
  const [status, setStatus] = useState('loading');
  const [note, setNote] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    async function start() {
      let renderer;
      try {
        const base = new URL(asset('vendor/'), window.location.href).href;
        const [T, { GLTFLoader }, { OrbitControls }, manifest] = await Promise.all([
          import(/* @vite-ignore */ `${base}three.module.js`),
          import(/* @vite-ignore */ `${base}GLTFLoader.js`),
          import(/* @vite-ignore */ `${base}OrbitControls.js`),
          fetch(asset('model-manifest.json')).then((response) => {
            if (!response.ok) throw new Error('Model details unavailable');
            return response.json();
          }),
        ]);
        if (disposed) return;
        renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(36, 1, .0001, 10);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.minPolarAngle = Math.PI * .20;
        controls.maxPolarAngle = Math.PI * .80;
        controls.maxAzimuthAngle = Math.PI * .65;
        controls.minAzimuthAngle = -Math.PI * .65;
        controls.enableZoom = false;
        scene.add(new T.HemisphereLight(0xffffff, 0x798365, 2));
        const key = new T.DirectionalLight(0xfff2df, 2.7);
        key.position.set(-2, 3, 4);
        scene.add(key);
        const fill = new T.DirectionalLight(0xffffff, 1.4);
        fill.position.set(3, 1, 3);
        scene.add(fill);
        const model = await new GLTFLoader().loadAsync(asset('model.glb'));
        if (disposed) { renderer.dispose(); controls.dispose(); return; }
        scene.add(model.scene);
        const bounds = new T.Box3().setFromObject(model.scene);
        const center = bounds.getCenter(new T.Vector3());
        const size = bounds.getSize(new T.Vector3());
        const reset = () => {
          const aspect = container.current.clientWidth / container.current.clientHeight;
          const distance = Math.max(size.y, size.x / aspect) / (2 * Math.tan(T.MathUtils.degToRad(camera.fov / 2))) * 1.24;
          const framing = manifest.preferredCamera?.position || [0, 0, distance];
          const direction = new T.Vector3(...framing).sub(new T.Vector3(...(manifest.preferredCamera?.target || [0, 0, 0]))).normalize();
          if (!direction.length()) direction.set(0, 0, 1);
          camera.position.copy(center).addScaledVector(direction, distance);
          controls.target.copy(center);
          controls.minDistance = distance * .68;
          controls.maxDistance = distance * 1.6;
          controls.update();
        };
        renderer.domElement.setAttribute('aria-label', 'Interactive ShowDecider thinking cat. Drag to rotate, or use the view buttons.');
        renderer.domElement.setAttribute('role', 'img');
        container.current.append(renderer.domElement);
        let visible = true;
        const resize = new ResizeObserver(() => {
          if (!container.current) return;
          const { clientWidth: width, clientHeight: height } = container.current;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          reset();
        });
        resize.observe(container.current);
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
        observer.observe(container.current);
        reset();
        renderer.setAnimationLoop(() => {
          if (!visible || document.hidden) return;
          controls.update();
          renderer.render(scene, camera);
        });
        const contextLost = (event) => { event.preventDefault(); setStatus('fallback'); };
        renderer.domElement.addEventListener('webglcontextlost', contextLost);
        actions.current = {
          reset,
          zoom: (factor) => {
            const offset = camera.position.clone().sub(controls.target);
            const distance = T.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance);
            camera.position.copy(controls.target).add(offset.setLength(distance));
            controls.update();
          },
          turn: (direction) => {
            const offset = camera.position.clone().sub(controls.target);
            offset.applyAxisAngle(new T.Vector3(0, 1, 0), direction * .3);
            camera.position.copy(controls.target).add(offset);
            controls.update();
          },
        };
        cleanup = () => {
          resize.disconnect(); observer.disconnect(); controls.dispose();
          renderer.setAnimationLoop(null); renderer.dispose();
          model.scene.traverse((object) => {
            object.geometry?.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.filter(Boolean).forEach((material) => { Object.values(material).forEach((value) => { if (value?.isTexture) value.dispose(); }); material.dispose(); });
          });
          renderer.domElement.remove();
        };
        setStatus('ready');
      } catch {
        renderer?.dispose();
        if (!disposed) setStatus('fallback');
      }
    }
    start();
    return () => { disposed = true; cleanup(); actions.current = {}; };
  }, []);

  return (
    <section className="mascot-presentation" aria-labelledby="mascot-heading">
      <div className="mascot-heading"><span className="eyebrow">A LITTLE HELP CHOOSING</span><span className="mascot-tag">YOUR WATCH-NIGHT GUIDE</span></div>
      <div className={`mascot-stage ${status === 'ready' ? 'is-ready' : ''}`}>
        <div className="mascot-halo" aria-hidden="true" />
        {status !== 'ready' && <img className="mascot-fallback" src={asset('preview.png')} alt="ShowDecider cat with glasses and a paw in a thinking pose" />}
        <div className="mascot-canvas" ref={container} hidden={status === 'fallback'} />
        <span className="mascot-bubble" aria-hidden="true">•••</span>
      </div>
      <div className="mascot-caption"><div><h2 id="mascot-heading">Your next pick starts here.</h2><p>Bring your mood. We’ll help narrow the list.</p></div><a className="mascot-finder-link" href="#finder" aria-label="Build your shortlist">↗</a></div>
      <p className="mascot-status" role="status">{status === 'ready' ? 'Drag to explore your guide' : status === 'loading' ? 'Preparing your guide…' : 'Static preview · interactive 3D is unavailable on this device'}</p>
      {status === 'ready' && <div className="mascot-controls" aria-label="3D model controls">
        <button type="button" onClick={() => actions.current.turn?.(-1)} aria-label="Rotate cat left">↶</button>
        <button type="button" onClick={() => actions.current.turn?.(1)} aria-label="Rotate cat right">↷</button>
        <span aria-hidden="true" />
        <button type="button" onClick={() => actions.current.zoom?.(.85)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => actions.current.zoom?.(1.18)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => actions.current.reset?.()}>Reset view</button>
        <button type="button" aria-expanded={note} onClick={() => setNote(!note)}>Meet your guide</button>
      </div>}
      {note && <p className="mascot-about">A friendly face for those “what should we watch?” moments. Start with your mood, genres, time, and services in the shortlist demo.</p>}
    </section>
  );
}
