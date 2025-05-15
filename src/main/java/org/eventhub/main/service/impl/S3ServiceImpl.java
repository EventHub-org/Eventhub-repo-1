package org.eventhub.main.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.eventhub.main.dto.S3UploadResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;

@Service
public class S3ServiceImpl {
    private final AmazonS3 amazonS3;
    private final String userBucket;
    private final String eventBucket;
    private final S3Presigner s3Presigner;

    @Autowired
    public S3ServiceImpl(AmazonS3 amazonS3,
                         S3Presigner s3Presigner,
                         @Value("${aws.s3.user-bucket}") String userBucket,
                         @Value("${aws.s3.event-bucket}") String eventBucket) {
        this.amazonS3 = amazonS3;
        this.userBucket = userBucket;
        this.eventBucket = eventBucket;
        this.s3Presigner = s3Presigner;
    }

    public S3UploadResponse uploadUserImage(MultipartFile file, UUID userId) {
        String key = "users/" + userId + "/" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        return uploadFile(file, userBucket, key);
    }

    public S3UploadResponse uploadEventImage(MultipartFile file, UUID eventId) {
        String key = "events/" + eventId + "/" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        return uploadFile(file, eventBucket, key);
    }

    public String generateUsersPresignedUrl(String key, Duration expiration) {
        return generatePresignedUrl(key, expiration, userBucket);
    }

    public String generateEventsPresignedUrl(String key, Duration expiration) {
        return generatePresignedUrl(key, expiration, eventBucket);
    }

    private String generatePresignedUrl(String key, Duration expiration, String bucket) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(getObjectRequest)
                .signatureDuration(expiration)
                .build();

        return s3Presigner.presignGetObject(presignRequest).url().toString();
    }

    private S3UploadResponse uploadFile(MultipartFile file, String bucket, String key) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            amazonS3.putObject(bucket, key, file.getInputStream(), metadata);
            String fileUrl = amazonS3.getUrl(bucket, key).toString();
            return new S3UploadResponse(fileUrl, key);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }

    public void deleteUserImage(String key) {
        amazonS3.deleteObject(userBucket, key);
    }

    public void deleteEventImage(String key) {
        amazonS3.deleteObject(eventBucket, key);
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
} 