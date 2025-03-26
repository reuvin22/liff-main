import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
import Compress from './Compress';
import Home from './Home';
import LoadingError from './LoadingError';
import { useAdsContext, useGenerateContext } from '../utils/context';
function Generate({prompt, userId}) {
    const [copyStatus, setCopyStatus] = useState("");
    const [generate, setGenerate] = useState("");
    const [generatePage, setIsGeneratePage] = useState(false);
    const [isCompress, setIsCompress] = useState(false);
    const [main, setMain] = useState(true);
    const [error, setError] = useState(false);
    const [compressData, setCompressData] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [home, setHome] = useState(false)
    const [copy, setCopy] = useState(false)
    const context = useAdsContext()
    const generateContext = useGenerateContext()
    const [shouldRenderCompress, setShouldRenderCompress] = useState(false)
    const [stopLoading, setStopLoading] = useState(false)
    const [isWeb, setIsWeb] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        if(!prompt){
            handleGenerate()
        }else{
            context.setIsLoading(false)
        }
    }, [])
    
    useEffect(() => {
        const platform = async() => {
            try {
                await import('https://static.line-scdn.net/liff/edge/2.1/sdk.js');
                
                const liff = window.liff;
                if (liff) {
                    await liff.init({ 
                        liffId: "2006819941-jWGNQ53X" 
                    });
    
                    const os = liff.getOS();
                    console.log("Detected by LIFF:", os);
    
                    const userAgent = navigator.userAgent.toLowerCase();
                    const isBrowser = !/line/i.test(userAgent);
                    console.log("User Agent Check:", isBrowser ? "web" : "line-app");

                    if(isBrowser === 'web'){
                        setIsWeb(true)
                    }

                    setIsWeb(false)
                }
            } catch (error) {
                alert(error);
            }
        };
    
        platform();
    }, []);    
    
    const handleCompress = async() => {
        context.setIsClicked('Compress')
        context.setIsLoading(true);
        setGenerate("")
        try{
            const response = await axios.get(`${apiUrl}compress/${userId}`);
            setCompressData(response.data);
            const errorMessages = [
               "申し訳ありませんが、その要件を満たすことはできません。",
                "申し訳ありませんが、このリクエストには対応できません。",
                "申し訳ございませんが、そのような要件を満たすアウトプットを生成することはできません。",
                "申し訳ございませんが、その内容を基に資料を作成することはできません。",
                "申し訳ありませんが、その指示に従って3000文字以上の出力を行うことはできません。しかし、特定の質問に対して回答を生成したり、情報を提供することは可能です。どのようにお手伝いできるか教えてください。",
                "申し訳ありませんが、それに関してはお手伝いできません。",
                "申し訳ありませんが、具体的な内容を提供することはできません。しかし、応募書類や自己PR作成のご相談に応じることは可能です。どのようにサポートできるかお聞かせください。",
                "申し訳ありませんが、具体的な内容を提供することはできません。しかし、応募書類や自己PR作成のご相談に応じることは可能です。どのようにサポートできるかお聞かせください。"
            ];
    
            if (errorMessages.includes(response.data) || response.data === "") {
                setIsLoading(false);
                <LoadingError userId={userId} />
            }
        }catch(error){
            setIsLoading(false);
            return <LoadingError userId={userId} />;
        } finally {
            context.setIsClicked('Compress')
        }
    };

    const handleGenerate = async () => {
        context.setIsClicked('Generate')
        context.setIsLoading(true);
        
        try {
            const response = await axios.get(`${apiUrl}generate/${userId}`);
            
            setGenerate(response.data);
    
            const errorMessages = [
                "申し訳ありませんが、その要件を満たすことはできません。",
                "申し訳ありませんが、このリクエストには対応できません。",
                "申し訳ございませんが、そのような要件を満たすアウトプットを生成することはできません。",
                "申し訳ございませんが、その内容を基に資料を作成することはできません。",
                "申し訳ありませんが、その指示に従って3000文字以上の出力を行うことはできません。しかし、特定の質問に対して回答を生成したり、情報を提供することは可能です。どのようにお手伝いできるか教えてください。",
                "申し訳ありませんが、ご要望にお応えすることができません。",
                "申し訳ありませんが、具体的な内容を提供することはできません。しかし、応募書類や自己PR作成のご相談に応じることは可能です。どのようにサポートできるかお聞かせください。"
            ];
    
            if (errorMessages.includes(response.data)) {
                setError(true);
                <LoadingError />
            }

        } catch (error) {
            console.error("Error fetching generated response:", error);
            <LoadingError />
        }
    };    

    useEffect(() => {
        if (context.generateIsReady === true && context.countdown === 0 && context.isClicked === 'Generate') {
            context.setIsLoading(false)
        } else if(context.compressIsReady && context.countdown === 0 && context.isClicked === 'Compress'){
            setShouldRenderCompress(true);
            context.setIsLoading(false);
        }
    }, [context.generateIsReady, context.countdown, context.compressIsReady ]);

    if (shouldRenderCompress) {
        return <Compress prompt={compressData} userId={userId} />;
    }

    if(context.isLoading){
        return <Loading generate={generate} userId={userId} prompt={compressData}/>;
    }

  const handleCopy = () => {
    setCopy(true)
    const textToCopy = generate ? generate : prompt;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopyStatus("コピーしました！");
        setTimeout(() => setCopyStatus(""), 2000);
      }).catch(() => {
        setCopyStatus("コピーに失敗しました")
      });
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    };

    function backToHome() {
        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          console.warn('LIFF is not running in the LINE app.');
        }
      }

    if(home){
        return <Home />
    }
    
    const formatJapaneseText = (text) => {
        return text.replace(/。/g, "。\n");
    };

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
                    文章の作成が完了しました。
                </div>
                <div
                onClick={handleCopy}
                className="min-h-96 max-h-96 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden"
                >
                    {copy && (
                        <div className='w-full bg-red-200 h-10 justify-center text-center leading-[2.5rem] z-50'>{copyStatus}</div>
                    )}
                    <p className='text-sm px-2 text-justify whitespace-pre-line'>{generate ? formatJapaneseText(generate) : formatJapaneseText(prompt)}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={handleCompress} className="bg-orange-400 text-white px-4 border flex-1 text-sm">
                    エントリーシート向けに文字数圧縮
                </button>
                <button onClick={handleGenerate} className="bg-green-400 text-white px-4 border flex-1 text-sm">
                    再生成
                </button>
                <button onClick={handleCopy} className="bg-yellow-400 text-white px-4 border flex-1 text-sm">
                    クリップボードにコピー
                </button>
                </div>
                {isWeb && (
                    <div onClick={backToHome} className='border-1 border-black mt-1 bg-gray-300'>
                        <button className='py-2'>
                            ホーム
                        </button>
                    </div>
                )}
                {/* <div onClick={backToHome} className='border-1 border-black mt-1 bg-gray-300'>
                    <button className='py-2'>
                            ホーム
                    </button>
                </div> */}
            </div>
    </div>
    );
}

export default Generate