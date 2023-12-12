import AWS from 'aws-sdk';

export async function fetchImages(path: string) : Promise<string[]> {
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'hoi-driver',
        Prefix: path
    };

    try {
        const result = await s3.listObjectsV2(params).promise();

        if (result.Contents) {
            const photoKeys = result.Contents.map((v) => v.Key);
            const promises = photoKeys.map((v) =>
                s3.getObject({ Bucket: 'hoi-driver', Key: v as string }).promise()
            );

            const dataArray = await Promise.all(promises);

            const blobUrls: string[] = dataArray.map((data) => {
                const blobData = new Blob([data.Body as Uint8Array]);
                return URL.createObjectURL(blobData);
            });

            return (blobUrls);
        }
    } catch (error) { /* empty */ }
    return [];
}
