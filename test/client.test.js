// Import necessary modules
import APIClient from '../services/client/APIClient';
import axios from 'axios';
import { ObjectNotFound, Forbidden, Unauthorized, UnknownError } from '../models/Exceptions';

// Mock axios
jest.mock('axios');

describe('APIClient', () => {
    let apiClient;

    // Setup APIClient instance before each test
    beforeEach(() => {
        apiClient = new APIClient('your_key');
    });

    it('should successfully make a GET request and return the correct data', async () => {
        const mockResponse = { data: { message: 'Success' }, status: 200 };
        axios.get.mockResolvedValueOnce(mockResponse);

        const result = await apiClient.get('/test-endpoint');

        // Improved assertion message
        expect(result).toHaveProperty('message', 'Success');
    });

    it('should throw ObjectNotFound for 404 response', async () => {
        const mockError = { response: { status: 404, data: { message: 'Not found' } } };
        axios.get.mockRejectedValueOnce(mockError);

        // Improved description for expected exception
        await expect(apiClient.get('/non-existent')).rejects.toThrow(ObjectNotFound);
    });

    it('should throw Forbidden for 403 response', async () => {
        const mockError = { response: { status: 403, data: { message: 'Forbidden' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/forbidden')).rejects.toThrow(Forbidden);
    });

    it('should throw Unauthorized for 401 response', async () => {
        const mockError = { response: { status: 401, data: { message: 'Unauthorized' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/unauthorized')).rejects.toThrow(Unauthorized);
    });

    it('should throw UnknownError for non-specific server errors', async () => {
        const mockError = { response: { status: 500, data: { message: 'Server error' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/server-error')).rejects.toThrow(UnknownError);
    });
});
