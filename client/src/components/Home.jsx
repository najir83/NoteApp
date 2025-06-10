import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import useStore from "../store";
import NotSelected from "./NotSelected";
const Home = () => {
  const { Reload } = useStore();
  const [Notes, setNotes] = useState([{}]);

  const [selectedIndex, setselectedIndex] = useState(-1);
  useEffect(() => {
    const array = [
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
      { title: "Morning Work", Content: "abbsi dhiuh", Tag: "excersize" },
    ];

    setNotes(array);
  }, []);
  const handleClick = (i) => {
    setselectedIndex(i);
  };

  // right part
  const handleTitleChange = (e) => {
    if (selectedIndex < 0) return;
    const updateNotes = [...Notes];
    updateNotes[selectedIndex] = {
      ...updateNotes[selectedIndex],
      title: e.target.value,
    };
    setNotes(updateNotes);
  };

  const handleTagChange = (e) => {
    if (selectedIndex < 0) return;
    const updateNotes = [...Notes];
    updateNotes[selectedIndex] = {
      ...updateNotes[selectedIndex],
      Tag: e.target.value,
    };
    setNotes(updateNotes);
  };

  const handleContentChange = (e) => {
    if (selectedIndex < 0) return;
    const updateNotes = [...Notes];
    updateNotes[selectedIndex] = {
      ...updateNotes[selectedIndex],
      Content: e.target.value,
    };
    setNotes(updateNotes);
  };
  return Reload ? (
    <Loading />
  ) : (
    <div className="w-full h-[84vh]">
      <div className="w-full h-full flex ">
        <div className=" w-1/5 h-full  ">
          <div className="flex items-center rounded-lg justify-between px-2.5 bg-sky-500 py-2 h-[6vh]">
            <h1 className="text-xl font-black">Notes</h1>
            <button className="text-black font-bold cursor-pointer">Add</button>
          </div>
          <div className=" mb-2 overflow-y-scroll h-[77vh] ">
            {Notes.map((e, i) => {
              return (
                <div
                  onClick={() => handleClick(i)}
                  key={i}
                  className={`cursor-pointer  m-1 p-1 rounded-r-md ${
                    i == selectedIndex ? "bg-[#4ED7F1]" : "bg-zinc-100"
                  } `}
                >
                  <h2 className="text-lg font-bold">
                    <input disabled value={e.title}></input>
                  </h2>
                  <div className="flex justify-between font-light text-sm">
                    <p>
                      <input disabled value={e.Tag}></input>
                    </p>
                    <p>Date</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-4/5  h-full overflow-y-scroll">
          {selectedIndex == -1 ? (
            <NotSelected />
          ) : (
            <div className="container  w-full h-full p-5">
              {/* Editor  */}
              <div className="relative">
                <h1 className="text-2xl font-bold">
                  {" "}
                  Title :{" "}
                  <input
                    value={`${
                      selectedIndex < 0 ? `` : Notes[selectedIndex]?.title
                    }`}
                    onChange={handleTitleChange}
                    className=" w-[66vw] font-semibold px-3 border-none outline-0 "
                  ></input>
                </h1>
                <button className="absolute cursor-pointer top-2 hover:bg-green-800 right-5 bg-green-600 text-md font-bold text-white w-20 p-2 rounded-lg">save</button>
                <h3 className="font-stretch-semi-expanded text-xl">
                  Content :
                </h3>
                <textarea
                  onChange={handleContentChange}
                  value={`${
                    selectedIndex < 0 ? `` : Notes[selectedIndex]?.Content
                  }`}
                  className=" pl-15 bg-gray-100 border-0 outline-0 w-full h-[30vh]"
                ></textarea>
                <h4 className="font-stretch-110% ">
                  Tag :{" "}
                  <input
                    onChange={handleTagChange}
                    className=" w-[66vw] font-semibold px-3 border-none outline-0 "
                    value={`${
                      selectedIndex < 0 ? `` : Notes[selectedIndex]?.Tag
                    }`}
                  ></input>
                </h4>
              </div>
              <div className="border-b-1 m-10"></div>
              <div className="bg-gray-50 m-10 flex flex-col items-center p-5 relative">
                <h1 className="font-bold text-xl ">
                  {selectedIndex < 0
                    ? "Nothing Selected"
                    : Notes[selectedIndex]?.title}
                </h1>
                <div className="p-2">
                  {selectedIndex < 0
                    ? "Nothing Selected"
                    : Notes[selectedIndex]?.Content}
                </div>
                <h4 className="font-stretch-110%  absolute left-2 bottom-2">
                  Tag :{" "}
                  <span className="font-semibold pl-2">
                    {" "}
                    {selectedIndex < 0
                      ? "Nothing Selected"
                      : Notes[selectedIndex]?.Tag}
                  </span>
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
