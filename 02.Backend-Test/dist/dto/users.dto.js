import createDebug from 'debug';
const debug = createDebug('movies:dto:users');
debug('Loaded module');
import { z } from 'zod';
export const UserCreateDTO = z
    .object({
    email: z.string().email().nonempty(),
    handleName: z.string().min(3).optional(),
    password: z.string().min(5).nonempty(),
    firstName: z.string().min(3).nonempty(),
    lastName: z.string().min(3).nonempty(),
})
    .strict();
export const UserLoginDTO = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(5).nonempty(),
});
