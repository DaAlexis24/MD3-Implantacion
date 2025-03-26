import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SALTS = 10;
export class AuthService {
    static async hashPassword(password) {
        return hash(password, SALTS);
    }
    static async comparePassword(password, hash) {
        return compare(password, hash);
    }
    static async generateToken(payload) {
        const secret = process.env.JWT_SECRET;
        return jwt.sign(payload, secret);
    }
    static async verifyToken(token) {
        const secret = process.env.JWT_SECRET;
        const result = jwt.verify(token, secret);
        if (typeof result === 'string') {
            throw new Error('Token no válido');
        }
        return result;
    }
}
