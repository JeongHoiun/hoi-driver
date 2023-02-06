import AWS from 'aws-sdk';

AWS.config.region = 'ap-northeast-2'; // 리전

const Bucket = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'hoi-driver' }
});

Bucket.listBuckets((err, data) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Success', data.Buckets);
    }
});

const uploadParams = { Bucket: 'hoi-driver', Key: 'sdg.txt', Body: 'awefawef' };

Bucket.upload(uploadParams, (err, data) => {
    if (err) {
        console.log('Error', err);
    }
    if (data) {
        console.log('Upload Success', data.Location);
    }
});
