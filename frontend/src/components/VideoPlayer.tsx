import React from 'react';

interface VideoPlayerProps {
  videoSrcURL: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrcURL }) => (
  <div className="video">
    <iframe
      src={videoSrcURL}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default VideoPlayer;