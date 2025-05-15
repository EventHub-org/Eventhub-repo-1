package org.eventhub.main.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.eventhub.main.dto.PhotoRequest;
import org.eventhub.main.dto.PhotoResponse;
import org.eventhub.main.dto.S3UploadResponse;
import org.eventhub.main.exception.NullDtoReferenceException;
import org.eventhub.main.exception.ResponseStatusException;
import org.eventhub.main.mapper.PhotoMapper;
import org.eventhub.main.model.Photo;
import org.eventhub.main.repository.PhotoRepository;
import org.eventhub.main.service.EventService;
import org.eventhub.main.service.PhotoService;
import org.eventhub.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoMapper photoMapper;
    private final EventService eventService;
    private final UserService userService;
    private final S3ServiceImpl s3Service;

    @Autowired
    public PhotoServiceImpl(PhotoRepository photoRepository, 
                          PhotoMapper photoMapper, 
                          EventService eventService, 
                          UserService userService,
                          S3ServiceImpl s3Service) {
        this.photoRepository = photoRepository;
        this.photoMapper = photoMapper;
        this.eventService = eventService;
        this.userService = userService;
        this.s3Service = s3Service;
    }

    @Override
    public PhotoResponse create(PhotoRequest photoRequest) {
        if(photoRequest != null){
            Photo photo = photoMapper.requestToEntity(photoRequest, new Photo());
            return photoMapper.entityToResponse(photoRepository.save(photo));
        }
        throw new NullDtoReferenceException("Created photo Request can't be null");
    }

    @Override
    public PhotoResponse readById(UUID id) {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Photo with " + id + " id is not found"));
        return photoMapper.entityToResponse(photo);
    }

    @Override
    public Photo readByIdEntity(UUID id) {
        return photoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Photo with " + id + " id is not found"));
    }

    @Override
    public PhotoResponse update(PhotoRequest photoRequest, UUID id) {
        if (photoRequest != null) {
            Photo existingPhoto = readByIdEntity(id);
            Photo photo = photoMapper.requestToEntity(photoRequest, existingPhoto);
            return photoMapper.entityToResponse(photoRepository.save(photo));
        }
        throw new NullDtoReferenceException("Updated photo Request cannot be 'null'");
    }

    @Override
    public void deleteEventImage(UUID eventId, UUID imageId, String token) {
        eventService.validateEventOwner(token, eventId);
        Photo photo = readByIdEntity(imageId);
        s3Service.deleteEventImage(photo.getPhotoName());
        eventService.deleteImage(eventId, photo);
        photoRepository.delete(photo);
    }

    @Override
    public void deleteProfileImage(UUID ownerId, UUID imageId) {
        Photo photo = readByIdEntity(imageId);
        if (!photo.getPhotoName().startsWith("GPhoto")) {
            s3Service.deleteUserImage(photo.getPhotoName());
        }
        userService.deleteImage(ownerId, photo);
        photoRepository.delete(photo);
    }

    @Override
    public PhotoResponse addUserPhotoByUrl(UUID userId, String photoUrl) {
        Photo photo = new Photo();
        photo.setId(UUID.randomUUID());
        photo.setPhotoName(String.format("GPhoto%s", photo.getId()));
        photo.setPhotoUrl(photoUrl);

        userService.addImage(userId, photo);
        PhotoResponse response = photoMapper.entityToResponse(photoRepository.save(photo));

        return response;
    }

    @Override
    public List<PhotoResponse> getAll() {
        return photoRepository.findAll()
                .stream()
                .map(photoMapper::entityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PhotoResponse> uploadEventPhotos(UUID eventId, List<MultipartFile> files, String token) {
        eventService.validateEventOwner(token, eventId);
        List<PhotoResponse> responses = new ArrayList<>();
        
        for (MultipartFile file : files) {
            try {
                Photo photo = new Photo();
                photo.setId(UUID.randomUUID());

                S3UploadResponse uploadResponse = s3Service.uploadEventImage(file, eventId);
                String fileUrl = s3Service.generateEventsPresignedUrl(uploadResponse.getKey(), Duration.ofDays(1));
                photo.setPhotoName(file.getOriginalFilename());
                photo.setPhotoUrl(fileUrl);
                
                eventService.addImage(eventId, photo);
                responses.add(photoMapper.entityToResponse(photoRepository.save(photo)));
            } catch (Exception ex) {
                throw new ResponseStatusException("Failed to upload images to S3");
            }
        }
        return responses;
    }

    @Override
    public List<PhotoResponse> uploadProfilePhotos(UUID userId, List<MultipartFile> files) {
        List<PhotoResponse> responses = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                Photo photo = new Photo();
                photo.setId(UUID.randomUUID());

                S3UploadResponse uploadResponse = s3Service.uploadUserImage(file, userId);
                String fileUrl = s3Service.generateUsersPresignedUrl(uploadResponse.getKey(), Duration.ofDays(1));
                photo.setPhotoName(file.getOriginalFilename());
                photo.setPhotoUrl(fileUrl);
                
                userService.addImage(userId, photo);
                responses.add(photoMapper.entityToResponse(photoRepository.save(photo)));
            } catch (Exception ex) {
                throw new ResponseStatusException("Failed to upload images to S3");
            }
        }
        return responses;
    }
}
