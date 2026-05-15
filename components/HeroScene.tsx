'use client'

import { useEffect, useRef, useState } from 'react'

interface SceneState {
  activated: boolean
  activeModuleId: string | null
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<SceneState>({
    activated: false,
    activeModuleId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    // Load Three.js from CDN
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/three@0.164.1/build/three.min.js'
    script.async = true

    script.onload = () => {
      const THREE = (window as any).THREE
      if (!THREE) return

      // Initialize scene
      const canvas = canvasRef.current!
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        42,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        40
      )
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })

      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.08
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)

      // Lighting
      const ambientLight = new THREE.AmbientLight('#ffffff', 1.3)
      const keyLight = new THREE.DirectionalLight('#fff8ff', 1.9)
      const fillLight = new THREE.DirectionalLight('#d2bcff', 0.46)
      keyLight.position.set(-5, 4, 5)
      fillLight.position.set(5, -4, 3)
      scene.add(ambientLight, keyLight, fillLight)

      // Core orb
      const orbGroup = new THREE.Group()
      const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: '#eadcff',
        emissive: '#af84ff',
        emissiveIntensity: 0.22,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.88,
        thickness: 0.95,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        ior: 1.1,
        transparent: true,
        opacity: 0.96,
      })

      const coreMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.34, 4),
        orbMaterial
      )
      orbGroup.add(coreMesh)

      const coreGlow = new THREE.Mesh(
        new THREE.SphereGeometry(0.78, 42, 42),
        new THREE.MeshBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.26,
        })
      )
      orbGroup.add(coreGlow)

      // Rings
      const ringOne = new THREE.Mesh(
        new THREE.TorusGeometry(1.46, 0.024, 18, 120),
        new THREE.MeshBasicMaterial({
          color: '#efe4ff',
          transparent: true,
          opacity: 0.44,
        })
      )
      const ringTwo = new THREE.Mesh(
        new THREE.TorusGeometry(1.18, 0.018, 14, 96),
        new THREE.MeshBasicMaterial({
          color: '#a578ff',
          transparent: true,
          opacity: 0.28,
        })
      )
      ringTwo.rotation.x = Math.PI / 2.35
      orbGroup.add(ringOne, ringTwo)

      const orbLight = new THREE.PointLight('#bd8cff', 11, 18)
      orbGroup.add(orbLight)
      scene.add(orbGroup)

      // Animation loop
      const clock = new THREE.Clock()
      const animate = () => {
        const delta = Math.min(clock.getDelta(), 0.05)
        const elapsed = clock.elapsedTime

        // Animate orb
        orbGroup.rotation.y += delta * 0.26
        orbGroup.position.y = Math.sin(elapsed * 0.85) * 0.14

        ringOne.rotation.x += delta * 0.24
        ringOne.rotation.y += delta * 0.38
        ringTwo.rotation.x -= delta * 0.18
        ringTwo.rotation.z += delta * 0.26

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Handle window resize
      const handleResize = () => {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }

      window.addEventListener('resize', handleResize)

      // Handle activation click
      const handleCanvasClick = () => {
        setState((prev) => ({ ...prev, activated: true }))
        orbMaterial.emissiveIntensity = 0.42
        orbLight.intensity = 16
      }

      canvas.addEventListener('click', handleCanvasClick)

      // Respond to the "Activate orenva" button (dispatched by
      // HomeInteractions) by intensifying the core orb.
      const handleActivate = () => {
        setState((prev) => ({ ...prev, activated: true }))
        orbMaterial.emissiveIntensity = 0.42
        orbLight.intensity = 16
      }
      window.addEventListener('orenva:activate', handleActivate)

      return () => {
        window.removeEventListener('resize', handleResize)
        canvas.removeEventListener('click', handleCanvasClick)
        window.removeEventListener('orenva:activate', handleActivate)
      }
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="scene-shell" aria-hidden="true">
      <canvas ref={canvasRef} id="sceneCanvas" />
      <div className="scene-aura scene-aura-one" />
      <div className="scene-aura scene-aura-two" />
      <div className="scene-pulse" id="scenePulse" />
    </div>
  )
}
