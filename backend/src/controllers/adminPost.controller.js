import dotenv from "dotenv";
import { __downloadsDirName } from '../1_libs/utils.js';
import handleError from '../1_libs/handleError.js';
import Token from '../moduls/jwt.token.modul.js';
import { uploadRun } from '../moduls/File.module.js';
import { creatProject_bd, creatServices_prices_bd, creatReviews_bd } from '../moduls/bd/admin.table.module.js';

dotenv.config();

class AdminPostController {
    async creatTokin(req, res) {
        try {
            const { login, password } = req.body;

            if (login === process.env.ADMIN_LOGIN && process.env.ADMIN_PASSWORD === password) {
                const tokin = await Token.creatToken();
                res.cookie('Authorization', tokin, { httpOnly: true });
                res.json({ tokin: tokin });
            } else {
                res.status(401).json({ error: 'Incorrect login or password' });
            }

        } catch (e) {
            handleError(e, res);
        }
    }
    async creatProject(req, res) {
        try {
            const file = req.file;
            const { name, short_description, deadline_min_day = 10, deadline_max_day = 10, types, url } = req.body;
            let filepath = '';
            if (!name || !short_description || !types || !url) {
                throw new Error('отсутствует: name || short_description || types || url');
            }
            if (file) {
                filepath = await uploadRun('projects', file);
            }

            await creatProject_bd({ name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl:filepath });

            res.status(200).json({ message: 'Project создан' });
        } catch (e) {
            handleError(e, res);
        }
    }
    async creatServices_prices(req, res) {
        try {
            const {
                title, short_description, deadlines, hit, price, currency, price_individually, time_individually
            } = req.body;
            if (!title || !short_description) {
                throw new Error('отсутствует: title || short_description');
            }
            await creatServices_prices_bd(
                { title, short_description, deadlines, hit, price, currency, price_individually, time_individually }
            );
            res.status(200).json({ message: 'services_prices создан' });
        } catch (e) {
            handleError(e, res);
        }
    }
    async creatReview(req, res){
        try {
            const {
                name, review, img, url
            } = req.body;
            if (!name || !review) {
                throw new Error('отсутствует: name || review');
            }
            await creatReviews_bd(
                { name, review, img, url }
            );
            res.status(200).json({ message: 'review создан' });
        } catch (e) {
            handleError(e, res);
        }
    }
}

const adminPostController = new AdminPostController();
export default adminPostController;