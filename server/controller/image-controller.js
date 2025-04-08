import File from "../models/file.js";
export const uploadImage = async (request, response) => {
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
  };
  try {
    const file = await File.create(fileObj);
    response
      .status(200)
      .json({ path: `http://localhost:8000/file/${file._id}` });
  } catch (error) {
    console.error("Error uploading file:", error?.message);
    response.status(500).json({ message: "Failed to upload file" });
  }
};
export const downloadImage = async (request, response) => {
  try {
    const file = await File.findById(request.params.id);
    if (!file) {
      return response.status(404).json({ message: "File not found" });
    }
    file.downloadContent += 1;
    await file.save();
    response.download(file.path, file.name);
  } catch (error) {
    console.error("Error downloading file:", error?.message);
    response.status(500).json({ message: "Failed to download file" });
  }
};
