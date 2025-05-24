export const uploadImageToCloudinary = async (file) => {

    if (!file) throw new Error("No file provided");

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "malls11");
    cloudinaryFormData.append("cloud_name", "dnylalr7y");

    const response = await fetch("https://api.cloudinary.com/v1_1/dnylalr7y/image/upload", {
        method: "POST",
        body: cloudinaryFormData,
    });

    const data = await response.json();

    if (!data.secure_url) {
        throw new Error("Image upload failed");
    }

    return data.secure_url;
};
