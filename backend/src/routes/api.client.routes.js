import Router from 'express';
import clientGetController from '../controllers/clientGet.controller.js';
import clientPostController from '../controllers/clientPost.controler.js';


const router = Router();

router.get('/projectsItems', clientGetController.getprojectsItems_);
router.get('/services_pricesItems', clientGetController.getServices_pricesItems_);
router.get('/reviewsItems', clientGetController.getReviewsItems_);

router.post('/creatMessage', clientPostController.postCreatMessage);
router.post('/creatApplication', clientPostController.postCreatApplication);

export default router; 