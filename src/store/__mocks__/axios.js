export default {
  get: jest.fn(url => Promise.resolve([{ name: 'Mocky' }])),
}
