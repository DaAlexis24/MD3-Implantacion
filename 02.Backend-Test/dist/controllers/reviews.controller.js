import createDebug from 'debug';
import { ReviewCreateDTO, ReviewUpdateDTO } from '../dto/reviews.dto.js';
const debug = createDebug('movies:controller:reviews');
export class ReviewsController {
    repoReviews;
    constructor(repoReviews) {
        this.repoReviews = repoReviews;
        debug('Instanciando');
    }
    makeResponse(results) {
        const data = {
            results,
            error: '',
        };
        return data;
    }
    getAll = async (req, res, next) => {
        debug('getAll');
        try {
            const reviews = await this.repoReviews.read();
            res.json(this.makeResponse(reviews));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        debug('getById');
        try {
            const { id } = req.params;
            const review = await this.repoReviews.readById(id);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        debug('create');
        try {
            ReviewCreateDTO.parse(req.body);
            req.body.userId = req.user.id;
            const newData = req.body;
            const review = await this.repoReviews.create(newData);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        debug('update');
        try {
            const { id } = req.params;
            const newData = req.body;
            ReviewUpdateDTO.parse(req.body);
            const review = await this.repoReviews.update(id, newData);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        debug('delete');
        try {
            const { id } = req.params;
            const review = await this.repoReviews.delete(id);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
}
