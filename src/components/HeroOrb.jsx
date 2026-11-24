import { Component, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const R = 1.7

/* Evenly spaced points on a sphere (Fibonacci lattice) */
function fibonacciSphere(n, r) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = golden * i
    pts.push(new THREE.Vector3(Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r))
  }
  return pts
}

/* Seeded random so the arcs look the same on every load */
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

const ARC_SEG = 64

function NetworkGlobe({ reduce }) {
  const group = useRef()
  const tilt = useRef({ x: 0, y: 0 })

  const { dots, arcs } = useMemo(() => {
    const pts = fibonacciSphere(2600, R)
    const pos = new Float32Array(pts.length * 3)
    const col = new Float32Array(pts.length * 3)
    const blue = new THREE.Color('#3b82f6'), cyan = new THREE.Color('#22d3ee'), c = new THREE.Color()
    pts.forEach((p, i) => {
      p.toArray(pos, i * 3)
      c.copy(blue).lerp(cyan, (p.x / R + 1) / 2).lerp(new THREE.Color('#ffffff'), 0.45)
      c.toArray(col, i * 3)
    })
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    dotGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    // data arcs between random points
    const rand = rng(7)
    const arcs = []
    for (let k = 0; k < 14; k++) {
      const a = pts[Math.floor(rand() * pts.length)]
      const b = pts[Math.floor(rand() * pts.length)]
      const d = a.distanceTo(b)
      if (d < 0.9) { k--; continue }
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + d * 0.32)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(ARC_SEG))
      const base = new THREE.Line(g, new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.4 }))
      const pulse = new THREE.Line(
        g.clone(),
        new THREE.LineBasicMaterial({ color: '#7dd3fc', transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })
      )
      arcs.push({ base, pulse, speed: 0.25 + rand() * 0.35, offset: rand() })
    }
    return { dots: dotGeo, arcs }
  }, [])

  const atmosphere = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color('#3b82f6') } },
        vertexShader: `varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
          void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 3.0); gl_FragColor = vec4(uColor, f * 0.9); }`,
      }),
    []
  )

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      if (!reduce) group.current.rotation.y += dt * 0.08
      tilt.current.x += (state.pointer.y * 0.1 - tilt.current.x) * 0.04
      tilt.current.y += (state.pointer.x * 0.25 - tilt.current.y) * 0.04
      group.current.rotation.x = 0.35 + tilt.current.x
      group.current.position.x = tilt.current.y * 0.3
    }
    // travelling pulse along each arc
    arcs.forEach(({ pulse: line, speed, offset }) => {
      const p = reduce ? 0.5 : ((t * speed + offset) % 1.4) / 1.4
      const len = 16
      const start = Math.floor(p * (ARC_SEG + len)) - len
      line.geometry.setDrawRange(Math.max(0, start), Math.max(0, Math.min(len, start + len)))
    })
  })

  return (
    <group position={[0, -0.95, 0]}>
      <group ref={group}>
        {/* dark core hides the back half of the dots */}
        <mesh>
          <sphereGeometry args={[R * 0.985, 64, 64]} />
          <meshBasicMaterial color="#05080f" />
        </mesh>
        <points geometry={dots}>
          <pointsMaterial size={0.032} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} />
        </points>
        {arcs.map(({ base, pulse }, i) => (
          <group key={i}>
            <primitive object={base} />
            <primitive object={pulse} />
          </group>
        ))}
      </group>
      {/* soft blue rim glow */}
      <mesh material={atmosphere}>
        <sphereGeometry args={[R * 1.06, 64, 64]} />
      </mesh>
    </group>
  )
}

class Safe extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HeroOrb({ reduce }) {
  return (
    <Safe>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduce ? 'demand' : 'always'}
      >
        <NetworkGlobe reduce={reduce} />
      </Canvas>
    </Safe>
  )
}
