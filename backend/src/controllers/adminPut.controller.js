import dotenv from "dotenv";
import {__downloadsDirName} from '../1_libs/utils.js';
import handleError from '../1_libs/handleError.js';
import {uploadRun} from '../moduls/File.module.js';
import { updateProject_bd, updateServices_prices_bd } from '../moduls/bd/admin.table.module.js';

dotenv.config();

class  AdminPutController{
    async updateProject(req, res){
        try {
            const file = req.file;
            const id = req.params.id;
            const { name, short_description, deadline_min_day, deadline_max_day, types, url } = req.body;
            let filepath = '';
            if (!name && !short_description && !deadline_min_day && !deadline_max_day && !types && !url) {
                throw new Error('отсутствует: name, short_description, deadline_min_day, deadline_max_day, types, url');
            }
            if (file) {
                filepath = await uploadRun('projects', file);
            }

            await updateProject_bd({id, name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl: filepath });

            res.status(200).json({ message: 'Project обнавлен' });
        } catch (e) {
            handleError(e, res);
        }
    }
    async updateServices_prices(req, res){
        try {
            const id = req.params.id;
            const { title, short_description, deadlines, hit, price, currency, price_individually, time_individually } = req.body;

            if (!title && !short_description && !deadlines && !hit && !price && !currency && !price_individually && !time_individually) {
                throw new Error('отсутствует: title, short_description, deadline_min_day, deadline_max_day, types, url');
            }

            await updateServices_prices_bd(
                {id, title, short_description, deadlines, hit, price, currency, price_individually, time_individually }
            );

            res.status(200).json({ message: 'Project обнавлен' });
        } catch (e) {
            handleError(e, res);
        }
    }
}

const adminPutController = new AdminPutController();
export default  adminPutController;