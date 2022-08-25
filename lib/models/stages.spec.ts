import { CalculateStage1 } from './stages';
import { SummerDefault1Loaf, SummerDefault2Loaf, WinterDefault1Loaf, WinterDefault2Loaf } from './default-states';

const S = SummerDefault1Loaf();
const S2 = SummerDefault2Loaf();
const W = WinterDefault1Loaf();
const W2 = WinterDefault2Loaf();

describe('stage 1', () => {
  it('summer percent', () => {
    // const res = CalculateStage1({...S.stage1, desiredWeight: 25});
    // expect(res.flour_g).toBe(13.020833333333332);
    // expect(res.water_g).toBe(10.416666666666666);
    // expect(res.starter_g).toBe(1.5624999999999998);
  })
//   it('winter percent', () => {
//     const res = CalculateStage1({...W.stage1, desiredWeight: 25});
//     expect(res.flour_g).toBe(12.5);
//     expect(res.water_g).toBe(10);
//     expect(res.starter_g).toBe(6.25);
//   })
//   it('invert check', () => {
//     const input = { flourWeightG: 25, hydrationPercent: 0.80, starterPercent: 0.50 }
//     const output = CalculateStage1(input);
//     const inputCalculated = Invert_CalculateStage1(output);
//     expect(inputCalculated).toMatchObject(input);
//   })
// });

// describe('stage 2', () => {
//   it('summer percent', () => {
//     const res = CalculateStage1(S2.stage2);
//     expect(res.flour_g).toBe(215);
//     expect(res.water_g).toBe(159.96);
//     expect(res.starter_g).toBe(10.75);
//   })
//   it('winter percent', () => {
//     const res = CalculateStage2(W2.stage2);
//     expect(res.flour_g).toBe(215);
//     expect(res.water_g).toBe(159.96);
//     expect(res.starter_g).toBe(43);
//   })
// });

// describe('stage 3', () => {
//   it('all year round', () => {
//     const res = CalculateStage3(S2.stage3);
//     expect(res.flour_g).toBe(640);
//     expect(res.water_g).toBe(480);
//     expect(res.starter_g).toBe(375);
//     expect(res.salt_g).toBe(15);
//   })
});
