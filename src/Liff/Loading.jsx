import { useState, useEffect } from "react";
import axios from "axios";
import { useAdsContext } from "../utils/context";

const Loading = ({ generate, prompt }) => {
    const [ads, setAds] = useState(null);
    const context = useAdsContext();
    const [generated, setGenerated] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchAds = async () => {
        if(context.isClicked === 'Generate'){
            context.setGenerateIsReady(false)
        }
        try {
            const response = await axios.get(`${apiUrl}firebase-files`);
            setAds(response.data);
    
            context.setAdsPlaying(true);
            context.setCountdown(15);

            const newInterval = setInterval(() => {
                context.setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(newInterval);
    
                        if (generate || prompt) {
                            context.setIsReady(true);
                        }
    
                        setGenerated(!generated)
                        context.setAdsPlaying(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            context.setCountInterval(newInterval);
    
        } catch (error) {
            console.error("❌ Error fetching ads:", error);
        }
    };

    useEffect(() => {
        fetchAds();
        
        return () => {
            context.setCountdown(0)
        };
    }, [generated]);
    

    useEffect(() => {
        if(context.countdown === 0 && generate){
            context.setIsReady(true)
        }
    }, [context.countdown, generate])

    useEffect(() => {
        if(context.countdown === 0 && generate && context.isClicked === 'Generate'){
            context.setGenerateIsReady(true)
        }else if(context.countdown === 0 && prompt && context.isClicked === 'Compress'){
            context.setCompressIsReady(true)
        }
    }, [context.countdown, generate, prompt])

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    文章作成中です
                </div>

                <div className="min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden">
                  <img
                      src={LoadingImage}
                      alt="Loading"
                      className="w-full min-h-72 max-h-72"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;