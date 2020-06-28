import {Request, Response} from "express";
import {QueryResult} from "pg";
import {pool} from "../config/database";

export const getOptions = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"Options\"');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getOptionsByItemId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT "Options".title, "Options".id, "ItemOptions".item_id\n'+
            'FROM "ItemOptions"\n'+
            'INNER JOIN "Options"\n'+
            'ON "Options".id = "ItemOptions".option_id\n'+
            'WHERE "ItemOptions".item_id = $1\n', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getOptionChoices = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT "Options".title, "Choices".option_id, "Choices".choice_title, "Choices".choice_id\n'+
            'FROM "Choices"\n'+
            'INNER JOIN "Options"\n'+
            'ON "Choices".option_id = "Options".id\n'+
            'WHERE "Options".id = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const createOption = async (req: Request, res: Response) => {
    try {
        const {title} = req.body;
        const response = await pool.query('INSERT INTO \"Options\" (title) VALUES ($1) RETURNING *',
            [title]);

        res.json({
            message: 'Item Added successfully',
            body: {
                item: response.rows[0]
            },
            ok: true
        })
    }
    catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};

export const deleteOption = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM \"Options\" where id = $1', [
            id
        ]);
        res.json(`Option ${id} deleted successfully`);
    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};