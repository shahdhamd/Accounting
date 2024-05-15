import { Router } from "express";
import * as buyingRouter from './controller/buying.controller.js';


const buyRouter = Router();
buyRouter.post('/addmonth', buyingRouter.addMonth) //done
buyRouter.post('/add/:id', buyingRouter.addBuying) //done
buyRouter.get('/all', buyingRouter.showAllmonth)  //done
buyRouter.get('/all/:id', buyingRouter.showAllBuyinginMonth) //done
buyRouter.delete('/delet/:id', buyingRouter.deletMonth)  // done
buyRouter.delete('/delet/:id/:Buyid', buyingRouter.deletBuyingfromMonth)  ///done
buyRouter.patch('/update/:id/:Buyid', buyingRouter.updateBuying)  //done
export default buyRouter;
