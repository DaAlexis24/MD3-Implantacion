import { Router } from 'express';
import createDebug from 'debug';
const debug = createDebug('movies:router:reviews');
export const createReviewsRouter = (authInterceptor, reviewsController) => {
    debug('Ejecutando createReviewsRouter');
    const reviewsRouter = Router();
    reviewsRouter.get('/', authInterceptor.authenticate, reviewsController.getAll);
    reviewsRouter.get('/:id', authInterceptor.authenticate, reviewsController.getById);
    reviewsRouter.post('/', authInterceptor.authenticate, reviewsController.create);
    reviewsRouter.patch('/:id', authInterceptor.authenticate, authInterceptor.isOwnerReview, reviewsController.update);
    reviewsRouter.delete('/:id', authInterceptor.authenticate, authInterceptor.isOwnerReview, reviewsController.delete);
    return reviewsRouter;
};
