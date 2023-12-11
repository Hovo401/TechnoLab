import fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';
import { __publicDirName } from '../1_libs/utils.js';

async function creatDir(dirName, post_id) {
    const dirPath = path.resolve(__publicDirName, dirName, String(post_id));
    const made = await mkdirp(dirPath);
    return dirPath;
}


async function uploadFile(filePath, fileBuffer) {
    return new Promise((resolve, reject) => {
        // Создайте поток для записи файла
        const writeStream = fs.createWriteStream(filePath);
        // Запишите данные файла в поток
        writeStream.write(fileBuffer);
        // Обработайте событие завершения записи файла
        writeStream.on('finish', () => {
            resolve();
        });
        // Обработайте ошибку записи файла
        writeStream.on('error', (error) => {
            reject(error);
        });
        // Закройте поток, чтобы завершить запись файла
        writeStream.end();
    });
}



async function uploadRun(dirName, file, post_id = 0) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    const filePath = await creatDir(dirName, post_id);
    const originalName = file.originalname;
    const fileBuffer = file.buffer;

    const fileName = originalName.substring(0, originalName.lastIndexOf('.'));// Берем имя файла без расширения
    const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла


    const newfileName = `${fileName}-${uniqueSuffix}${fileExtension}`;
    const fullFilePath = path.resolve(filePath, newfileName);

    await uploadFile(fullFilePath, fileBuffer);
    return fullFilePath;
}


async function deleteFolder(folderPath) {
    try {
        if ((await fs.promises.stat(folderPath)).isDirectory()) {
            const files = await fs.promises.readdir(folderPath);
            for (const file of files) {
                const currentPath = path.join(folderPath, file);
                if ((await fs.promises.stat(currentPath)).isDirectory()) {
                    await deleteFolder(currentPath);
                } else {
                    await fs.promises.unlink(currentPath);
                }
            }
            await fs.promises.rmdir(folderPath);
        }
    } catch (error) {
        throw new Error('Error deleting folder: ', error.message);
    }
}

export { uploadRun, deleteFolder };





// import fs from 'fs';
// import {mkdirp} from 'mkdirp';
// import path from 'path';
// import {__publicDirName} from '../1_libs/utils.js';

// async function creatDir(dirName, post_id) {
//     const dirPath =  path.resolve(__publicDirName, dirName, String(post_id));
//     const made = await mkdirp(dirPath);
//     return dirPath;
// }

// async function uploadFile(filePath, fileBuffer) {
//     return new Promise((resolve, reject) => {
//         // Создайте поток для записи файла
//         const writeStream = fs.createWriteStream(filePath);
//         // Запишите данные файла в поток
//         writeStream.write(fileBuffer);
//         // Обработайте событие завершения записи файла
//         writeStream.on('finish', () => {
//           resolve();
//         });
//         // Обработайте ошибку записи файла
//         writeStream.on('error', (error) => {
//           reject(error);
//         });
//         // Закройте поток, чтобы завершить запись файла
//         writeStream.end();
//       });
// }



// async function uploadRun(dirName, file, post_id = 0) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

//     const filePath = await creatDir(dirName, post_id);
//     const originalName = file.originalname;
//     const fileBuffer  = file.buffer;

//     const fileName = originalName.substring(0, originalName.lastIndexOf('.'));// Берем имя файла без расширения
//     const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла


//     const newfileName = `${fileName}-${uniqueSuffix}${fileExtension}`;
//     const fullFilePath = path.resolve(filePath, newfileName);

//     await uploadFile(fullFilePath, fileBuffer);
//     return fullFilePath;
// }



// async function deleteFolder(folderPath) {
//     try {
//         if (await fs.stat(folderPath).then(stat => stat.isDirectory())) {
//             const files = await fs.readdir(folderPath);
//             for (const file of files) {
//                 const currentPath = `${folderPath}/${file}`;
//                 if (await fs.stat(currentPath).then(stat => stat.isDirectory())) {
//                     await deleteFolder(currentPath);
//                 } else {
//                     await fs.unlink(currentPath);
//                 }
//             }
//             await fs.rmdir(folderPath);
//         }
//     } catch (error) {
//         throw new Error('Error deleting folder: ', error.message);
//     }
// }

// export { uploadRun, deleteFolder };
