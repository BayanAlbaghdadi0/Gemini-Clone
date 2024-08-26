import React from "react";
import "./Sidbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setPrevPrompts,
  setRecentPrompt,
  setShowResult,
  Result,
  setLoading,
  setInput,
} from "../../features/chatSlice";
export const Sidbar = () => {
  const [extended, setExtended] = useState(false);
  const dispatch = useDispatch();

  const { prevPrompts, recentPrompt } = useSelector((state) => state.chat);
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
  const newChat = ()=>{
    dispatch(setLoading(false));
    dispatch(setShowResult(false));
  }
  const loadPrompt = async (prompt) => {
    dispatch(setRecentPrompt(prompt));
    await onSent(prompt);
  };
  return (
    <div className="sidbar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>new chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>activety</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>setting</p>}
        </div>
      </div>
    </div>
  );
};
