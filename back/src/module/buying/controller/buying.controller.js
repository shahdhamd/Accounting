
import { byModel } from "../../../../DB/model/buy.js";
import { biyingMonthlyModel } from "../../../../DB/model/monthly.model.js";


export const addMonth = async (req, res) => {
    try {

        const { month } = req.body;
        const add = await biyingMonthlyModel.create(req.body);
        if (!add) {
            res.status(400).json({ message: "fail to add" })
        } else {
            res.status(200).json({ message: `success`, add })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const showAllmonth = async (req, res) => {
    try {
        const show = await biyingMonthlyModel.find({});
        if (!show) {
            res.status(400).json({ message: `not found` })
        } else {
            res.status(200).json({ message: "success", show });
        }
    } catch (error) {
        res.status(500).json({ message: `error: ${error}` })
    }
}


export const showAllBuyinginMonth = async (req, res) => {
    const { id } = req.params;
    try {
        const show = await biyingMonthlyModel.findById(id);
        if (!show) {
            res.status(400).json({ message: "not found" });
        } else {

            const buyingArray = show.buying.flat();
            const totalPricePerType = calculateTotalPricePerType(buyingArray);
            const totalPriceForMonth = calculateTotalPriceForMonth(buyingArray);
            res.status(200).json({ buying: show.buying, totalPricePerType, totalPriceForMonth });
        }
    } catch (error) {
        res.status(500).json({ message: `error: ${error}` });
    }
};


const calculateTotalPricePerType = (buyingArray) => {
    const totalPricePerType = {};
    buyingArray.forEach((buying) => {
        const { typeOfpieces, price, NumbersOfPieces } = buying;
        if (!totalPricePerType[typeOfpieces]) {
            totalPricePerType[typeOfpieces] = 0;
        }
        totalPricePerType[typeOfpieces] += price * NumbersOfPieces;
    });
    return totalPricePerType;
};


const calculateTotalPriceForMonth = (buyingArray) => {
    let totalPriceForMonth = 0;
    buyingArray.forEach((buying) => {
        totalPriceForMonth += buying.price * buying.NumbersOfPieces;
    });
    return totalPriceForMonth;
};


export const addBuying = async (req, res) => {
    try {
        const { pieces, NumbersOfPieces, price, typeOfpieces } = req.body;
        const { id } = req.params;

        const newBuying = await byModel.create({
            pieces,
            NumbersOfPieces,
            price: price,
            typeOfpieces
        });
        const Update = await biyingMonthlyModel.findOneAndUpdate(
            { _id: id },
            { $push: { buying: newBuying } },
            { new: true }
        );
        const show = await biyingMonthlyModel.findById(id);
        if (!show) {
            res.status(400).json({ message: "not found" });
        } else {

            res.status(200).json({ message: "success", Update });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `error ${error}` });
    }
};


export const deletMonth = async (req, res) => {
    const { id } = req.params;
    const delet = await biyingMonthlyModel.findByIdAndDelete(id);
    const deletBy = await byModel.deleteMany();
    if (!delet) {
        res.status(400).json({ message: "error in deleting" })
    } else {
        res.status(200).json({ message: "success", delet })
    }
}


export const deletBuyingfromMonth = async (req, res) => {
    try {
        const { id, Buyid } = req.params;
        const find = await byModel.findById(Buyid);

        if (!find) {
            res.status(404).json({ message: "error not found" })
        } else {
            const delet = await biyingMonthlyModel.findByIdAndUpdate(id, { $pull: { buying: find } }, { new: true })
            const deletby = await byModel.findByIdAndDelete(Buyid)
            if (!delet) {
                res.status(400).json({ message: "error in delete" })
            } else {
                res.status(200).json({ message: "success" })
            }
        }
    } catch (error) {
        res.status(500).json(`error ${error}`)
    }
}


export const updateBuying = async (req, res) => {
    try {
        const { id, Buyid } = req.params;
        const { pieces, NumbersOfPieces, price, typeOfpieces } = req.body;


        const findMonth = await biyingMonthlyModel.findById(id);
        if (!findMonth) {
            res.status(404).json({ message: "not found" })

        } else {
            console.log(findMonth.buying.flat())

            const findBuy = findMonth.buying.flat().find(buy => buy._id.toString() === Buyid);
            console.log('find', findBuy)
            const findSlleIndex = findMonth.buying.flat().findIndex(sale => sale._id.toString() === Buyid)

            // const updateSale = {
            //     pieces: pieces || findBuy.pieces,
            //     NumbersOfPieces: NumbersOfPieces || findBuy.NumbersOfPieces,
            //     price: price || findBuy.price,
            //     typeOfpieces: typeOfpieces || findBuy.typeOfpieces,
            //     _id:findBuy._id
            // }
            if (!pieces) {
                req.body.pieces = findBuy.pieces;
            }
            if (!NumbersOfPieces) {
                req.body.NumbersOfPieces = findBuy.NumbersOfPieces;
            }
            if (!price) {
                req.body.price = findBuy.price;
                console.log('price', findBuy.price)
            }
            if (!typeOfpieces) {
                req.body.typeOfpieces = findBuy.typeOfpieces
            }
            req.body._id = findBuy._id;

            const find = await byModel.findByIdAndUpdate(req.body, { new: true })
            findMonth.buying[findSlleIndex] = req.body;
            await findMonth.save()
            return res.status(200).json({ message: "Update successful", findMonth });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `Error: ${error}` });
    }
}


