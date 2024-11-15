
import { Request, Response } from "express";
import CarModel from "../models/carModel";

import User from "../models/UserModel";

import { generateRandomPassword } from '../utils/generatePassword';
import Car from "../models/carModel";
import multer from "multer";
import cloudinary from "cloudinary";

/**
 *
 * ADD CANDIDATE CONTROLLER is used to add a candidate in the database
 * Car is added with respect to its owner
 *
 */
// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const addCar = async (req: Request, res: Response) => {
    try {

        const userId = req.userId;
        console.log(`User Id is ${userId}`);

        const { title, description, tags } = req.body;

        console.log("Title is ", title);
        console.log("Description is ", description);
        console.log("Tags is ", tags);

        const files = req.files as Express.Multer.File[];

        const uploadedImages = await Promise.all(
            files.map(
                (file) =>
                    new Promise<string>((resolve, reject) => {
                        const uploadStream = cloudinary.v2.uploader.upload_stream(
                            { folder: "cars" },
                            (error, result) => {
                                if (error) return reject(error);
                                if (result) resolve(result.secure_url);
                            }
                        );
                        uploadStream.end(file.buffer); // Pass the file buffer to the stream
                    })
            )
        );

        console.log(`Uploaded images are ${uploadedImages}`)

        const car = new Car({
            title,
            description,
            images: uploadedImages,
            tags: JSON.parse(tags),
            ownerId: req.userId
        });

        console.log(car);
        await car.save();

        res.status(201).json({
            "message":"Car Added Successfully",
            "status":"success"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}



/**
 *
 * ADD  MANY CANDIDATE CONTROLLER is used to add a list of candidate data in the database at once
 * Cars are added with respect to its owner
 * userId field is added to the each candidate
 */

interface Car {
    firstName: string;
    lastName: string;
    email: string;
}


/**
 *
 * DELETE candidate deletes the particular candidate from the database table on the basis of the
 * userID provided in the param
 *
 */
const deleteCar = async (req: Request, res: Response) => {

    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Car deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


/**
 *
 * DELETE ALL CANDIDATES deletes all the candidates entry from the mongodb CANDIDATE DOCUMENT COLLECTION
 *
 */
const deleteAllCar = async (req: Request, res:Response) => {
    try {
        const deleteResult = await CarModel.deleteMany({});
        res.status(200).json({
            message: `${deleteResult.deletedCount} Cars from the database has been deleted`
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 *
 * It returns all the Cars formed by the USER calling the API Request to the database
 * IT returns the candidate list after checking the USER HEADER for its userID
 */

const getAllCar = async (req: Request, res: Response) => {
    const user = req.userId;
    try{
        const cars=await CarModel.find({ ownerId: user });
        res.status(200).json({
            "message":"All Cars fetched Successfully",
            "cars":cars,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}



const getCar = async (req: Request, res: Response) => {
    const carId = req.params.id
    try{
        const car = await CarModel.findById(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (car.ownerId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // If the owner matches, return the car details
        res.status(200).json({
            message: 'Car fetched successfully',
            car: car,
            status: 'success'
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}



/**
 *
 * It returns all the Updated Cars
 * IT returns the candidate list after checking the USER HEADER for its userID
 */

const updateCar = async (req: Request, res: Response) => {
    const user = req.userId;
    try{
        const cars=await CarModel.find({ userId: user });
        res.status(200).json({
            "message":"All Cars fetched Successfully",
            "properties":cars,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}





export default {
    addCar,
    deleteCar,
    deleteAllCar,
    getAllCar,
    updateCar,
    getCar
};