// const myBeverage = {
//   delicious: true,
//   sour: false,
// };

// describe('my beverage', () => {
//   test('is delicious', () => {
//     expect(myBeverage.delicious).toBeTruthy();
//   });

const sum = async (a: number, b: number): Promise<number> => {
  return a + b;
};

describe('sum function', () => {
  it('adds two positive values', async () => {
    expect(await sum(2, 2)).toBe(4);
  });
});
