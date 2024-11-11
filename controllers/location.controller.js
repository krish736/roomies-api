import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();


export const getBestPlaces = async(req, res, next) => {
    try {
        const {city, state, country} = req.body
        if (!country || !state || !city) {
            return next(errorHandler("400", "all fields are required"))
        }
        const response = await axios.get('https://api.foursquare.com/v3/places/search', {
            headers: {
              'Authorization': process.env.FOURSQUARE_API_KEY,
              'accept': 'application/json'
            }, 
            params: {
                near: `${city}, ${state}, ${country}`,
                sort: "POPULARITY",
                limit: 10,
              }
          });
      
        return res.status(200).json({
            success: true, 
            message: 'data-fetched-successfully', 
            data: response.data?.results, 
        })

    } catch (err) {
        next(err);
    }
}

