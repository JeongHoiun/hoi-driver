import AWS from 'aws-sdk';
import { Token } from 'aws-sdk/clients/s3';

const PAGE_SIZE = 10;

async function fetchSpecificPageItems(
    path: string, curPage: number, targetPage: number, continuationToken: Token | null
) {
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'hoi-driver',
        Prefix: path,
        MaxKeys: PAGE_SIZE,
        ContinuationToken: continuationToken || undefined
    };
    const result = await s3.listObjectsV2(params).promise();

    if (curPage !== targetPage) {
        return fetchSpecificPageItems(
            path, curPage + 1, targetPage, result.NextContinuationToken || '');
    }
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
    return [];
}

export async function fetchImages(path: string, page: number) : Promise<string[]> {
    try {
        return await fetchSpecificPageItems(path, 1, page, null);
    } catch (error) { return []; }
}
