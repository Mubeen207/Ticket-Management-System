import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
export default function CreatePost() {
  let userName = "mubeen207";
  let [postText, setPostText] = useState("");
  const publishPost = async () => {
    let newId = generateRandomId();
    await setDoc(doc(db, "posts", newId), {
      text: postText,
      date: Timestamp.fromDate(new Date()),
      userName: userName,
      id: newId,
      engagement: {
        likes: 0,
        commints: [],
      },
    });
    setPostText("");
  };

  return (
    <>
      <div className="p-2">
        <div>FireBase</div>
        <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="border"
        />
        {postText !== "" && <button onClick={publishPost}>Post</button>}
      </div>
    </>
  );
}

function generateRandomId(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
