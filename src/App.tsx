import { Canvas } from '@react-three/fiber'
import { ARButton, XR, Controllers } from '@react-three/xr'
import Scene from './components/Scene'
import ARScene from './components/ARScene'
import ErrorBoundary from './components/ErrorBoundary'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'

function App() {
  const [isAR, setIsAR] = useState(false)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    // Check if URL has AR parameter
    const params = new URLSearchParams(window.location.search)
    if (params.get('ar') === 'true') {
      setIsAR(true)
    }
  }, [])

  const currentURL = window.location.href.split('?')[0]
  const arExperienceURL = `${currentURL}?ar=true`

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ErrorBoundary>
        {showQR && (
          <div className="qr-overlay" onClick={() => setShowQR(false)}>
            <div className="qr-container">
              <QRCode
                value={arExperienceURL}
                size={256}
                level="H"
                className="qr-image"
                includeMargin={true}
                style={{ width: 'min(500px, 80vw)', height: 'min(500px, 80vw)' }}
              />
              <p className="qr-text">Scan to open AR experience</p>
              <p className="qr-close">Tap anywhere to close</p>
            </div>
          </div>
        )}
        {!isAR && (
          <div className="button-container">
            <button
              onClick={() => setIsAR(true)}
              className="view-button"
            >
              View in AR
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="qr-button"
            >
              Scan QR Code
            </button>
          </div>
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
