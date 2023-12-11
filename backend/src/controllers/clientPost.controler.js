import {__downloadsDirName} from '../1_libs/utils.js';
import {insertMessage, insertApplication, getProjectsItems, getProjectsItemsCount} from '../moduls/bd/client.table.module.js';
import handleError from '../1_libs/handleError.js';

class  ClientPostController{
    async postCreatMessage(req, res){
        try{
            const {communication_method, client_name, phone, message} = req.body;
            const g = await insertMessage({communication_method, client_name, phone, message});
            res.json(g);
        }catch(e){
            handleError(e, res);
        }
    }
    async postCreatApplication(req, res){
        try{
            const {communication_method, client_name, phone, message} = req.body;
            const g = await insertApplication({communication_method, client_name, phone});
            res.json(g);
        }catch(e){
            handleError(e, res);
        }
    }
}

const clientPostController = new ClientPostController();
export default  clientPostController;