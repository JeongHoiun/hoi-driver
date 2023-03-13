import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: '----------',
    secretAccessKey: '----------------',
    region: 'ap-northeast-2',
    signatureVersion: 'v4'
});
