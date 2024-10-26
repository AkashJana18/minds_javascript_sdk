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
        // Mock API methods for GET, POST, and DELETE
        api = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
        };
        // Initialize MindsService with the mocked API
        mindsService = new MindsService(api);
    });

    // Test case: should successfully create a new mind
    it('should create a new mind', async () => {
        const mockMind = { name: 'my_mind', modelName: 'gpt-3' };
        // Mock the API responses for GET and POST
        api.get.mockResolvedValueOnce({ data: mockMind });
        api.post.mockResolvedValueOnce({});

        // Call the create method of the MindsService
        const mind = await mindsService.create('my_mind', { modelName: 'gpt-3' });

        // Validate that the correct name is returned and the POST method was called with expected arguments
        expect(mind.name).toBe('my_mind');
        expect(api.post).toHaveBeenCalledWith('/projects/mindsdb/minds', expect.any(Object));
    });

    // Test case: should list all minds
    it('should list all minds', async () => {
        const mockResponse = [{ name: 'mind1' }, { name: 'mind2' }];
        // Mock the GET API response
        api.get.mockResolvedValueOnce({ data: mockResponse });

        // Call the list method of the MindsService
        const minds = await mindsService.list();

        // Validate that the correct number of minds is returned and their names are as expected
        expect(minds.length).toBe(2);
        expect(minds[0].name).toBe('mind1');
    });

    // Test case: should get a mind by name
    it('should get a mind by name', async () => {
        const mockMind = { name: 'my_mind', modelName: 'gpt-3' };
        // Mock the GET API response for fetching a specific mind
        api.get.mockResolvedValueOnce({ data: mockMind });

        // Call the get method of the MindsService
        const mind = await mindsService.get('my_mind');

        // Validate that the returned mind has the expected name
        expect(mind.name).toBe('my_mind');
    });

    // Test case: should delete a mind by name
    it('should delete a mind by name', async () => {
        // Mock the DELETE API response
        api.delete.mockResolvedValueOnce({});

        // Call the drop method of the MindsService
        await mindsService.drop('my_mind');

        // Validate that the DELETE method was called with the correct URL
        expect(api.delete).toHaveBeenCalledWith('/projects/mindsdb/minds/my_mind');
    });
});
