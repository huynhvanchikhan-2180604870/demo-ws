export const uploadToCloudnary = async (pic) => {
  if (pic) {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "tourbooking");
    data.append("cloud_name", "dcc239rej");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcc239rej/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const fileData = await response.json();
      return fileData.url; // Make sure this is the correct property that Cloudinary sends back
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  } else {
    console.log("Error: No file provided for upload");
  }
};
