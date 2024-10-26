// Import necessary modules
import DatasourcesService from './DatasourcesService';
import { ObjectNotFound, ObjectNotSupported } from './ExceptionHandling';
import axios from 'axios';

// Import mock utility functions
import { mockGet, mockPost, mockDelete, mockError } from './mock.test'; // Adjust the path based on your folder structure

jest.mock('axios'); // Mocking axios

describe('DatasourcesService', () => {
    let api;
    let datasourcesService;

    // Set up the mocked API and the service instance before each test
    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
        };
        datasourcesService = new DatasourcesService(api);
    });

    it('should create a new datasource successfully', async () => {
        const mockDatasource = { name: 'my_datasource', engine: 'postgres' };
        mockPost('/datasources', mockDatasource); // Use the mock utility function
        // Alternatively, if `create` internally uses `post`, just simulate the expected behavior
        // You can adjust as necessary based on how your method is set up.

        const datasource = await datasourcesService.create(mockDatasource);

        // Expectations
        expect(datasource.name).toBe('my_datasource');
        expect(api.post).toHaveBeenCalledWith('/datasources', mockDatasource);
    });

    it('should list all datasources successfully', async () => {
        const mockResponse = {
            data: [
                { name: 'datasource1', engine: 'postgres' },
                { name: 'datasource2', engine: 'mysql' }
            ]
        };
        mockGet('/datasources', mockResponse); // Use the mock utility function

        const datasources = await datasourcesService.list();

        // Expectations
        expect(datasources.length).toBe(2);
        expect(datasources[0].name).toBe('datasource1');
        expect(datasources[1].engine).toBe('mysql');
    });

    it('should get a datasource by name successfully', async () => {
        const mockDatasource = { name: 'my_datasource', engine: 'postgres' };
        mockGet('/datasources/my_datasource', mockDatasource); // Use the mock utility function

        const datasource = await datasourcesService.get('my_datasource');

        // Expectations
        expect(datasource.name).toBe('my_datasource');
        expect(datasource.engine).toBe('postgres');
    });

    it('should delete a datasource by name successfully', async () => {
        mockDelete('/datasources/my_datasource'); // Use the mock utility function

        await datasourcesService.drop('my_datasource');

        // Expectations
        expect(api.delete).toHaveBeenCalledWith('/datasources/my_datasource');
    });

    it('should throw ObjectNotSupported for an unsupported datasource type', async () => {
        const mockDatasource = { name: 'my_datasource', engine: null };
        mockGet('/datasources/my_datasource', mockDatasource); // Use the mock utility function

        await expect(datasourcesService.get('my_datasource')).rejects.toThrow(ObjectNotSupported);
    });
});
