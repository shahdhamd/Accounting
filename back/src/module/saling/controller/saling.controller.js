import { salingMonthlyModel } from "../../../../DB/model/monthSale.model.js";
import { saleModel } from "../../../../DB/model/sale.js";
import mongoose from "mongoose";




export const showAllSalingMonth = async (req, res) => {
    const { id } = req.params;
    try {
        const show = await salingMonthlyModel.findById(id);
        if (!show) {
            res.status(400).json({ message: "not found" });
        } else {
            const salingArray = show.saling.flat();
            const totalPricePerType = calculateTotalPricePerType(salingArray);
            const totalPriceForMonth = calculateTotalPriceForMonth(salingArray);
            res.status(200).json({ saling: show.saling, totalPricePerType, totalPriceForMonth });
        }
    } catch (error) {
        res.status(500).json({ message: `error: ${error}` });
    }
}

const calculateTotalPricePerType = (salingArray) => {
    const totalPricePerType = {};
    salingArray.forEach((saling) => {
        const { typeOfpieces, price, NumbersOfPieces } = saling;
        if (!totalPricePerType[typeOfpieces]) {
            totalPricePerType[typeOfpieces] = 0;
        }
        totalPricePerType[typeOfpieces] += price * NumbersOfPieces;
    });
    return totalPricePerType;
};

const calculateTotalPriceForMonth = (salingArray) => {
    let totalPriceForMonth = 0;
    salingArray.forEach((saling) => {
        totalPriceForMonth += saling.price * saling.NumbersOfPieces;
    });
    return totalPriceForMonth;
};

export const addSaling = async (req, res) => {
    try {
        const { pieces, NumbersOfPieces, price, typeOfpieces } = req.body;
        const { id } = req.params;

        const newSaling = await saleModel.create({
            pieces,
            NumbersOfPieces,
            price: price,
            typeOfpieces
        });
        const Update = await salingMonthlyModel.findOneAndUpdate(
            { _id: id },
            { $push: { saling: newSaling } },
            { new: true }
        );
        const show = await salingMonthlyModel.findById(id);
        if (!show) {
            res.status(400).json({ message: "not found" });
        } else {

            res.status(200).json({ message: "success", Update });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `error ${error}` });
    }
}





















export const deletSalingfromMonth = async (req, res) => {

    try {
        const url = req.originalUrl;
        console.log(url)
        const { id, Saleid } = req.params;
        console.log(id, Saleid)
        const find = await saleModel.findById(Saleid);
        console.log(find)

        if (!find) {
            res.status(404).json({ message: "error not found" })
        } else {
            const delet = await salingMonthlyModel.findByIdAndUpdate(id, { $pull: { saling: find } }, { new: true })
            const deletby = await saleModel.findByIdAndDelete(Saleid)
            if (!delet) {
                res.status(400).json({ message: "error in delet" })
            } else {

                res.status(200).json({ message: "succses" })
            }
        }

    } catch (error) {

        res.status(500).json(`error ${error}`)
    }
}

export const addMonth = async (req, res) => {
    try {
        const { month, companyName } = req.body;
        const add = await salingMonthlyModel.create(req.body);
        if (!add) {
            res.status(400).json({ message: "fail to add" })
        } else {

            res.status(200).json({ message: `succsses`, add })
        }

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const showAllmonth = async (req, res) => {
    try {

        const show = await salingMonthlyModel.find({});
        if (!show) {

            res.status(400).json({ message: `not found` })
        } else {


            res.status(200).json({ message: "sucsses", show });
        }

    } catch (error) {

        res.status(500).json({ message: `error : ${error}` })
    }

}

export const deletMonth = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const delet = await salingMonthlyModel.findByIdAndDelete(id);
        const deletBy = await saleModel.deleteMany();

        if (!delet) {
            res.status(400).json({ message: "error in deleting" })
        } else {

            res.status(200).json({ message: "sucsses", delet })
        }

    } catch (error) {

        res.status(500).json({ message: `error ${error}` })
    }

}

export const updateSaling = async (req, res) => {
    try {
        const { id, Saleid } = req.params;
        const { pieces, NumbersOfPieces, price, typeOfpieces } = req.body;
        const findMonth = await salingMonthlyModel.findById(id);
        // console.log(findMonth)
        if (!findMonth) {
            res.status(404).json({ message: "not found" })
        } else {
            console.log(findMonth.saling.flat())
            const findSale = findMonth.saling.flat().find(sale => sale._id.toString() === Saleid);
            console.log('find', findSale)
            // console.log('item',item)
            const findSlleIndex = findMonth.saling.flat().findIndex(sale => sale._id.toString() === Saleid)
            console.log('index', findSlleIndex)
            if (!pieces) {
                req.body.pieces = findSale.pieces;
            }
            if (!NumbersOfPieces) {
                req.body.NumbersOfPieces = findSale.NumbersOfPieces;
            }
            if (!price) {
                req.body.price = findSale.price;
                console.log('price', findSale.price)
            }
            if (!typeOfpieces) {
                req.body.typeOfpieces = findSale.typeOfpieces
            }
          
            console.log(findSale)

            req.body._id = findSale._id;
            const find = await saleModel.findByIdAndUpdate(req.body, { new: true })
            findMonth.saling[findSlleIndex] = req.body;
            await findMonth.save()
            return res.status(200).json({ message: "Update successful", findMonth });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `Error: ${error}` });
    }
}

