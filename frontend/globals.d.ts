declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
      webkitSpeechRecognition: typeof SpeechRecognition;
    }
  
    interface SpeechRecognitionEvent extends Event {
      results: SpeechRecognitionResultList;
      resultIndex: number;
    }
  
    interface SpeechRecognitionResultList {
      length: number;
      item(index: number): SpeechRecognitionResult;
      [index: number]: SpeechRecognitionResult;
    }
  
    interface SpeechRecognitionResult {
      isFinal: boolean;
      length: number;
      item(index: number): SpeechRecognitionAlternative;
      [index: number]: SpeechRecognitionAlternative;
    }
  
    interface SpeechRecognitionAlternative {
      transcript: string;
      confidence: number;
    }
  
    var SpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  
    interface SpeechRecognition extends EventTarget {
      start(): void;
      stop(): void;
      interimResults: boolean;
      onresult?: (event: SpeechRecognitionEvent) => void;
      onerror?: (event: SpeechRecognitionErrorEvent) => void;
    }
  
    interface SpeechRecognitionErrorEvent extends Event {
      error: SpeechRecognitionErrorCode;
    }
  
    type SpeechRecognitionErrorCode =
      | "aborted"
      | "audio-capture"
      | "network"
      | "not-allowed"
      | "service-not-allowed"
      | "bad-grammar"
      | "language-not-supported";
  }
  
  export {};
  