import React, { useEffect, useState } from 'react';
import SpeechToText from './SpeechToText';
import sendButton from '../assets/send.svg'
import symbol from '../assets/ai.svg';
import download from '../assets/download.svg';
import clear from '../assets/clear.svg';

type SpeechToTextProps = {
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
};
function VideoGenerator() {

  const [prompt, setPrompt] = useState('');
  const [videoURL, setVideoURL] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log('videoURL has changed', videoURL);
  }, [videoURL]);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    function getCookie(name: string | any[]) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      
      const csrftoken = getCookie('csrftoken');
      

    // Post the prompt to your API and get the ID of the created prompt
    const response = await fetch('http://127.0.0.1:8000/prompt/', {
        method: 'POST',
        mode: 'cors',  
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken ?? undefined
        } as HeadersInit,
        body: JSON.stringify({ text: prompt })

    });
    
    if(!response.ok) {
        console.error('Error creating prompt:', response.statusText);
        setLoading(false);
        return;
    }
    const data = await response.json();

    // Generate the script and video using the returned ID
    console.log(data.id)
    const videoResponse = await fetch(`http://127.0.0.1:8000/prompt/${data.id}/generate_script_and_video/`, {
        method: 'POST',
        mode: 'cors',  
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken ?? undefined
        } as HeadersInit,
        body: JSON.stringify({})
      });
    const videoData = await videoResponse.json();

    if (videoResponse.ok) {
      setVideoURL(videoData.video_url);
      setPrompt('');
    } else {
      console.error('Error generating video:', videoData.detail);
    }
    
    setLoading(false);
  };

  const clearVideo = () => {
    setVideoURL(null); 
  };

  const downloadVideo = () => {
    if (videoURL) {
      const link = document.createElement('a');
      link.href = videoURL;
      link.download = 'video.mp4'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No video URL to download');
    }
  };

  return (
    <div className="z-20 absolute w-full mt-[66.5%] h-[60%]">
      <form onSubmit={handleSubmit} className="w-full flex justify-center items-center mt-[1.5%]">
        <input type="text" value={prompt} onChange={handleInputChange} className="h-16 w-[60%] rounded-full shadow-lg border border-gray-100 placeholder:font-thin placeholder:text-2xl placeholder:ml-10 text-xl font-light text-gray-500 pl-6" placeholder="Ex: Create an animation with a walking integral"/>
          <SpeechToText setPrompt={setPrompt}/>
        <button type="submit" className="absolute ml-[57%]">
            <img src={sendButton} alt="playButton" className="w-[75%] h-[75%]"/>
        </button>
      </form>
        {/*<SpeechToText setPrompt={setPrompt} />*/}
        <div className="flex justify-center items-center w-full h-[78%] mt-[1.9%]">
            <div className="h-full w-[62%] border border-gray-300 rounded-3xl bg-white shadow-lg flex justify-center relative">
                {videoURL &&
                    <div className="h-full w-full absolute z-20">
                        <video className="w-full h-full rounded-3xl" src="https://www.youtube.com/watch?v=cy8r7WSuT1I" controls/>
                        <button onClick={downloadVideo}>
                            <img src={download} alt="downloadVideo" className="w-[10%] h-[10%] absolute -ml-[9%] -mt-[8%]"/>
                        </button>
                        <button onClick={clearVideo}>
                            <img src={clear} alt="clearVideoButton" className="w-[14%] h-[14%] absolute -ml-[11%] -mt-[43.5%]"/>
                        </button>
                    </div>
                }
                <img src={symbol} alt="aiSymbol" className="w-[33%] h-[33%] mt-[10%]"/>
                {loading && prompt ?  <p className="font-thin text-blue-300 text-4xl absolute bottom-[20%]">Generating video please wait...</p>
                    : (
                        <p className="font-thin text-blue-300 text-4xl absolute bottom-[20%]">Please input a prompt command...</p>
                )}
            </div>
        </div>
    </div>
  );
}

export default VideoGenerator;
