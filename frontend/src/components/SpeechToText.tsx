import React, { useEffect, useRef } from 'react';
import mic from "../assets/mic.svg";

type SpeechToTextProps = {
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

const SpeechToText: React.FC<SpeechToTextProps> = ({ setPrompt }) => {
    const recognition = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        window.SpeechRecognition =
            window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition.current = new window.SpeechRecognition();
        recognition.current.interimResults = true;

        recognition.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            // This line will update the prompt for every word spoken
            setPrompt(transcript);
        };

        recognition.current.onerror = (event) => {
            console.error('Error occurred in recognition: ' + event.error);
        }
    }, [setPrompt]);

    const handleSpeech = () => {
        if (recognition.current) {
            recognition.current.start();
        }
    };

    return (
        <button onClick={handleSpeech}>
            <img src={mic} alt="microphoneIcon" className="w-12 h-12 absolute -ml-[64%] -mt-[1.4%]"/>
        </button>
    );
};

export default SpeechToText;
