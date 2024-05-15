import { model, Schema } from 'mongoose'

const saleSchema=new Schema({
    pieces: {
        type: String,
        required: true
    },
    NumbersOfPieces: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    typeOfpieces:{
        type:String,
       
    }

})
const saleModel=model('sale',saleSchema);
export{saleModel}
