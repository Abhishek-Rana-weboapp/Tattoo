import React, { useRef, useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const ImageWriterGenerator = ({ setImageBlob, imageBlob, setSignatureRef }) => {
  const signatureRef = useRef(null)
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 150 })

  // Update canvas size based on screen size
  useEffect(() => {
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth
      const width = Math.min(screenWidth * 0.8, 400)
      const height = Math.min(screenWidth * 0.3, 150)
      setCanvasSize({ width, height })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setImageBlob(null)
    }
  }

  const handleSave = () => {
    if (signatureRef.current) {
      signatureRef.current.toBlob((blob) => {
        setImageBlob(blob)
      })
    }
  }

  // Check if signature is empty
  const isSignatureEmpty = () => {
    if (signatureRef.current) {
      return signatureRef.current.isEmpty()
    }
    return true
  }

  // Expose methods to parent component
  useEffect(() => {
    if (signatureRef.current) {
      // Add methods to the ref for parent access
      signatureRef.current.isSignatureEmpty = isSignatureEmpty
      signatureRef.current.handleSave = handleSave
    }
    // Pass the ref to parent component
    if (setSignatureRef) {
      setSignatureRef(signatureRef.current)
    }
  }, [setSignatureRef])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="text-center text-sm text-gray-600 mb-2">
        Draw your signature in the box below
      </div>
      <div className="border-2 border-gray-300 rounded-lg bg-white w-full max-w-md mx-auto">
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          velocityFilterWeight={0.5}
          minWidth={1}
          maxWidth={3}
          canvasProps={{
            width: canvasSize.width,
            height: canvasSize.height,
            className: "sigCanvas w-full touch-none",
            style: {
              border: "1px solid #000",
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              touchAction: "none",
            },
          }}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex-1 sm:flex-none"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none ${
            imageBlob 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          onClick={handleSave}
        >
          {imageBlob ? 'Signature Saved ✓' : 'Save Signature'}
        </button>
      </div>
      {imageBlob && (
        <div className="text-green-600 text-sm font-medium text-center">
          Signature ready for adoption
        </div>
      )}
    </div>
  )
}

export default ImageWriterGenerator
