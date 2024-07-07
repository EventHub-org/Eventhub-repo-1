import axios from "./axios";

export const sendDataWithoutPhotos = async (userData) => {
  const response = await axios.put("/users", userData);
  return response.data;
};

const isFormDataEmpty = (formData) => {
  const entries = formData.entries();
  return entries.next().done;
};

const appendFormData = (formDataArray) => {
  const mergedFormData = new FormData();

  formDataArray.forEach((formData) => {
    if (!formData) return;
    for (const [key, value] of formData.entries()) {
      mergedFormData.append("files", value);
    }
  });

  return mergedFormData;
};

export const sendPhotosToServer = async (formData) => {
  const mergedFormData = appendFormData(formData);

  if (isFormDataEmpty(mergedFormData)) return;
  const response = await axios.post("/users/photos/upload", mergedFormData);
  return response.data;
};

export const deleteUserPhotos = async (photos) => {
  for (let photo of photos) {
    await axios.delete(`/users/photos/${photo}`);
  }
};
