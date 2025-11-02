import { Request, Response } from 'express';
import { Storage } from '../storage/Storage';
import { User } from '../classes/User';
import { getObject, getValidEmail } from '../utils/validation.utils';

const storage = Storage.getInstance();

// GET všetkých používateľov
export const getAllUsers = (req: Request, res: Response) => {
    res.send(storage.getAllUsers());
}

// GET používateľa podľa emailu
export const getUserByEmail = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const user = getObject(
        storage.getAllUsers(),
        (u) => u['email'] === email,
        res
    );
    if (!user) return;

    res.send(user);
}

// POST - vytvorenie nového používateľa
export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).send('Name and email are required');
        return;
    }

    const user = new User(name, email);
    storage.addUser(user);
    res.status(201).send({ message: 'User created', email: user['email'] });
}

// PUT - aktualizácia používateľa
export const updateUserByEmail = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const user = getObject(
        storage.getAllUsers(),
        (u) => u['email'] === email,
        res
    );
    if (!user) return;

    if (req.body.name) {
        user['name'] = req.body.name;
    }

    res.send({ message: 'User updated' });
}

// DELETE - zmazanie používateľa
export const deleteUserByEmail = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const user = getObject(
        storage.getAllUsers(),
        (u) => u['email'] === email,
        res
    );
    if (!user) return;

    storage.deleteUserByEmail(email);
    res.send({ message: 'User deleted' });
}