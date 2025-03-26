import { Router } from 'express';
import createDebug from 'debug';
import { Role } from '@prisma/client';
const debug = createDebug('movies:router:films');
export const createFilmsRouter = (authInterceptor, filmsController) => {
    debug('Ejecutando createFilmsRouter');
    const filmsRouter = Router();
    filmsRouter.get('/', filmsController.getAll);
    filmsRouter.get('/:id', filmsController.getById);
    filmsRouter.post('/', authInterceptor.authenticate, authInterceptor.hasRole(Role.EDITOR), filmsController.create);
    filmsRouter.patch('/:id', authInterceptor.authenticate, authInterceptor.hasRole(Role.EDITOR), filmsController.update);
    filmsRouter.patch('/:id/category/:name', authInterceptor.authenticate, authInterceptor.hasRole(Role.EDITOR), filmsController.toggleCategory);
    filmsRouter.delete('/:id', authInterceptor.authenticate, authInterceptor.hasRole(Role.EDITOR), filmsController.delete);
    return filmsRouter;
};
