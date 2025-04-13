// types/webgazer.d.ts
declare module 'webgazer' {
    interface GazeData {
      x: number;
      y: number;
      width?: number;
      height?: number;
    }
  
    interface WebGazer {
      setGazeListener: (listener: (data: GazeData | null) => void) => WebGazer;
      begin: () => Promise<any>;
      end: () => void;
      clearData: () => void;
      showVideo: (show: boolean) => void;
      showPredictionPoints: (show: boolean) => void;
      showFaceOverlay: (show: boolean) => void;
      showFaceFeedbackBox: (show: boolean) => void;
      recordScreenPosition: (x: number, y: number, width: number, height: number) => void;
      applyKalmanFilter: (apply: boolean) => WebGazer;
      setTracker: (name: string) => WebGazer;
      addRegression: (name: string) => WebGazer;
      setRegression: (name: string) => WebGazer;
      pause: () => WebGazer;
      resume: () => WebGazer;
    }
  
    const webgazer: WebGazer;
    export default webgazer;
  }