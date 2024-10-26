// Import MindsService and axios for mocking API requests
import MindsService from '../minds/Minds ';
import axios from 'axios';

// Mock axios to simulate API calls during tests without actually making real HTTP requests
jest.mock('axios');

describe('MindsService', () => {
    let api;
    let mindsService;

    // Set up a mock API interface and instantiate the MindsService before each test
    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
        };
        mindsService = new MindsService(api);
    });

    // Test case: should successfully create a new mind
    it('should create a new mind', async () => {
        const mockMind = { name: 'demo_mind', modelName: 'gpt-3' };
        api.get.mockResolvedValueOnce({ data: mockMind });
        api.post.mockResolvedValueOnce({});

        const mind = await mindsService.create('demo_mind', { modelName: 'gpt-3' });

        expect(mind.name).toBe('demo_mind');
        expect(api.post).toHaveBeenCalledWith('/projects/mindsdb/minds', expect.any(Object));
    });

    // Test case: should list all minds
    it('should list all minds', async () => {
        const mockResponse = [{ name: 'mind1' }, { name: 'mind2' }];
        api.get.mockResolvedValueOnce({ data: mockResponse });

        const minds = await mindsService.list();

        expect(minds.length).toBe(2);
        expect(minds[0].name).toBe('mind1');
    });

    // Test case: should get a mind by name
    it('should get a mind by name', async () => {
        const mockMind = { name: 'demo_mind', modelName: 'gpt-3' };
        api.get.mockResolvedValueOnce({ data: mockMind });

        const mind = await mindsService.get('demo_mind');

        expect(mind.name).toBe('demo_mind');
    });

    // Test case: should delete a mind by name
    it('should delete a mind by name', async () => {
        api.delete.mockResolvedValueOnce({});

        await mindsService.drop('demo_mind');

        expect(api.delete).toHaveBeenCalledWith('/projects/mindsdb/minds/demo_mind');
    });

    // Test case: should handle API error when creating a mind
    it('should handle error when creating a mind', async () => {
        const errorMessage = 'Failed to create mind';
        api.post.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

        await expect(mindsService.create('demo_mind', { modelName: 'gpt-3' })).rejects.toThrow(errorMessage);
    });
});
