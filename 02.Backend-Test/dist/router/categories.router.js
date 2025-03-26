import { Router } from 'express';
import createDebug from 'debug';
import { Role } from '@prisma/client';
const debug = createDebug('movies:router:categories');
export const createCategoriesRouter = (authInterceptor, categoriesController) => {
    debug('Ejecutando createCategoriesRouter');
    const categoriesRouter = Router();
    categoriesRouter.get('/', categoriesController.getAll);
    categoriesRouter.post('/', authInterceptor.authenticate, authInterceptor.hasRole(Role.EDITOR), categoriesController.create);
    return categoriesRouter;
};
