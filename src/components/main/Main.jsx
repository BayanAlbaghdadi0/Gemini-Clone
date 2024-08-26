import React from "react";
import "./Main.css";
import runChat from "../../config/gemini";
import { assets } from "../../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import {
  setPrevPrompts,
  setRecentPrompt,
  setShowResult,
  Result,
  setLoading,
  setInput,
} from "../../features/chatSlice";

export const Main = () => {
  const dispatch = useDispatch();
  const { prevPrompts, showResult, recentPrompt, resultData, loading, input } =
    useSelector((state) => state.chat);

  // استخدام state محلي داخل component لتخزين النتيجة المتراكمة
  const [localResult, setLocalResult] = React.useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setLocalResult((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setLocalResult(""); //
    dispatch(Result(""));
    dispatch(setLoading(true));
    let result;
    if (prompt !== undefined) {
      result = await runChat(input);
      dispatch(setRecentPrompt(prompt));
    } else {
      // تعديل هنا لتمرير مصفوفة جديدة بدلاً من دالة
      dispatch(setPrevPrompts([...prevPrompts, input]));
      dispatch(setRecentPrompt(input));
      result = await runChat(input);
    }

    let responseArry = result.split("**");
    let newArr = "";

    for (let i = 0; i < responseArry.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArr += responseArry[i];
      } else {
        newArr += "<b>" + responseArry[i] + "</b>";
      }
    }

    let newResponse2 = newArr.split("*").join("</br>");
    let newResponseArry = newResponse2.split(" ");

    for (let i = 0; i < newResponseArry.length; i++) {
      const newWord = newResponseArry[i] + " "; //
      delayPara(i, newWord);
    }

    // تحديث النتيجة في Redux بعد انتهاء العرض التدريجي
    setTimeout(() => {
      dispatch(Result(localResult));
    }, 75 * newResponseArry.length);

    dispatch(setRecentPrompt(input));
    dispatch(setShowResult(true));
    dispatch(setLoading(false));
    dispatch(setPrevPrompts([...prevPrompts, input]));
    dispatch(setInput(""));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Genini</p>
        <a title="Linkedin" href="https://www.linkedin.com/in/bayan-albaghdadi-320588318/" target="_blank" style={{ cursor: "pointer" }}>
        <img src={assets.logo_linkedin} alt="" />
        </a>
      </div>
      <div className="main-containar">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Helo, Dev!</span>
              </p>
              <p>How i can help you ?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: localResult }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here "
              value={input}
              onKeyPress={handleKeyPress}
              onChange={(e) => dispatch(setInput(e.target.value))}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && (
                <img
                  src={assets.send_icon}
                  alt=""
                  onClick={() => onSent(input)}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Chat to start writing, planning, learning and more with Google AI
          </p>
        </div>
      </div>
    </div>
  );
};

// بالتأكيد! هل هناك أي شيء محدد تريد أن أفعله؟ مثلًا، هل تريد مني:
// كتابة قصة؟
// ترجمة نص؟
// تلخيص مقال؟
// حل مسألة رياضية؟
// تقديم معلومات عن موضوع معين؟
// غير ذلك؟ أخبرني ما تريد، وسأكون سعيدًا بمساعدتك.
