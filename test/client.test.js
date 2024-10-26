// Import necessary modules
import APIClient from '../minds/Client';
import axios from 'axios';
import { ObjectNotFound, Forbidden, Unauthorized, UnknownError } from '../minds/ExceptionHandling';

// Import mock utility functions
import { mockGet, mockError } from './mock.test'; // Adjust the path based on your folder structure

// Mock axios
jest.mock('axios');

describe('APIClient', () => {
    let apiClient;

    // Setup APIClient instance before each test
    beforeEach(() => {
        apiClient = new APIClient('your_key');
    });

    it('should successfully make a GET request and return the correct data', async () => {
        const mockResponse = { message: 'Success' };
        mockGet('/test-endpoint', mockResponse); // Use the mock utility function

        const result = await apiClient.get('/test-endpoint');

        // Improved assertion message
        expect(result).toHaveProperty('message', 'Success');
    });

    it('should throw ObjectNotFound for 404 response', async () => {
        mockError(404, 'Not found'); // Use the mock utility function

        await expect(apiClient.get('/non-existent')).rejects.toThrow(ObjectNotFound);
    });

    it('should throw Forbidden for 403 response', async () => {
        mockError(403, 'Forbidden'); // Use the mock utility function

        await expect(apiClient.get('/forbidden')).rejects.toThrow(Forbidden);
    });

    it('should throw Unauthorized for 401 response', async () => {
        mockError(401, 'Unauthorized'); // Use the mock utility function

        await expect(apiClient.get('/unauthorized')).rejects.toThrow(Unauthorized);
    });

    it('should throw UnknownError for non-specific server errors', async () => {
        mockError(500, 'Server error'); // Use the mock utility function

        await expect(apiClient.get('/server-error')).rejects.toThrow(UnknownError);
    });
});
