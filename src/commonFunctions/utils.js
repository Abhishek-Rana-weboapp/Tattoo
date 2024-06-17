import html2canvas from "html2canvas";

export const captureCursiveSignature = async (id) => {
    // Use html2canvas to capture the cursive signature as an image
    const cursiveSignatureCanvas = await html2canvas(
      document.getElementById(id),
      {
        scale: 3, // Increase the scale for higher resolution
        logging: false, // Disable logging to console
        useCORS: true, // Enable cross-origin resource sharing
        allowTaint: true, // Allow tainting of the canvas (useful if the content includes images from other domains)
        backgroundColor: null, // Set background color to null to capture transparency
      }
    );
    // Convert the canvas to a base64-encoded image
    return cursiveSignatureCanvas.toDataURL();
  };