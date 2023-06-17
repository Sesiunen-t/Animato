import React, { useState } from 'react';

function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } else {
      console.error('Error generating video:', videoData.detail);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleInputChange} />
        <button type="submit" disabled={loading}>Generate Video</button>
      </form>
      {loading && <p>Loading...</p>}
      {videoURL && <video src={videoURL} controls />}
    </div>
  );
}

export default VideoGenerator;
