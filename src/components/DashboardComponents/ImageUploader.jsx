import React from "react";

const ImageUploader = ({
  file,
  fileName,
  imagePreview,
  imageUploading,
  onFileChange,
  setFile,
  setFileName,
  setImagePreview,
}) => {
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
      setImagePreview(URL.createObjectURL(files[0]));
      onFileChange(files[0]);
    }
    event.currentTarget.classList.remove("border-blue-500");
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center p-[16px_24px] w-full h-[188px] border-2 border-[#CBC5FF] border-dashed rounded-[12px] cursor-pointer bg-[rgba(238,236,255,0.40)] hover:bg-gray-100"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload profile image</span>{" "}
            or drag and drop
          </p>
          {fileName ? (
            <p className="mt-2 text-gray-700">Selected file: {fileName}</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              setFile(selectedFile);
              setFileName(selectedFile.name);
              setImagePreview(URL.createObjectURL(selectedFile));
              onFileChange(selectedFile);
            }
          }}
        />
      </label>

      {imageUploading ? (
        <p className="mt-4 text-sm text-gray-600">Uploading...</p>
      ) : (
        imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 rounded-full shadow-md object-cover"
            style={{ width: "150px", height: "150px" }}
          />
        )
      )}
    </div>
  );
};

export default ImageUploader;
