/** biome-ignore-all lint/style/noNonNullAssertion: <nah> */
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const rustfs_client = new S3Client({
  region: "cn-east-1",
  credentials: {
    accessKeyId: process.env.RUSTFS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.RUSTFS_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.RUSTFS_ENDPOINT_URL!,
  requestStreamBufferSize: 32 * 1024 * 1024,
});

const IMAGE_BUCKET = "image";
// biome-ignore lint/correctness/noUnusedVariables: <Will be used later>
const TEMP_BUCKET = "temp"; // TODO: Implement presigned upload

export async function uploadFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  const command = new PutObjectCommand({
    Bucket: IMAGE_BUCKET,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
    ContentLength: file.size,
  });
  await rustfs_client.send(command);
  return command.input.Key;
}
