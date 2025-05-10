// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockPath = '/user/1';
  const mockData = { id: 1, name: 'Den' };
  let axiosCreateMock: jest.Mock;
  let axiosGetMock: jest.Mock;

  beforeEach(() => {
    axiosGetMock = jest.fn().mockResolvedValue({ data: mockData });
    axiosCreateMock = jest.fn().mockReturnValue({
      get: axiosGetMock,
    });
    (axios.create as jest.Mock) = axiosCreateMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(mockPath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(mockPath);

    expect(axiosGetMock).toHaveBeenCalledWith(mockPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(mockPath);

    expect(result).toEqual(mockData);
  });
});
