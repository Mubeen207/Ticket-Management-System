import React from "react";
import CreatePost from "./CreatePost";
import ShowPost from "./ShowPost";

export default function Home() {
  return (
    <>
      {/* <div>Home</div> Iam facing issue*/}
      <CreatePost />
      <ShowPost />
    </>
  );
}
