import { useRef, useState, useEffect } from "react";

const ImageGenerator = ({ text , setImageBlob, imageBlob}) => {
  const canvasRef = useRef(null);
  // const [imageBlob, setImageBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const font = new FontFace("Blacksword", "url('/fonts/Blacksword.otf')");
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      console.log("Font loaded");
      generateImageFromText(text || "AM");
    });
  }, [text]);

  const generateImageFromText = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const fontSize = 48;
    const padding = 10; // reduced padding
    const font = `${fontSize}px 'Blacksword'`;

    ctx.font = font;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#000";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.8;
    const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2;

    const textHeight = ascent + descent;

    canvas.width = Math.ceil(textWidth + padding * 4);
    canvas.height = Math.ceil(textHeight + padding * 2);

    ctx.font = font;
    ctx.textBaseline = "alphabetic";
    ctx.clearRect(0, 0, canvas.width, canvas.height); // transparent background

    // Optional: Uncomment the next line if you want a white background
    // ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.fillText(text, padding, padding + ascent);

    canvas.toBlob((blob) => {
      if (blob) {
        setImageBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      }
    }, "image/png");
  };

  return (
    <div className="text-center mt-4">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Generated Preview"
          className="mx-auto object-contain border shadow max-w-[250px]"
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImageGenerator;
