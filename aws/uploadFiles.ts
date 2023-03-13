import AWS from 'aws-sdk';

export const uploadFiles = async (files: File[]) => {
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'hoi-driver',
        Key: files[0].name,
        Body: files[0]
    };
    const { Location } = await s3.upload(params).promise();
    console.log('uploading to s3', Location);
};
