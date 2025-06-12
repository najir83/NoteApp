import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import useStore from "../store";
import NotSelected from "./NotSelected";
import axiosInstance from "../api/axiosInstance";
import { toast, Bounce } from "react-toastify";
const Home = () => {
  const saveref = useRef(null);
  const deleteRef = useRef(null);

  const { Reload, theme, setReload } = useStore();
  const [Notes, setNotes] = useState([{}]);

  const [selectedIndex, setselectedIndex] = useState(-1);
  useEffect(() => {
    const call = async () => {
      const res = await axiosInstance.get("/notes/");
      const data = res.data?.data;
      // console.log(data);

      setNotes([...data].reverse());
    };
    call();
  }, [selectedIndex]);

  const handleClick = (i) => {
    if (selectedIndex != i){ setselectedIndex(i);
      setSide(1);
    }
    else {
      setselectedIndex(-1);
      setSide(1);
    }
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
  const ReturnDate = (s) => {
    const date = new Date(s);
    return date.toLocaleDateString().substring();
  };
  const handleAdd = async () => {
    const tempNote = {
      title: "undefind",
      Content: "undefind",
      Tag: "undefind",
    };
    try {
      const res = await axiosInstance.post("/notes/", tempNote, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Note created", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      const data = res.data?.data;
      setNotes((prev) => [data, ...Notes]);
    } catch (error) {
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error.response?.data);
    }
  };

  const handleSave = async () => {
    saveref.current.disabled = true;
    // console.log(Notes[selectedIndex]._id);
    try {
      const res = await axiosInstance.post(
        "/notes/update",
        {
          id: Notes[selectedIndex]?._id,
          title: Notes[selectedIndex]?.title,
          Content: Notes[selectedIndex]?.Content,
          Tag: Notes[selectedIndex]?.Tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update Successful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error.response?.data);
    } finally {
      saveref.current.disabled = false;
    }
  };
  const handleDelete = async () => {
    deleteRef.current.disabled = true;
    // console.log(Notes[selectedIndex]._id);
    const _id = Notes[selectedIndex]?._id;
    try {
      const res = await axiosInstance.post(
        "/notes/delete",
        {
          _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res?.data)
      setselectedIndex(-1);
      toast.success("Delete Successful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error.response);
    } finally {
      deleteRef.current.disabled = false;
    }
  };

  const [mobileSide, setSide] = useState(1);
  const toggleSide = () => {
    setSide(!mobileSide);
  };
  return Reload ? (
    <Loading />
  ) : (
    <div className="w-full h-[84vh] flex flex-col md:flex-row sm:relative">
      <button
        onClick={toggleSide}
        className="transition text-right md:hidden cursor-pointer text-2xl px-2 py-1 hover:text-gray-500 hover:font-bold "
      >
        {mobileSide ? "⋮" : <span className="font-black">X</span>}
      </button>

      {/* Sidebar */}
      <div className={`w-full transition-all duration-300 ease-in-out 
  ${mobileSide ? "opacity-0 -translate-x-full absolute" : "opacity-100 translate-x-0"} 
  md:translate-x-0 md:opacity-100 md:static md:block md:w-1/5 
  h-full md:h-full border-b md:border-b-0 md:border-r overflow-y-auto`}>

        <div className="flex items-center justify-between px-3 py-2 bg-sky-500 noteBord">
          <h1 className="text-lg md:text-xl font-black">Notes</h1>
          <button
            onClick={handleAdd}
            className={`${
              theme === "light" ? "hover:bg-blue-500" : "hover:bg-gray-800"
            } rounded-xl text-sm md:text-base text-c font-bold px-3 py-1`}
          >
            Add
          </button>
        </div>
        <div className="overflow-y-scroll h-[calc(36vh-3rem)] md:h-[77vh]">
          {Notes.map((e, i) => (
            <div
              onClick={() => handleClick(i)}
              key={i}
              className={`cursor-pointer m-1 p-2 rounded-md ${
                i === selectedIndex
                  ? "bg-[#4ED7F1] selected-notes"
                  : "bg-zinc-100 notes"
              }`}
            >
              <input
                disabled
                className="text-base font-bold bg-transparent pointer-events-none w-full"
                value={e.title}
              />
              <div className="flex justify-between text-xs text-gray-700">
                <input
                  disabled
                  className="pointer-events-none bg-transparent"
                  value={e.Tag}
                />
                <p>{ReturnDate(e.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className={` ${!mobileSide ? "hidden":""} w-full md:w-4/5 h-full overflow-y-scroll p-4`}>
        {selectedIndex === -1 ? (
          <NotSelected />
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-lg md:text-2xl font-bold">
                Title:
                <input
                  value={Notes[selectedIndex]?.title || ""}
                  onChange={handleTitleChange}
                  className="block mt-1 w-full rounded-md bg-gray-100 text-bg font-semibold px-3 py-1 outline-none"
                />
              </h1>
              <div className="absolute top-1 right-0 space-x-2">
                <button
                  ref={saveref}
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-800 text-white font-bold px-3 py-1 rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  ref={deleteRef}
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium">Content:</h3>
              <textarea
                placeholder="Enter the notes"
                onChange={handleContentChange}
                value={Notes[selectedIndex]?.Content || ""}
                className="w-full min-h-[20vh] rounded-md bg-gray-100 text-bg px-3 py-2 outline-none"
              />
            </div>

            <div>
              <h4 className="text-base font-medium">Tag:</h4>
              <input
                onChange={handleTagChange}
                value={Notes[selectedIndex]?.Tag || ""}
                className="w-full rounded-md bg-gray-100 text-bg px-3 py-1 outline-none"
              />
            </div>

            <div className="border-b-1 m-4"> Preview Section</div>

            {/* Preview Section */}
            <div className="bg-gray-50 text-bg rounded-md p-4">
              <h1 className="text-xl font-bold text-center mb-2">
                {Notes[selectedIndex]?.title}
              </h1>
              <div className="w-full">
                <textarea
                  readOnly
                  value={selectedIndex < 0 ? "" : Notes[selectedIndex]?.Content}
                  className=" w-full resize-none bg-gray-100 text-bg border-0 outline-none rounded-md p-4  text-base min-h-[10vh]"
                  style={{
                    height: "auto",
                    overflow: "hidden",
                  }}
                  rows={1}
                  ref={(el) => {
                    if (el) {
                      el.style.height = "auto";
                      el.style.height = el.scrollHeight + "px";
                    }
                  }}
                ></textarea>
              </div>
              <p className="text-sm mt-2">
                Tag:
                <span className="pl-2 font-semibold">
                  {Notes[selectedIndex]?.Tag}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
