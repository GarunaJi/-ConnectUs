import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import "./Imagepopupbox.css"; // Create this CSS file for styling
import { savedata } from "../redux/features/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import camera from "../assests/camera.png";
import "./BouncingLoader.css"; // Styles for the loader
const Imagepopupbox = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state?.auth?.data?.data }));
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const data = {
    textwritten: text ? text : "",
    Image: selectedFile ? selectedFile : "",
    id: user?._id,
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText); // Update the text state when textarea content changes
  };
  // console.log(data);

  const CustomToast = ({ message }) => (
    <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px" }}>
      {message}
    </div>
  );

  const handleSave = () => {
    if (data.textwritten != "" && data.Image != "") {
      const formData = new FormData();
      formData.append("image", data.Image);
      formData.append("text", data.textwritten);
      formData.append("id", data.id);
      setloading(true);
      window.scrollTo(0, 0); 
      if(user?.FirstName == '' || user?.FirstName == undefined){
        toast.error("First Add Your Details !")
        onClose();
        return;
      }
      dispatch(savedata({ formData, dispatch }))
        .then(() => {
          setloading(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast(<CustomToast message="Please fill the details" />, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="popup-container font-serif">
      <div className="popup-content">
        {loading ? (
          <div className="bouncing-loader-container">
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div>{/* Render the fetched data */}</div>
        )}
        <h1 className="text-2xl font-semibold italic">Make A Post</h1>
        <button className="close-button" onClick={onClose}>
          <ImCross />
        </button>
        <textarea
          className="text-area"
          placeholder="Start Typing . . ."
          rows="4"
          cols="50"
          name="text"
          value={text}
          onChange={handleTextChange}
        />
        <div className="imageadd">
          {selectedFile ? (
            <>
              {selectedFile.type.includes("image") ? (
                <>
                <img
                className="image"
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                />
                <label htmlFor="coverImage" className="cursor-pointer">
              {/* <img src={camera} className="imgupp" alt="Preview" /> */}
              <h3 className="text-center">Change Image</h3>
            </label>
                </>
                ) : (
                  <>
                  <video controls className="video">
                  <source
                    src={URL.createObjectURL(selectedFile)}
                    type={selectedFile.type}
                    />
                  Your browser does not support the video tag.
                </video>
                <label htmlFor="coverImage" className="cursor-pointer">
                <h2 className="text-center">Change Video</h2>
              <h4 className="text-red-300">* Vedio Size should less than 10 mb</h4>
            </label>
                </>
              )}
              </>
          ) : (
            <label htmlFor="coverImage" className="cursor-pointer">
              <img src={camera} className="imgup" alt="Preview" />
              <h3>Upload Cover Image</h3>
            </label>
          )}
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            // accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Imagepopupbox;
