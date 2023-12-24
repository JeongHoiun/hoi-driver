import AWS from 'aws-sdk';

export async function fetchSpecificPageItems(keys: string[]) {
    try {
        const s3 = new AWS.S3();
        const promises = keys.map((v) =>
            s3.getObject({ Bucket: 'hoi-driver', Key: v as string }).promise()
        );

        const dataArray = await Promise.all(promises);
        const blobUrls: string[] = dataArray.map((data) => {
            const blobData = new Blob([data.Body as Uint8Array]);
            return URL.createObjectURL(blobData);
        });
        return (blobUrls);
    } catch (error) { return []; }
}
