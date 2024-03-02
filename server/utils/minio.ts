import process from 'node:process'
import * as Minio from 'minio'

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_URL as string,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
})
