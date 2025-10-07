import React, { createContext, useContext } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isLoading: false,
    setIsLoading: () => {},
    isReady: false,
    setIsReady: () => {},
    isCompressReady: false,
    setIsCompressReady: () => {},
    setAdsPlaying: () => {},
    adsPlaying: false,
    isClicked: '',
    setIsClicked: () => {},
    countdown: null,
    setCountdown: () => {},
    generateIsReady: false,
    setGenerateIsReady: () => {},
    userId: null,
    setUserId: () => {},
    displayName: '',
    setDisplayName: () => {},
});

export const GenerateContext = createContext({
    prompt: '',
    setPrompt: () => {},  
});

export const useAdsContext = () => useContext(AdsContext);
export const useGenerateContext = () => useContext(GenerateContext);
