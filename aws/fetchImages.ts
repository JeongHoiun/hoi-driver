import AWS from 'aws-sdk';

export const fetchImages = async (path: string) => {
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'hoi-driver',
        Prefix: path
    };

    let photoUrls: string[] = [];

    const request = await s3.listObjectsV2(params);
    const result = await request.promise().then((v) => v);
    if (result.Contents) {
        const { href } = request.httpRequest.endpoint;
        const bucketUrl = `${`${href}hoi-driver`}/`;

        photoUrls = (
            result.Contents.map((v) => v.Key).filter((v) => v !== undefined) as string[]
        ).map((v) => bucketUrl + encodeURIComponent(v));
    }
    return photoUrls;
};
