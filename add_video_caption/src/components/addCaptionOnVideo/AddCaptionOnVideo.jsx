import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./addCaptionOnVideo.scss";

const AddCaptionOnVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState("");

  const handleAddCaption = () => {
    if (currentCaption && currentTimestamp) {
      setCaptions([
        ...captions,
        { text: currentCaption, timestamp: parseFloat(currentTimestamp) },
      ]);
      setCurrentCaption("");
      setCurrentTimestamp("");
    }
  };

  const getCurrentCaption = (currentTime) => {
    const caption = captions.find(
      (caption) =>
        caption.timestamp <= currentTime &&
        currentTime < caption.timestamp + 5
    );
    return caption ? caption.text : "";
  };

  return (
    <div className="video-caption-tool">
      <h1 className="title">Video Caption Tool</h1>

      <div className="form-group">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Enter caption text"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)}
          rows="3"
          className="textarea-field"
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Enter timestamp (seconds)"
          value={currentTimestamp}
          onChange={(e) => setCurrentTimestamp(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddCaption} className="add-caption-btn">
          Add Caption
        </button>
      </div>

      {videoUrl && (
        <div className="video-container">
          <ReactPlayer
            url={videoUrl}
            controls
            onProgress={({ playedSeconds }) => {
              const caption = getCurrentCaption(playedSeconds);
              document.getElementById("caption-overlay").innerText = caption;
            }}
            width="100%"
            height="350px"
          />
          <div id="caption-overlay" className="caption-overlay"></div>
        </div>
      )}
    </div>
  );
};

export default AddCaptionOnVideo;
