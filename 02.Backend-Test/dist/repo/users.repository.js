import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('movies:repository:users');
export class UsersRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async read() {
        debug('Reading reviews');
        const users = await this.prisma.user.findMany({});
        return users;
        // return await this.prisma.review.findMany();
    }
    async readById(id) {
        debug('Reading user with id');
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id },
        });
        return user;
    }
    async getByEmail(email) {
        debug('Getting user by email:', email);
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async create(data) {
        debug('Creating new user');
        const user = await this.prisma.user.create({
            data,
            omit: {
                password: true,
            },
        });
        return user;
    }
    async update(id, data) {
        debug('Updating user with id:', id);
        const user = await this.prisma.user.update({
            where: { id },
            data,
            omit: {
                password: true,
            },
        });
        return user;
    }
    async delete(id) {
        debug('Deleting user with id:', id);
        const user = await this.prisma.user.delete({
            where: { id },
            omit: {
                password: true,
            },
        });
        return user;
    }
}
