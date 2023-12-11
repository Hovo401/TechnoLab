import handleError from '../1_libs/handleError.js';
import { deleteProject_bd, deleteServices_pricest_bd, deleteReview_bd, deleteMessage_bd, deleteApplication_bd } from '../moduls/bd/admin.table.module.js';


class  AdminDeletController{
    async deleteProject(req, res){
        try{
            const id = req.params.id;
            const cal = await deleteProject_bd(id);
            if(cal === 1){
                res.status(200).json({ message: 'DELETE ID = '+ id});
            }else{
                res.status(200).json({ message: 'нет элемент с такой ID ='+ id});
            }
        }catch(e){
            handleError(e, res);
        }
    }
    async deleteServices_prices(req, res){
        try{
            const id = req.params.id;
            const cal = await deleteServices_pricest_bd(id);
            if(cal === 1){
                res.status(200).json({ message: 'DELETE ID = '+ id});
            }else{
                res.status(200).json({ message: 'нет элемент с такой ID ='+ id});
            }
        }catch(e){
            handleError(e, res);
        }
    }
    async deleteReview(req, res){
        try{
            const id = req.params.id;
            const cal = await deleteReview_bd(id);
            if(cal === 1){
                res.status(200).json({ message: 'DELETE ID = '+ id});
            }else{
                res.status(200).json({ message: 'нет элемент с такой ID ='+ id});
            }
        }catch(e){
            handleError(e, res);
        }
    }
    async deleteMessage(req, res){
        try{
            const id = req.params.id;
            const cal = await deleteMessage_bd(id);
            if(cal === 1){
                res.status(200).json({ message: 'DELETE ID = '+ id});
            }else{
                res.status(200).json({ message: 'нет элемент с такой ID ='+ id});
            }
        }catch(e){
            handleError(e, res);
        }
    }
    async deleteApplication(req, res){
        try{
            const id = req.params.id;
            const cal = await deleteApplication_bd(id);
            if(cal === 1){
                res.status(200).json({ message: 'DELETE ID = '+ id});
            }else{
                res.status(200).json({ message: 'нет элемент с такой ID ='+ id});
            }
            
        }catch(e){
            handleError(e, res);
        }
    }

}

const adminDeletController = new AdminDeletController();
export default  adminDeletController;