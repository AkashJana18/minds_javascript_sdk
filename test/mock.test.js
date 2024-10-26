// mock.test.js
import axios from 'axios';

const mockApiResponse = (status, data) => {
    return { response: { status, data: { message: data } } };
};

const mockGet = (url, mockResponse) => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });
};

const mockPost = (url, mockResponse) => {
    axios.post.mockResolvedValueOnce(mockResponse);
};

const mockDelete = (url) => {
    axios.delete.mockResolvedValueOnce({});
};

const mockError = (status, message) => {
    axios.get.mockRejectedValueOnce(mockApiResponse(status, message));
};
// Placeholder test to ensure Jest runs this file
test('placeholder test', () => {
    expect(true).toBe(true);
  });
export { mockGet, mockPost, mockDelete, mockError };
