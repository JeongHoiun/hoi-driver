import AWS from 'aws-sdk';

export const uploadFiles = async (files: File[], path: string) => {
    files.map(async (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'hoi-driver',
            Key: `${path}/${file.name}`,
            Body: file
        };
        await s3.upload(params).promise();
    });
};
