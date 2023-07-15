"use client";
import { Audio } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default loading;
