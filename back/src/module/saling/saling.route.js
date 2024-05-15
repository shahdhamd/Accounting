import { Router } from "express";
import * as salingRouter from './controller/saling.controller.js'
const saleRouter = Router();
saleRouter.post('/add/:id', salingRouter.addSaling)/// done
saleRouter.get('/all/:id', salingRouter.showAllSalingMonth) //done
saleRouter.delete('/delet/:id/:Saleid', salingRouter.deletSalingfromMonth)  /// done

saleRouter.post('/add', salingRouter.addMonth) ///// done

saleRouter.get('/all', salingRouter.showAllmonth) //done

saleRouter.delete('/delet/:id', salingRouter.deletMonth)  //done

saleRouter.patch('/update/:id/:Saleid', salingRouter.updateSaling)  // done

export default saleRouter;       