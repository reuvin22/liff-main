import React, { useState, useEffect } from "react";
import ArrowB from "../assets/arrow.png";
import axios from "axios";
import Liff from "@line/liff";
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
  const [prompt, setPrompt] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [writingAdvice, setWritingAdvice] = useState([]);
  const context = useAdsContext();

  const liffId = import.meta.env.VITE_APP_LIFF_ID;
  const apiUrl = import.meta.env.VITE_API_URL;
  const liffUrl = import.meta.env.APP_URL;

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
    displayName: "",
    Question_1: "",
    Ability_Desc_1: "",
    Question_2: "",
    Ability_Desc_2: "",
    Question_3: "",
    Question_4: "",
    Question_5: "",
    Question_6: "",
    Question_7: "",
    Question_8: "",
    Question_9: "",
    Question_10: "",
    Question_11: "",
  });

  const [userId, setUserId] = useState("");

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}questions`);
        setQuestionList(response.data.questions);
        setWritingAdvice(response.data.writing_advice);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("質問の読み込み中にエラーが発生しました。ページを再読み込みしてください。");
      } finally {
        context.setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Initialize LIFF
  useEffect(() => {
    const loadLIFF = async () => {
      try {
        await Liff.init({ liffId: "2006819941-rM1Q8Lm2" });

        if (!Liff.isLoggedIn()) {
          Liff.login();
          return;
        }

        const profile = await Liff.getProfile();
        setUserId(profile.userId);
        setFormData((prevData) => ({
          ...prevData,
          userId: profile.userId,
          displayName: profile.displayName,
        }));
      } catch (err) {
        console.error("LIFF initialization error:", err);
        alert("LIFF SDKの初期化に失敗しました。ページを再読み込みしてください。");
      }
    };

    loadLIFF();
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [userId]);

  const handleSubmit = async () => {
    context.setIsLoading(true);

    try {
      const postResponse = await axios.post(`${apiUrl}answers`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (
        postResponse.data.openai ===
          "申し訳ありませんが、そのリクエストには対応できません。" ||
        postResponse.data.openai ===
          "申し訳ございませんが、このリクエストを処理することはできません。"
      ) {
        <LoadingError userId={userId} />;
      }

      if (postResponse.status === 200) {
        setPrompt(postResponse.data.openai);
      } else {
        console.error("Submission failed: ", postResponse.data);
      }
    } catch (error) {
      console.error("Error during submission or fetching prompt:", error);
      alert("リクエストの処理中にエラーが発生しました。");
      <LoadingError />;
    }
  };

  if (context.isReady === true) {
    return <Generate prompt={prompt} userId={userId} />;
  }

  if (context.isLoading) {
    return <Loading generate={prompt} />;
  }

  const popUpAdvice = () => {
    setShowAdvice(!showAdvice);
  };

  const handleOptionClick = (value) => {
    const trimmedValue = value.trim();
    const abilityDescriptionIndex = Constants.Options.findIndex(
      (opt) => opt.trim() === trimmedValue
    );

    setSelectedOption(trimmedValue);
    setShowAdditionalDiv(true);

    setFormData((prevData) => ({
      ...prevData,
      [`Question_${progress}`]: trimmedValue,
      [`Ability_Desc_${progress}`]:
        Constants.AdditionalDetails?.[abilityDescriptionIndex] ||
        "説明が見つかりません",
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
    setCurrentInput("");
    const currentQuestionKey = `Question_${progress}`;
    if (!formData[currentQuestionKey]) {
      alert(`質問に答えてください。`);
      return;
    }

    if (progress === 11) {
      handleSubmit();
      context.setIsReady(true);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowAdditionalDiv(false);
      setProgress(progress + 1);
    }

    setShowAdvice(false);
  };

  const prevQuestion = () => {
    if (progress === 1 || progress === 2) {
      setShowAdditionalDiv(true);
    }
    if (currentStep > 1) {
      setProgress(progress - 1);
      setCurrentStep(currentStep - 1);
      setShowAdditionalDiv(false);
      setCurrentInput(formData[`Question_${currentStep - 1}`] || "");
    }
    setShowAdvice(false);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center relative">
      {questionList.length === 0 ? (
        <h1>
          <HomeLoading />
        </h1>
      ) : (
        <div className="bg-white w-80 rounded-lg shadow-lg h-[550px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <img
              src={ArrowB}
              alt="Arrow Top"
              className={progress === 1 ? `hidden` : `w-5 cursor-pointer rotate-180`}
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

            {(progress === 1 || progress === 2) && (
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
            )}
          </div>

          {showAdditionalDiv && selectedOption && (
            <div>
              <div className="bg-gray-300 w-72 ml-4 border-black border-2 py-1 px-4 mb-2">
                <p className="text-sm">能力の説明</p>
              </div>
              <div className="p-4 bg-gray-100 border-black border-2 w-72 ml-4 overflow-y-auto min-h-64 max-h-72">
                <p className="text-sm text-gray-600 text-justify">
                  {
                    Constants.AdditionalDetails[
                      Constants.Options.indexOf(selectedOption)
                    ]
                  }
                </p>
              </div>
            </div>
          )}

          {/* rest of your form and navigation UI remains unchanged */}
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
