import { Request, Response } from 'express';

// Generická funkcia na porovnanie objektov
export function getObject<T>(
    items: T[],
    compareFn: (item: T) => boolean,
    res: Response
): T | null {
    const item = items.find(item => compareFn(item));

    if (!item) {
        res.status(404).send('Object not found');
        return null;
    }

    return item;
}

// Validácia emailu z parametrov
export function getValidEmail(req: Request, res: Response): string | null {
    const email = req.params.email;

    if (!email || !email.includes('@')) {
        res.status(400).send('Invalid email');
        return null;
    }

    return email;
}