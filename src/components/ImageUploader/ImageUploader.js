import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const dropAreaStyle = {
    border: "1px dashed #ccc",
    height: "300px",
    width: "350px",
    borderRadius: "5px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    color: "#000",
    transition: "background-color 0.3s",
  };

  const iconStyle = {
    fontSize: "30px",
    color: "#000",
  };

  const textStyle = {
    fontSize: "20px",
    fontWeight: 300,
    color: "#000",
  };

  const spanStyle = {
    fontSize: "14px",
    fontWeight: 300,
    color: "#000",
    margin: "10px 0 15px 0",
  };

  const buttonStyle = {
    padding: "10px 25px",
    fontSize: "14px",
    fontWeight: 300,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#000",
    border: "1px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.5s",
  };

  const imageStyle = {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: "5px",
  };

  const handleUpdate = () => {
    setImages([]);
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
          <div
            className="upload__image-wrapper"
            style={dropAreaStyle}
            onClick={onImageUpload}
            {...dragProps}
          >
            {imageList.length > 0 ? (
              <>
                <img
                  src={imageList[0]["data_url"]}
                  alt="image"
                  style={imageStyle}
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            ) : (
              <>
                <div className="icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <h6 style={textStyle}>Drag & Drop File Here</h6>
                <span style={spanStyle}>OR</span>
                <button style={buttonStyle}>Browse File</button>
              </>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
