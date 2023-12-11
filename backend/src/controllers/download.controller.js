import path from 'path';
import fs from 'fs';
import {__downloadsDirName} from '../1_libs/utils.js';
import {addDownloadQuantity} from '../moduls/bd/download.table.modulet.js';
import handleError from '../1_libs/handleError.js';

class DownloadController{
    async download(req, res){
        try{
            const fname = req?.query?.fname ?? '',
                 filePath = path.resolve(__downloadsDirName, fname);

            if( fname === '' ){
                res.status(400);
            }
            else if( fs.existsSync(filePath) ){
                await res.download(filePath);
                await addDownloadQuantity();
            }else{
                res.status(404);
            }
        }catch(e){
            handleError(e, res);
        }
    }
}

const downloadController = new DownloadController();
export default  downloadController;