import { Canvas } from '@react-three/fiber'
import { ARButton, XR, Controllers } from '@react-three/xr'
import Scene from './components/Scene'
import ARScene from './components/ARScene'
import ErrorBoundary from './components/ErrorBoundary'
import { useState } from 'react'

function App() {
  const [isAR, setIsAR] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ErrorBoundary>
        {!isAR && (
          <button
            onClick={() => setIsAR(true)}
            className="view-button"
          >
            View in AR
          </button>
        )}
        
        {isAR ? (
          <>
           <ARButton 
  className="ar-button"
    sessionInit={{
    requiredFeatures: ['hit-test', 'local-floor'],
    domOverlay: { root: document.body }
  }}
/>

            <Canvas>
              <XR referenceSpace="local-floor">
                <Controllers />
                <ARScene />
              </XR>
            </Canvas>
            <button
              onClick={() => setIsAR(false)}
              className="close-button"
            >
              Exit AR
            </button>
          </>
        ) : (
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
            <Scene isAR={false} />
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default App
