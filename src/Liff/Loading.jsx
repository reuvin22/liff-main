import { useState, useEffect } from "react";
import { useAdsContext } from "../utils/context";
import LoadingImage from "../assets/loading.png";

const Loading = ({ generate }) => {
  const context = useAdsContext();
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    context.setAdsPlaying(true);
    context.setCountdown(15);

    const id = setInterval(() => {
      context.setCountdown(prev => Math.max(prev - 1, 0));
    }, 1000);

    context.setCountInterval(id);

    return () => {
      clearInterval(id);
      context.setAdsPlaying(false);
    };
  }, []);

  // When countdown finishes
  useEffect(() => {
    if (context.countdown !== 0) return;

    setGenerated(true);

    if (generate) context.setIsReady(true);
    if (context.isClicked === "Generate") context.setGenerateIsReady(true);
    if (context.isClicked === "Compress") context.setCompressIsReady(true);

    context.setAdsPlaying(false);
  }, [context.countdown]);

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