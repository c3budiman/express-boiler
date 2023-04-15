import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import pool from '../Utils/dbpool';
import { User } from 'src/Models/User';
import { defaultErrorHandling } from '../Utils/errorHandling';

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { username, password, roles, phone } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, password, roles, phone) VALUES (?, ?, ?, ?)', [username, hashedPassword, roles || 'user', phone]);
        const user = { result: result[0], username, roles: roles || 'user', phone };
        return res.status(201).json(user);
    } catch (error) {
        return defaultErrorHandling(res, error);
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const result = await pool.query("select * from users where username=?", [username]);
        const user = result?.[0]?.[0] as undefined as User
        return user
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (id: string) => {
    try {
        const result = await pool.query("select * from users where id=?", [id]);
        const user = result?.[0]?.[0] as undefined as User
        return user
    } catch (error) {
        throw new Error(error);
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user: User | undefined = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const payload = {
            id: user.id,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '24h' });
        return res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        return defaultErrorHandling(res,error)
    }
}