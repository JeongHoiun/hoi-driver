import AWS from 'aws-sdk';
import { useState } from 'react';

export const useFetchImages = () => {
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);

    const fetchImages = async (path: string) => {
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'hoi-driver',
            Prefix: path
        };

        const request = await s3.listObjectsV2(params);
        const result = await request.promise().then((v) => v);

        if (result.Contents) {
            const photoKeys = result.Contents.map((v) => v.Key);
            photoKeys.map((v) =>
                s3.getObject({ Bucket: 'hoi-driver', Key: v as string, ResponseContentType: 'image/jpeg' }, (err, data) => {
                    if (err) { /* empty */ } else {
                        const blobData = new Blob([data.Body as Uint8Array]);
                        setPhotoUrls([...photoUrls,
                            URL.createObjectURL(blobData)]);
                    }
                })
            );
        }
    };
    return { fetchImages, photoUrls };
};
