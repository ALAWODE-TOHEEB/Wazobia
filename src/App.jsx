import { useState } from "react";
import TextEditor from "./TextEditor";
import { BsCardImage } from "react-icons/bs";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadedContent, setUploadedContent] = useState(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [isValidSocialMediaLink, setIsValidSocialMediaLink] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setUploadedContent(null); // Reset uploaded content when changing option
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedContent(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSocialLinkChange = (event) => {
    setSocialMediaLink(event.target.value);
    setIsValidSocialMediaLink(false);
  };

  const validateSocialMediaLink = () => {
    setIsValidSocialMediaLink(socialMediaLink !== "");
  };

  const renderContent = () => {
    if (selectedOption === "picture") {
      return (
        <div>
          <input type="file" accept="image/*" onChange={handleUpload} />
          {uploadedContent && <img src={uploadedContent} alt="Uploaded" />}
        </div>
      );
    } else if (selectedOption === "video") {
      return (
        <div>
          <input type="file" accept="video/*" onChange={handleUpload} />
          {uploadedContent && (
            <video controls>
              <source src={uploadedContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      );
    } else if (selectedOption === "social") {
      return (
        <div>
          <input
            type="text"
            placeholder="Enter social media link"
            value={socialMediaLink}
            onChange={handleSocialLinkChange}
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <button
            onClick={validateSocialMediaLink}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Post
          </button>
          {isValidSocialMediaLink && (
            <iframe
              title="SocialMediaEmbed"
              src={socialMediaLink}
              width="100%"
              height="500px"
              className="mt-4"
            ></iframe>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mx-auto pt-12">
      <h1 className="mb-4 text-2xl font-bold mr-[300px]">This is the title</h1>
      <TextEditor className="mb-4" />
      <select
        onChange={handleOptionChange}
        className="w-20 h-20 px-4 py-2 mb-2 border rounded-full cursor-pointer mr-[350px] mt-7 bg-gray-300 overflow-hidden relative"
      >
        <option
          value=""
          className="flex justify-center items-center  bg-gray-100 text-white text-center w-8 h-8 leading-8 cursor-pointer "
        >
          +
        </option>
        <option value="picture" className="cursor-pointer  bg-gray-100">
          <BsCardImage size={15} />
          Picture
        </option>
        <option value="video" className="cursor-pointer  bg-gray-100">
          Video
        </option>
        <option value="social" className="cursor-pointer  bg-gray-100">
          Social Media Link
        </option>
      </select>

      <div className="flex justify-center h-screen">
        {selectedOption !== "social" && (
          <div className="w-1/4">{renderContent()}</div>
        )}
        {selectedOption !== "picture" && selectedOption !== "video" && (
          <div className="w-full">{renderContent()}</div>
        )}
      </div>
    </div>
  );
};

export default App;
