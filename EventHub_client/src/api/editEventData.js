import axios from "./axios";

export const editDataWithoutPhotos = async (eventData, event_id) => {
  const response = await axios.put(`/users/events/${event_id}`, eventData);
  return response.data;
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

export const editEventPhotos = async (formData, event_id) => {
  const mergedPhotos = appendFormData(formData);

  if (isFormDataEmpty(mergedPhotos)) return;
  const response = await axios.post(
    `/events/${event_id}/photos/upload`,
    mergedPhotos
  );
  return response.data;
};

export const deleteEvent = async (event_id) => {
  const response = await axios.delete(`/users/events/${event_id}`);
  return response.data;
};

export const deleteEventPhotos = async (event_id, photos) => {
  for (let photo_id of photos) {
    await axios.delete(`/events/${event_id}/photos/${photo_id}`);
  }
};
