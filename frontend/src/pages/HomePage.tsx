import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

const HomePage: React.FC = () => {
  const videoSrcURL = "https://www.example.com/video.mp4"; // this should be fetched from your API

  return (
    <div className="home-page">
      <h1 className="text-3xl font-bold mb-4">Zhvr yn gvtnav!</h1>
      <VideoPlayer videoSrcURL={videoSrcURL} />
    </div>
  );
};

export default HomePage;