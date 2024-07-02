import rateLimiterMock from "@root/src/__mocks__/rateLimit";
import checkAuthenticationMock from '@root/src/__mocks__/checkAuthentication';

jest.mock('@lib/rateLimit', () => {
    return jest.fn(rateLimiterMock)
});

jest.mock('@middlewares/checkAuthentication', () => {
    return jest.fn(checkAuthenticationMock)
});

export { }