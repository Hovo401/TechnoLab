
import jwtTokin from '../moduls/jwt.token.modul.js';
import handleError from '../1_libs/handleError.js';

const authMiddleware = async (req, res, next) => {
  try {
    
    const auth = await jwtTokin.Authorization(req);
    if (!auth) {
        throw Object.assign(new Error('Unauthorized'), { status: 401 });
    }
    next();
  } catch (e) {
    handleError(e, res);
  }
};

export default authMiddleware;