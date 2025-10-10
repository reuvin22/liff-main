import { useEffect } from "react";
import { useAdsContext } from "../utils/context";
import LoadingImage from "../assets/loading.png";

const Loading = ({ generate, prompt }) => {
  const context = useAdsContext();

  const isLoading = generate === "" && prompt === "";

  useEffect(() => {
    if (generate !== "") {
      context.setGenerateIsReady(true);
    }

    if (prompt !== "") {
      context.setIsCompressReady(true);
    }

    // Only set loading if both are not ready
    context.setIsLoading(isLoading);
  }, [generate, prompt]);

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
          文章作成中です
        </div>

        <div className="min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden">
          {isLoading ? (
            <img
              src={LoadingImage}
              alt="Loading"
              className="w-full min-h-72 max-h-72"
            />
          ) : (
            <p>お待ちください...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;
