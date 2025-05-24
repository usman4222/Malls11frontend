export const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "malls11");
    formData.append("resource_type", "raw");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dnylalr7y/raw/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error?.message || "Upload failed");
        }

        return data.secure_url;
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("File upload failed");
    }
};
