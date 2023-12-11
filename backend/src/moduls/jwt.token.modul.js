import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';

class Token {
    async parserToken(tokin) {
        try{
            const decoded = jwt.verify(tokin, process.env.SECRET_KEY);
            const id = Object(decoded)?.id ?? -1;
            const date = Object(decoded)?.date ?? -1;
    
            return { id, date };
        }catch(e){
        }
    }

    async Authorization(req) {
        const parserTokenResult = [
            await this.parserToken(req.headers?.authorization ?? '.'),
            await this.parserToken(req.cookies?.Authorization ?? '.'),
        ];
        
        for (const el of parserTokenResult) {
            if (el?.id == 0, el?.date + process.env.MAX_KEY_TIME_DAY * 24 * 60 * 60 * 1000 >= new Date().getTime()) {
                return el;
            }
        }

        return false;
    }

    async creatToken(id = 0) {
        const token = jwt.sign({ id: id, date: new Date().getTime() }, process.env.SECRET_KEY);
        return String(token);
    }
}

export default new Token();
