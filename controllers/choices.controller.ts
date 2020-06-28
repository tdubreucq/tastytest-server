import {Request, Response} from "express";
import {pool} from "../config/database";

export const createChoice = async (req: Request, res: Response) => {
    try {
        const {choice_title, option_id} = req.body;
        const response = await pool.query('INSERT INTO \"Choices\" (choice_title, option_id) VALUES ($1, $2)',
            [choice_title, option_id]);

        res.json({
            message: 'Item Added successfully',
            ok: true
        })
    }
    catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};

export const deleteChoices = async (req: Request, res: Response) => {
    try {
        const optionid = parseInt(req.params.id);
        await pool.query('DELETE FROM \"Choices\" where option_id = $1', [
            optionid
        ]);
        res.json(`Choices from Option ${optionid} deleted successfully`);
    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};