import { AuthInterceptor } from './auth.interceptor';
import { vi } from 'vitest';
import { HttpError } from '../types/http-error';
import { AuthService } from '../services/auth.service';
const { debugMock } = vi.hoisted(() => ({ debugMock: vi.fn() }));
vi.mock('debug', () => ({
    default: () => debugMock,
}));
vi.mock('../services/auth.service');
describe('Given te class AuthInterceptor', () => {
    // Arrange
    const repoReviews = {};
    // act
    const interceptor = new AuthInterceptor(repoReviews);
    // Assert
    const req = {
        headers: {},
    };
    const res = {};
    const nextMock = vi.fn();
    const mockError = new HttpError('Token not found', 401, 'Unauthorized');
    describe.skip('When it is initialized', () => {
        test('Then it should call debug', () => {
            expect(debugMock).toHaveBeenCalled();
        });
    });
    describe.skip('When authenticate is called', () => {
        test('Then it should detect a MALFORMED token', async () => {
            await interceptor.authenticate(req, res, nextMock);
            // Assert
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
        test('Then it should detect a VALID token', async () => {
            // Arrange
            req.headers = { authorization: 'Bearer token' };
            // Act
            await interceptor.authenticate(req, res, nextMock);
            // Assert
            expect(nextMock).toHaveBeenCalledWith();
        });
        test('Then it should detect a INVALID token', async () => {
            // Arrange
            AuthService.verifyToken.mockRejectedValueOnce(new Error('Invalid token'));
            const httpError = new HttpError('Invalid token', 401, 'Unauthorized');
            req.headers = { authorization: 'Bearer token' };
            // Act
            await interceptor.authenticate(req, res, nextMock);
            // Assert
            expect(nextMock).toHaveBeenCalledWith(httpError);
        });
    });
    describe('When hasRole is called', () => {
        // Arrange
        const role = 'ADMIN';
        // Act
        // interceptor.hasRole(role)(req, res, nextMock) -> devuelve un callback
        const interceptorRole = interceptor.hasRole(role);
        interceptorRole(req, res, nextMock);
        test('Then it should detect a user with ADMIN ROLE', () => {
            req.user = { role: 'ADMIN' };
            // Assert
            expect(nextMock).toHaveBeenCalledWith();
        });
        test('Then it should detect a user with INVALID ROLE', () => {
            req.user = { role: 'MEMBER' };
            // Assert
            expect(nextMock).toHaveBeenCalledWith(new HttpError('You do not have permission', 403, 'Forbidden'));
        });
        test('Then it should detect a user with NO ROLE', () => {
            req.user = {};
            // Assert
            expect(nextMock).toHaveBeenCalledWith(new HttpError('You do not have permission', 403, 'Forbidden'));
        });
    });
    describe.skip('When isUser is called', () => {
        test('Then ');
    });
    describe.skip('When isOwnerReview is called', () => {
        test('Then ');
    });
});
