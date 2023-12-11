import Router from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminGetController from '../controllers/adminGet.contreller.js';
import adminPostController from '../controllers/adminPost.controller.js';
import adminPutController from '../controllers/adminPut.controller.js';
import adminDeleteController from '../controllers/adminDelete.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post('/creatTokin', adminPostController.creatTokin);

router.post('/project', authMiddleware, upload.single('file'), adminPostController.creatProject);
router.put('/project/:id', authMiddleware, upload.single('file'), adminPutController.updateProject);
router.delete('/project/:id', authMiddleware, upload.single('file'), adminDeleteController.deleteProject);

router.post('/services_prices', authMiddleware,  adminPostController.creatServices_prices);
router.put('/services_prices/:id', authMiddleware,  adminPutController.updateServices_prices);
router.delete('/services_prices/:id', authMiddleware,  adminDeleteController.deleteServices_prices);

router.post('/review', authMiddleware,  adminPostController.creatReview);
router.delete('/reviews/:id', authMiddleware,  adminDeleteController.deleteReview);

router.get('/messagesItems', authMiddleware, adminGetController.getMessagesItems);
router.delete('/message/:id', authMiddleware, adminDeleteController.deleteMessage);

router.get('/applicationsItems', authMiddleware, adminGetController.getApplicationsItems);
router.delete('/application/:id', adminDeleteController.deleteApplication );

router.get('/downloadsItems', authMiddleware,  adminGetController.getDownloadsItems);


export default router; 