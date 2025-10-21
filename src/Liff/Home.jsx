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
  const [errorMessage, setErrorMessage] = useState(""); // 🆕 Add this
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
        setErrorMessage("質問の読み込み中にエラーが発生しました。"); // 🆕
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
        await Liff.init({ liffId: liffId });

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
        setErrorMessage("LIFF SDKの初期化に失敗しました。ページを再読み込みしてください。"); // 🆕
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
        return <LoadingError userId={userId} />;
      }

      if (postResponse.status === 200) {
        setPrompt(postResponse.data.openai);
      } else {
        setErrorMessage("回答の送信に失敗しました。"); // 🆕
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrorMessage("リクエストの処理中にエラーが発生しました。"); // 🆕
    }
  };

  if (context.isReady === true) {
    return <Generate prompt={prompt} userId={userId} />;
  }

  if (context.isLoading) {
    return <Loading generate={prompt} />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center relative flex-col">
      {/* 🆕 Error Message Display */}
      {errorMessage && (
        <div className="bg-red-200 text-red-700 font-medium p-3 mb-3 rounded-md w-80 text-center shadow">
          {errorMessage}
        </div>
      )}

      {questionList.length === 0 ? (
        <h1>
          <HomeLoading />
        </h1>
      ) : (
        // existing content below remains unchanged...
        // ...
      )}
    </div>
  );
};

export default Home;
