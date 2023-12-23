import AWS from 'aws-sdk';

export const uploadFiles = async (files: File[], path: string, insertId: number) => {
    // insertId는 첫 번째 파일의 db seq id
    const re = files.map(async (file, index) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'hoi-driver',
            Key: `${path}/${file.name}_${insertId + index}`,
            Body: file
        };
        const result = await s3
            .upload(params)
            .promise()
            .then((v) => v);
        return result;
    });
    return re;
};
