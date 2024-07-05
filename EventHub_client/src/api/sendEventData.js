import axios from "./axios";

export const sendDataWithoutPhotos = async (eventData) => {
  try {
    const response = await axios.post(`/users/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error sending data without photos to server:", error);

    throw error;
  }
};

function isFormDataEmpty(formData) {
  const entries = formData.entries();
  return entries.next().done;
}
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
export const sendPhotosToServer = async (formData, event_id) => {
  const mergedPhotos = appendFormData(formData);

  try {
    if (isFormDataEmpty(mergedPhotos)) return;
    const response = await axios.post(
      `/events/${event_id}/photos/upload`,
      mergedPhotos
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading photos to server:", error);

    throw error;
  }
};
