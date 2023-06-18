import React from 'react';
import VideoGenerator from '../components/VideoGenerator';
import flowerUp from '../assets/flowerUp.svg';
import flowerDown from '../assets/flowerDown.svg';
import bigWeb from '../assets/bigWeb.svg';
import smallWeb from  '../assets/smallWeb.svg';
import animato from '../assets/animato.svg';

const HomePage: React.FC = () => {

  return (
    <div className="home-page w-full">
        <img src={flowerUp} alt="flowerUp" className='z-10 absolute top-0 left-0 h-[55%] w-[55%] -mx-[19%]'/>
        <img src={flowerDown} alt="flowerDown" className= 'z-10 absolute h-[60%] w-[55%] -mx-[20%] bottom-0 right-[20%]'/>
        <img src={bigWeb} alt="spiderWeb" className="absolute bottom-0 right-0"/>
        <img src={smallWeb} alt="spiderWeb" className="absolute bottom-0 right-0 h-[70%] w-[70%]"/>
        <div className="w-full h-full flex justify-center items-center bg-red-500">
            <img src={animato} alt="animato" className="w-[45%] h-[45%] absolute mt-[22%]"/>
            <VideoGenerator />
        </div>
    </div>
  );
};

export default HomePage;