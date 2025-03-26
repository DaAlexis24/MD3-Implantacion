import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('movies:repository:categories');
export class CategoryRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async read() {
        debug('Reading categories');
        const categories = await this.prisma.category.findMany();
        return categories;
    }
    async readById(id) {
        debug('Reading category with id');
        const category = await this.prisma.category.findUniqueOrThrow({
            where: { id },
        });
        return category;
    }
    // async create(data: FilmCreateDTO): Promise<Film> {
    async create(data) {
        debug('Creating new category');
        const category = await this.prisma.category.create({
            data,
        });
        return category;
    }
    async update(id, data) {
        debug('Updating category with id:', id);
        const category = await this.prisma.category.update({
            where: { id },
            data,
        });
        return category;
    }
    async delete(id) {
        debug('Deleting category with id:', id);
        const category = await this.prisma.category.delete({
            where: {
                id,
            },
        });
        return category;
    }
}
