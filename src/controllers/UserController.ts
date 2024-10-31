import { Request, Response } from "express";
import User from "../models/User";

/**
 * Creates a new user or returns success if user already exists
 *
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response|void>}
 *    - 200: If user already exists
 *    - 201: Returns newly created user object
 *    - 500: If server encounters an error during creation
 *
 * @throws {Error} When database operation fails
 *
 * // Response (200): Empty response if user exists
 */
export const createCurrentUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { auth0Id } = req.body;

    const userExists = await User.findOne({ auth0Id });

    if (userExists) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

/**
 * Retrieves the current user's information based on their userId from the request
 *
 * @async
 * @param {Request} req - Express request object containing userId in its properties
 * @param {Response} res - Express response object
 * @returns {Promise<Response|void>}
 *    - 200: Returns user object if found
 *    - 404: If user is not found
 *    - 500: If server encounters an error
 *
 * @throws {Error} When database operation fails
 *
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userId } = req;
    const currentUser = await User.findOne({ _id: userId });

    if (!currentUser) return res.status(404).json({ message: "User not found" });

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Someting went wrong while getting the user info" });
  }
};

/**
 * Function - updates the current user's information
 *
 * @param req Request parameter
 * @param res Response parameter
 *
 * @returns a promise of Response with status code of:
 *          - 500 internal Error while updating process
 *          - 200
 */
export const updateCurrentUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userId } = req;
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};
