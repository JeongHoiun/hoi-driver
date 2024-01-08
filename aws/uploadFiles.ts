import AWS from 'aws-sdk';

// 이미지를 canvas에 로드
const loadImage = (file: File): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        if (e.target?.result) {
            img.src = e.target.result as string;
        }
    };
    reader.readAsDataURL(file);
});

async function optimizeImage(file: File): Promise<File> {
    // canvas에서 이미지를 최적화
    const optimize = (img: HTMLImageElement): Promise<Blob> => new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 이미지 크기 조정
        const scaleFactor = 0.1; // 크기를 줄일 비율
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // canvas에서 Blob으로 변환
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            }
        }, 'image/png', 0.1); // 품질 조정
    });

    const img = await loadImage(file);
    const blob = await optimize(img);

    // Blob을 File 객체로 변환
    return new File([blob], file.name, { type: 'image/jpeg' });
}

export const uploadFiles = async (files: File[], path: string, insertId: number) => {
    // insertId는 첫 번째 파일의 db seq id
    const s3 = new AWS.S3();
    const re = files.map(async (file, index) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        const params = {
            Bucket: 'hoi-driver',
            Key: `${path}/${file.name}_${insertId + index}`,
            Body: file
        };
        const uploadOrgImagePromise = s3
            .upload(params)
            .promise();
        const minImage = await optimizeImage(file);
        const minParams = {
            Bucket: 'hoi-driver',
            Key: `min/${path}/${file.name}_${insertId + index}`,
            Body: minImage
        };
        const uploadOptimaizedImagePromise = s3.upload(minParams).promise();
        const result = await Promise.all([uploadOrgImagePromise, uploadOptimaizedImagePromise]);
        return result;
    });
    return re;
};
