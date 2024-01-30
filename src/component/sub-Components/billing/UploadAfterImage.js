import React from "react";

export default function UploadAfterImage({
  handleAfterImage,
  handleAfterButton,
  updateAppointment,
  handleAfterVideo,
  handleAfterVideoButton,
  handleBillingSubmit,
  videoUrl,
  afterRef,
  videoRef,
  afterImage,
  uploadedImages
}) {
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <h3>After Image</h3>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
          ref={afterRef}
          multiple
          style={{ display: "none" }} // Hide the input element
          onChange={handleAfterImage}
        />
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handleAfterButton}
        >
          Upload After Image
        </button>
        {/* <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'after_image')} /> */}
        {uploadedImages.after_image && (
          <img src={afterImage} alt="After" className="w-40 h-40" />
        )}

        {updateAppointment?.typeofservice === "tattoo" && (
          <>
            <input
              type="file"
              accept=".mp4, .webm, .ogg" // Specify allowed file types
              ref={videoRef}
              style={{ display: "none" }} // Hide the input element
              onChange={(e) =>
                handleAfterVideo(e.target.files[0], "after_video")
              }
            />
            <button
              className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
              onClick={handleAfterVideoButton}
            >
              Upload Video
            </button>
            {videoUrl && (
              <div className="w-30 h-30">
                <video controls>
                  <source src={videoUrl} type="video/mp4"></source>
                </video>
              </div>
            )}
          </>
        )}
      </div>

      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handleBillingSubmit}
      >
        Calculate
      </button>
    </>
  );
}
