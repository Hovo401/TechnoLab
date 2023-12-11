import handleError from '../1_libs/handleError.js';
import { getMessages_bd, getApplications_bd, getDownloadsItems_bd } from '../moduls/bd/admin.table.module.js';


class  AdminGetController{
    async getMessagesItems(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            const {items, totalItems} = await getMessages_bd({offset, pageSize});

            res.json({
                "items": items,
                "meta": {
                    "totalItems": totalItems,
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }
    async getApplicationsItems(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            const {items, totalItems} = await getApplications_bd({offset, pageSize});

            res.json({
                "items": items,
                "meta": {
                    "totalItems": totalItems,
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }
    async getDownloadsItems(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            const {items, totalItems} = await getDownloadsItems_bd({offset, pageSize});

            res.json({
                "items": items,
                "meta": {
                    "totalItems": totalItems,
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }

}

const adminGetController = new AdminGetController();
export default  adminGetController;