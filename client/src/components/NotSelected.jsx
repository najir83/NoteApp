import React from "react";
import ContentLoader from "react-content-loader";
import useStore from "../store";
const NotSelected = () => {
  const {theme}=useStore();
  return (
    <div className="container w-full h-full p-5">
      <ContentLoader
        viewBox="0 0 400 160"
        width="100%"
        height="100%"
        className="w-full h-full"
        backgroundColor={`${theme=='light' ? "#f3f3f3" : (theme=='dark' ? "#4b5563":"#000000") }`}
        foregroundColor={`${theme=='light' ? "#ecebeb" : (theme==                                                                         'dark' ? "#6b7280" : "#1a1a1a")}`}
      >
        <rect x="0" y="12" rx="5" ry="5" width="220" height="10" />
        <rect x="0" y="29" rx="5" ry="5" width="220" height="10" />
        <rect x="179" y="76" rx="5" ry="5" width="220" height="10" />
        <rect x="179" y="58" rx="5" ry="5" width="220" height="10" />
        <rect x="0" y="104" rx="5" ry="5" width="220" height="10" />
        <rect x="0" y="122" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <div className="fixed top-60 right-30 md:top-90 md:right-220 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl italic font-sans text-green-800 font-bold">
          Welcome To Notiq !!
        </h1>
        <p className="font-serif text-lg font-medium text-gray-900 text-c">
          {" "}
          Your own note manager ...
        </p>
        <p className="font-serif text-c text-md opacity-50">
          Select one Note for Edit and view
        </p>
      </div>
    </div>
  );
};

export default NotSelected;
