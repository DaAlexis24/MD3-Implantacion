import createDebug from 'debug';
// import { FilmCreateDTO } from '../dto/categories.dto.js';
const debug = createDebug('movies:controller:categories');
export class CategoriesController {
    repoCategories;
    constructor(repoCategories) {
        this.repoCategories = repoCategories;
        debug('Instanciando');
    }
    makeResponse(results) {
        const data = {
            results,
            error: '',
        };
        return data;
    }
    getAll = async (_req, res, next) => {
        debug('getAll');
        try {
            const categories = await this.repoCategories.read();
            res.json(this.makeResponse(categories));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        debug('create');
        try {
            // CategoryCreateDTO.parse(req.body);
            // const newData: CategoryCreateDTO = req.body;
            const newData = req.body;
            const category = await this.repoCategories.create(newData);
            res.json(this.makeResponse([category]));
        }
        catch (error) {
            next(error);
        }
    };
}
