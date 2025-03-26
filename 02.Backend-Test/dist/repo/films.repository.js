import createDebug from 'debug';
const debug = createDebug('movies:repository:films');
export class FilmRepo {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        debug('Instanciando');
        // console.log(this.prisma);
    }
    async read() {
        debug('Reading films');
        const films = await this.prisma.film.findMany({
            include: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return films;
        // return await this.prisma.film.findMany();
    }
    async readById(id) {
        debug('Reading film with id');
        const film = await this.prisma.film.findUniqueOrThrow({
            where: { id },
            include: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return film;
    }
    // async create(data: Omit<Film, 'id'>): Promise<Film> {
    async create(data) {
        debug('Creating new film');
        const { categories, ...rest } = data;
        const finalData = {
            ...rest,
            categories: {
                // create: categories?.map((name) => ({ name })),
                connect: categories?.map((name) => ({ name })),
                // connectOrCreate: categories?.map((name) => ({
                //     where: { name },
                //     create: { name },
                // })),
            },
        };
        const film = await this.prisma.film.create({
            data: finalData,
            include: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return film;
    }
    async update(id, data) {
        debug('Updating film with id:', id);
        const film = await this.prisma.film.update({
            where: { id },
            data,
        });
        return film;
    }
    async toggleCategory(id, name) {
        debug('Toggling category for film with id:', id);
        const { categories } = await this.prisma.film.findUniqueOrThrow({
            where: { id },
            select: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        const hasCategory = categories.map((item) => item.name).includes(name);
        const film = await this.prisma.film.update({
            where: { id },
            data: {
                categories: hasCategory
                    ? {
                        disconnect: {
                            name,
                        },
                    }
                    : {
                        connect: {
                            name,
                        },
                    },
            },
            include: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return film;
    }
    async delete(id) {
        debug('Deleting film with id:', id);
        const film = await this.prisma.film.delete({
            where: {
                id,
            },
        });
        return film;
    }
}
