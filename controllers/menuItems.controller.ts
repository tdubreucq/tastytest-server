import { Request, Response } from 'express';
import { pool } from '../config/database';
import { QueryResult } from 'pg';

export const getEntries = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"MenuItem\"');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getAppetizers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"MenuItem\" WHERE type = \'entry\'');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getMains = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"MenuItem\" WHERE type = \'main\'');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getDesserts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"MenuItem\" WHERE type = \'dessert\'');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getDrinks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM \"MenuItem\" WHERE type = \'drink\'');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getItemById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM \"MenuItem\" WHERE item_id = $1', [id]);
        return res.status(200).json(response.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const {title, description, vegetarian, price, type} = req.body;
        const response = await pool.query('INSERT INTO \"MenuItem\" (title, description, vegetarian, price, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, vegetarian, price, type]);

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

export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const {title, description, vegetarian, price, type} = req.body;

        const response = await pool.query('UPDATE \"MenuItem\" SET title = $2, description = $3, vegetarian = $4, price = $5, type = $6 WHERE item_id = $1', [
            id,
            title,
            description,
            vegetarian,
            price,
            type
        ]);
        res.json({
            message: `User ${id} updated successfully`,
            body: {},
            ok: true
        })

    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM \"MenuItem\" where item_id = $1', [
            id
        ]);
        res.json({
            message: `Menu item ${id} deleted Successfully`,
            body: {},
            ok: true
        })
    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};

export const addExistingOptionToItem = async (req: Request, res: Response) => {
    try {
        const {item_id, option_id} = req.body;
        const response = await pool.query('INSERT INTO \"ItemOptions\" (item_id, option_id) VALUES ($1, $2)',
            [item_id, option_id]);

        res.json({
            message: 'Item Added successfully',
            body: {},
            ok: true
        })
    }
    catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};

export const deleteOptionFromItem = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const optionId = parseInt(req.params.optionId);

        await pool.query('DELETE FROM \"ItemOptions\" WHERE item_id = $1 AND OPTION_ID = $2', [
            itemId, optionId
        ]);
        res.json({
            message: `Option ${optionId} deleted successfully from Item ${itemId}`,
            body: {},
            ok: true
        })

    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
};