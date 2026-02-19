import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function ShowPost() {
  const userName = "mubeen207";
  const [allPostsList, setAllPostsList] = useState([]);
  const [commint, setCommint] = useState("");

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setAllPostsList(posts);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log(allPostsList.length);
  }, [allPostsList]);
  const updatePost = async (post, msg) => {
    const postRef = doc(db, "posts", post.id);
    if (msg === "like") {
      await updateDoc(postRef, {
        "engagement.likes": post.engagement.likes + 1,
      });
    } else {
      let newId = generateRandomId();
      await updateDoc(postRef, {
        "engagement.commints": arrayUnion({
          text: commint,
          id: newId,
          date: Timestamp.fromDate(new Date()),
          userName: userName,
        }),
      });
      setCommint("");
    }
  };
  return (
    <div>
      {allPostsList.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        allPostsList.map((post) => (
          <div key={post.id}>
            <h3>{post.text}</h3>
            <h3 onClick={() => updatePost(post, "like")}>
              Likes {post.engagement.likes}
            </h3>
            <h3>
              commints{" "}
              <div>
                <input
                  type="text"
                  onChange={(e) => setCommint(e.target.value)}
                  className="border"
                />
              </div>
              {commint !== "" && (
                <button onClick={() => updatePost(post)}>Post Commint</button>
              )}
              <span>
                {post.engagement.commints.length === 0 ? (
                  <p className="text-gray-400 italic">No comments yet</p>
                ) : (
                  post.engagement.commints.map((commit) => (
                    <p
                      key={commit.id}
                      className="text-gray-700 pl-2 border-l border-gray-300"
                    >
                      {commit.text}
                      <p>{commit.date.toDate().toLocaleString()}</p>
                    </p>
                  ))
                )}
              </span>
            </h3>
            <h3>Date: {post.date.toDate().toLocaleString()}</h3>
          </div>
        ))
      )}
    </div>
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
