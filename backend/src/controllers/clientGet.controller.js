import handleError from '../1_libs/handleError.js';
import {
    getProjectsItems, getProjectsItemsCount, getServices_pricesItems, getServices_pricesItemsCount, 
    getReviewsItems, getReviewsItemsCount
} 
from '../moduls/bd/client.table.module.js';


class ClientGetController{
    async getprojectsItems_(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            res.json({
                "items": 
                    await getProjectsItems(offset, pageSize)
                ,
                "meta": {
                    "totalItems": await getProjectsItemsCount(),
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }
    async getServices_pricesItems_(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            res.json({
                "items": 
                    await getServices_pricesItems(offset, pageSize)
                ,
                "meta": {
                    "totalItems": await getServices_pricesItemsCount(),
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }
    async getReviewsItems_(req, res){
        try{
            const page = req?.query?.page ?? 1,
                pageSize = req?.query?.pageSize ?? 3,
                offset = pageSize * (page - 1);

            res.json({
                "items": 
                    await getReviewsItems(offset, pageSize)
                ,
                "meta": {
                    "totalItems": await getReviewsItemsCount(),
                    "currentPage": page,
                    "pageSize": pageSize
                }
            });
        }catch(e){
            handleError(e, res);
        }
    }
}

const clientGetController = new ClientGetController();
export default  clientGetController;