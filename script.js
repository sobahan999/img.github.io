// Configure AWS SDK for Wasabi
AWS.config.update({
    accessKeyId: 'ZN47M4ZBZP7VW4XAYBGK',
    secretAccessKey: 'eDerkN4Ql3z3kZedXZwowdM2MqlCeNDhh3moE5Hq',
    region: 'ap-northeast-1',
    endpoint: 'https://s3.ap-northeast-1.wasabisys.com', // রিজিওন অনুযায়ী এন্ডপয়েন্ট
    signatureVersion: 'v4'
});

const s3 = new AWS.S3();
const bucketName = 'img1'; // Replace with your bucket name

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const statusDiv = document.getElementById('status');
    
    if (!fileInput.files.length) {
        statusDiv.innerHTML = 'Please select a file first';
        return;
    }

    const file = fileInput.files[0];
    const fileName = Date.now() + '-' + file.name;

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ContentType: file.type
    };

    statusDiv.innerHTML = 'Uploading...';

    try {
        const result = await s3.upload(params).promise();
        statusDiv.innerHTML = `Upload successful! File URL: ${result.Location}`;
    } catch (error) {
        statusDiv.innerHTML = `Upload failed: ${error.message}`;
    }
}
