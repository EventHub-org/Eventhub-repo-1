package org.eventhub.main.mapper;

import org.eventhub.main.dto.PhotoRequest;
import org.eventhub.main.dto.PhotoResponse;
import org.eventhub.main.exception.NullDtoReferenceException;
import org.eventhub.main.exception.NullEntityReferenceException;
import org.eventhub.main.model.Photo;
import org.springframework.stereotype.Service;

@Service
public class PhotoMapper {

    public PhotoResponse entityToResponse(Photo photo) {
        if (photo == null) {
            throw new NullEntityReferenceException("Photo can't be null");
        }
        return PhotoResponse.builder()
                .id(photo.getId())
                .photoName(photo.getPhotoName())
                .photoUrl(photo.getPhotoUrl())
                .build();

    }

    public Photo requestToEntity(PhotoRequest request, Photo photo) {
        if (request == null) {
            throw new NullDtoReferenceException("Request can't be null");
        }
        if (photo == null) {
            throw new NullEntityReferenceException("Photo entity can't be null");
        }

        photo.setPhotoUrl(request.getPhotoName());
        photo.setPhotoName(request.getPhotoName());
        return photo;
    }
}
