import React, { useState, useEffect } from "react";
import ArrowB from "../assets/arrow.png";
import axios from "axios";
import liff from "@line/liff";
import Loading from "./Loading";
import LoadingError from "./LoadingError";
import Generate from "./Generate";
import Option from "./Option";
import HomeLoading from "./HomeLoading";
import { useAdsContext } from "../utils/context";
import Constants from "../core/Constants";

const Home = () => {
    const [progress, setProgress] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(11);
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [currentInput, setCurrentInput] = useState("");
    const [showAdvice, setShowAdvice] = useState(false);
    const [prompt, setPrompt] = useState("")
    const [questionList, setQuestionList] = useState([])
    const [writingAdvice, setWritingAdvice] = useState([])
    const context = useAdsContext();
    const liffId = import.meta.env.VITE_APP_LIFF_ID;
    const apiUrl = import.meta.env.VITE_API_URL;

    const maxInput =
    progress === 3 || progress === 4 || progress === 5
      ? 100
      : progress === 6 || progress === 8
      ? 200
      : progress === 7
      ? 600
      : 200;
    const [formData, setFormData] = useState({
        userId: null,
        displayName: '',
        Question_1: '',
        Ability_Desc_1: '',
        Question_2: '',
        Ability_Desc_2: '',
        Question_3: '',
        Question_4: '',
        Question_5: '',
        Question_6: '',
        Question_7: '',
        Question_8: '',
        Question_9: '',
        Question_10: '',
        Question_11: ''
    });
    const [userId, setUserId] = useState('');

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${apiUrl}questions`);
          setQuestionList(response.data.questions);
          setWritingAdvice(response.data.writing_advice);
        } catch (error) {
          console.error("Error fetching questions:", error);
          alert("Error fetching questions. Please try again later.");
        } finally {
          context.setIsLoading(false);
        }
      };
  
      fetchQuestions();
    }, []);

    useEffect(() => {
      const loadLIFF = async () => {
        try {
          await import('https://static.line-scdn.net/liff/edge/2.1/sdk.js')
            .then(() => {
              const liff = window.liff;
  
              if (liff) {
                liff.init({
                  liffId: liffId,
                })
                .then(() => {
                  if (!liff.isLoggedIn() && questionList.length === 0) {
                    return liff.login()
                  }else {
                    liff.getProfile()
                      .then((profile) => {
  
                        setUserId(profile.userId);
                        setFormData(prevData => ({
                          ...prevData,
                          userId: profile.userId,
                          displayName: profile.displayName
                        }));
                      })
                      .catch((err) => {
                        console.error("ユーザー プロファイルの取得中にエラーが発生しました:", err);
                        alert("ユーザー プロファイルの取得中にエラーが発生しました。もう一度お試しください。");
                      });
                  }
                })
                .catch((err) => {
                  console.error("LIFFの初期化中にエラーが発生しました:", err);
                  alert("LIFF SDKの初期化中にエラーが発生しました。しばらくしてからもう一度お試しください。");
                });
              } else {
                console.error("ウィンドウオブジェクトにLIFF SDKが見つかりません。");
                alert("LIFF SDKが正しく読み込まれていません。");
              }
            })
            .catch((error) => {
              console.error("Error loading LIFF SDK:", error);
              alert("LIFF SDK の読み込みに失敗しました。しばらくしてからもう一度お試しください。");
            });
        } catch (error) {
          console.error("Unexpected error:", error);
          alert("予期しないエラーが発生しました。もう一度お試しください。");
        }
      };
  
      loadLIFF();
    }, []);
  
    useEffect(() => {
      if (userId) {
        setFormData(prevData => ({
          ...prevData,
          userId: userId,
        }));
      }
    }, [userId]);
  
    const handleSubmit = async () => {
      context.setIsLoading(true);
  
      try {
        const postResponse = await axios.post(
            `${apiUrl}answers`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
  
          if (
              postResponse.data.openai === "申し訳ありませんが、そのリクエストには対応できません。" ||
              postResponse.data.openai === "申し訳ございませんが、このリクエストを処理することはできません。"
          ) {
            <LoadingError userId={userId} />
          }
          if (postResponse.status === 200) {
              setPrompt(postResponse.data.openai);
          } else {
              console.error("Submission failed: ", postResponse.data);
          }
      } catch (error) {
          console.error("Error during submission or fetching prompt:", error);
          alert("リクエストの処理中にエラーが発生しました。");
          <LoadingError />
      }
  };
    
    if(context.isReady === true){
      return <Generate
        prompt={prompt}
        userId={userId}
      />
    }

    if (context.isLoading) {
      return <Loading generate={prompt}/>;
    }

    const popUpAdvice = () => {
        setShowAdvice(!showAdvice)
    }

    const handleOptionClick = (value) => {
      const trimmedValue = value.trim();
      const abilityDescriptionIndex = Constants.Options.findIndex(opt => opt.trim() === trimmedValue);

      setSelectedOption(trimmedValue);
      setShowAdditionalDiv(true);

      setFormData((prevData) => ({
        ...prevData,
        [`Question_${progress}`]: trimmedValue,
        [`Ability_Desc_${progress}`]: Constants.AdditionalDetails?.[abilityDescriptionIndex] || "説明が見つかりません",
      }));
    };
      
      const handleInputLimit = (event) => {
        const inputValue = event.target.value.slice(0, maxInput);
        setCurrentInput(inputValue);
      
        const questionKey = `Question_${currentStep}`;
      
        setFormData((prevData) => {
          const updatedData = {
            ...prevData,
            [questionKey]: inputValue,
          };
          return updatedData;
        });
      };
  
      const nextQuestion = () => {
        setCurrentInput('');
        const currentQuestionKey = `Question_${progress}`;
        if (!formData[currentQuestionKey]) {
            alert(`質問に答えてください.`);
            return;
        }

        if(progress === 11){
            handleSubmit()
            return;
        }
        
    
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setShowAdditionalDiv(false);
            setProgress(progress + 1);
        }

        setShowAdvice(false)
    };    
      
    const prevQuestion = () => {
      if(progress === 1 || progress === 2){
        setShowAdditionalDiv(true);
      }
      if (currentStep > 1) {
        setProgress(progress - 1);
        setCurrentStep(currentStep - 1);
        setShowAdditionalDiv(false);
        setCurrentInput(formData[`Question_${currentStep - 1}`] || '');
      }
      setShowAdvice(false)
    };

    return (
      <div className="min-h-screen bg-blue-100 flex justify-center items-center relative">
        {questionList.length === 0 ? (
          <h1><HomeLoading /></h1>
        ):(
          <div className="bg-white w-80 rounded-lg shadow-lg h-[550px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <img
              src={ArrowB}
              alt="Arrow Top"
              className={progress === 1 ? `hidden` : `w-5 cursor-pointer rotate-180 `}
              onClick={prevQuestion}
            />
          </div>
  
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex mt-8 -mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i < progress ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">{`${currentStep} / ${totalSteps}`}</span>
          </div>
  
          <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-1 bg-slate-300 px-2 py-2">
              <ul className="list-disc pl-5">
                <li className="text-left">{questionList[currentStep - 1]}</li>
              </ul>
            </div>
  
            {(progress === 1 || progress === 2) ? (
            <div className="relative">
                <select
                    className="w-full border border-black px-4 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData[`Question_${progress}`] || ""}
                    onChange={(e) => handleOptionClick(e.target.value)} 
                >
                    <option value=""></option>
                    {Constants.Options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        ) : null}
          </div>
  
          {showAdditionalDiv && selectedOption && (
            <div>
              <div className="bg-gray-300 w-72 ml-4 border-black border-2 py-1 px-4 mb-2">
                <p className="text-sm">能力の説明</p>
              </div>
              <div className="p-4 bg-gray-100 border-black border-2 w-72 ml-4 overflow-y-auto min-h-64 max-h-72">
                  <p className="text-sm text-gray-600 text-justify">
                  {Constants.AdditionalDetails[Constants.Options.indexOf(selectedOption)]}
                  </p>
              </div>
            </div>
            )}
        
        {progress >= 3 && progress <= 8 && (
          <div className="relative bg-white p-4 max-w-sm mx-auto">
            <label className="block text-gray-600 text-sm mb-1 -mt-7">
              書き方の助言
            </label>
            <textarea
              type="text"
              maxLength={progress === 3 || progress === 4 || progress === 5 ? 100 : progress === 6 || progress === 8 ? 200 : progress === 7 ? 600 : 200 }
              rows={5}
              value={writingAdvice[progress - 1]}
              onChange={handleInputLimit}
              className={`cursor-pointer text-sm min-h-36 max-h-36 w-full px-2 py-1 border-black border-2 ${showAdvice && progress >= 4 && progress <= 8 ? "mt-2" : ""} ${showAdvice && currentStep === 6 ? "mt-6" : ""}`}
              readOnly
              onClick={popUpAdvice}
            />
            <p
              className={`text-xs text-right text-gray-500 ${showAdvice && progress >= 4 && progress <= 8 ? "mt-3" : "mt-1"} ${showAdvice && currentStep === 6 ? "mt-9" : ""}`}
            >
              入力文字数: {currentInput.length} / {progress === 3 || progress === 4 || progress === 5 ? 100 : progress === 6 || progress === 8 ? 200 : progress === 7 ? 600 : 200 }
            </p>
            <textarea
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={(e) => handleInputLimit(e)}
                className="w-full sm:text-xsm sm:text-sm md:text-md px-2 py-1 border-black border-2"
                placeholder="..."
                rows={showAdvice && currentStep === 6 ? 4 : 6}
                name={`Question_${Constants.Questions[currentStep]}`}
              />
          </div>
        )}
            {progress === 11 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto -mt-5">
                <label className="block text-gray-600 text-sm mb-1">
                書き方の助言
                </label>
                <textarea
                type="text"
                maxLength={200}
                rows={5}
                value={writingAdvice[progress - 1]}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2 cursor-pointer"
                readOnly
                onClick={popUpAdvice}
                />
                <p className={showAdvice && progress === 11 ? `text-xs text-right text-gray-500 mt-7` :
                  `text-xs text-right text-gray-500 mt-1`
                }>
                入力文字数: {currentInput.length} / {200}
            </p>
            <textarea
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={(e) => handleInputLimit(e)}
                className="w-full sm:text-xsm sm:text-sm md:text-md px-2 py-1 border-black border-2"
                placeholder="..."
                rows={6}
                name={`Question_${Constants.Questions[currentStep]}`}
              />
          </div>
          )}
          {showAdvice && (
              <div
                  className={`p-4 bg-white border-black border max-w-72 min-w-72 max-h-80 min-h-56 overflow-y-auto absolute top-5 ml-4 ${
                      writingAdvice[progress - 1]?.length < 200 ? "mt-10" : "mt-1"
                  }`}
              >
                  <div className="grid place-items-center">
                      <p className="text-sm text-gray-600 text-justify">
                          {writingAdvice[progress - 1]}
                      </p>
                      <button
                          onClick={popUpAdvice}
                          className="bg-slate-400 text-gray-600 px-4 py-2 w-full mt-4"
                      >
                          助言を閉じる
                      </button>
                  </div>
              </div>
          )}
            {progress === 9 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto ">
                <div className="-mt-6">
                <input
                type="text"
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                name={`Question_${Constants.Questions[currentStep]}`}
                />
                </div>
            </div>
            )}
            {progress === 10 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto">
                <div className="-mt-6">
                <input
                type="text"
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                name={`Question_${Constants.Questions[currentStep]}`}
                />
                </div>
            </div>
            )}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <img
              src={ArrowB}
              alt="Arrow Bottom"
              className="w-5 cursor-pointer"
              onClick={nextQuestion}
            />
          </div>
        </div>
        )}
      </div>
    );
  };

export default Home;
