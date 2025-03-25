import { PrismaClient } from '@prisma/client';
import { FilmRepo } from './films.repository';
import { vi } from 'vitest';
import { FilmCreateDTO } from '../dto/films.dto';

vi.mock('@prisma/client', () => ({
    PrismaClient: class {
        constructor() {
            this.film = {
                findMany: vi.fn().mockResolvedValue([]),
                findUniqueOrThrow: vi.fn().mockResolvedValue({
                    categories: [],
                }),
                create: vi.fn().mockResolvedValue({}),
                update: vi.fn().mockResolvedValue({
                    categories: [],
                }),
                delete: vi.fn().mockResolvedValue({}),
            };
        }
    },
}));

describe('Given class FilmRepo', () => {
    let filmRepo: FilmRepo;
    beforeAll(() => {
        // Arrange
        filmRepo = new FilmRepo();
        // Mockear para justificar el test
        filmRepo.prisma = {
            film: {
                // Mock de los métodos de Prisma
                findMany: vi.fn().mockResolvedValue([]),
                findUniqueOrThrow: vi.fn().mockResolvedValue({
                    categories: [],
                }),
                create: vi.fn().mockResolvedValue({}),
                update: vi.fn().mockResolvedValue({
                    categories: [],
                }),
                delete: vi.fn().mockResolvedValue({}),
            },
        } as unknown as PrismaClient;
    });
    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            // Arrange: const filmRepo = new FilmRepo();
            // Act - Assert
            expect(filmRepo).toBeDefined();
        });
        test('Then it should be a instance of FilmRepo', () => {
            // Act - Assert
            expect(filmRepo).toBeInstanceOf(FilmRepo);
        });
    });
    describe('When READ is called', () => {
        test('Then... ', async () => {
            // Act
            const result = await filmRepo.read();
            // Assert
            expect(result).toStrictEqual([]);
            expect(filmRepo.prisma.film.findMany).toHaveBeenCalled();
        });
    });
    describe('When READ by ID is called', () => {
        test('Then it should return info about 1 film ', async () => {
            // Act
            const result = await filmRepo.readById('1');
            // Assert
            expect(result).toStrictEqual({});
            expect(filmRepo.prisma.film.findUniqueOrThrow).toHaveBeenCalled();
        });
    });
    describe('When CREATE is called', () => {
        test('Then it should return a Film', async () => {
            // Act
            const result = await filmRepo.create({} as FilmCreateDTO);
            // Assert
            expect(result).toStrictEqual({});
            expect(filmRepo.prisma.film.create).toHaveBeenCalled();
        });
    });
    describe('When UPDATE is called', () => {
        test('Then it should return a Film with new information', async () => {
            // Act
            const result = await filmRepo.update('1', {} as FilmCreateDTO);
            // Assert
            expect(result).toStrictEqual({});
            expect(filmRepo.prisma.film.update).toHaveBeenCalled();
        });
    });
    describe('When toggleCategory is called', () => {
        test('Then it should return a Film with new information', async () => {
            // Act
            const result = await filmRepo.update('1', {} as FilmCreateDTO);
            // Assert
            expect(result).toStrictEqual({});
            expect(filmRepo.prisma.film.update).toHaveBeenCalled();
        });
    });
    describe('When DELETE is called', () => {
        test('Then it should return a Film', async () => {
            // Act
            const result = await filmRepo.delete('1');
            // Assert
            expect(result).toStrictEqual({});
            expect(filmRepo.prisma.film.delete).toHaveBeenCalled();
        });
    });
});
