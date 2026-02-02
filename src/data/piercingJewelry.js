/**
 * Piercing jewelry options: Jewelry type → Gauge → Length (cascading selects).
 * Based on the jewelry specification table.
 */
export const piercingJewelryOptions = [
  {
    jewelry: "Curve",
    gauges: [
      { gauge: "14G", lengths: ["7/16"] },
      { gauge: "16G", lengths: ["3/8", "5/8"] },
    ],
  },
  {
    jewelry: "Labret",
    gauges: [
      { gauge: "14G", lengths: ["7/16"] },
      { gauge: "16G", lengths: ["3/8", "1/4", "1/2"] },
    ],
  },
  {
    jewelry: "Nose Corkscrew",
    gauges: [{ gauge: "19G", lengths: ["3/16"] }],
  },
  {
    jewelry: "Circular",
    gauges: [{ gauge: "16G", lengths: ["3/8"] }],
  },
  {
    jewelry: "Nipple Straight bar",
    gauges: [
      { gauge: "14G", lengths: ["1/2"] },
      { gauge: "16G", lengths: ["5/8"] },
    ],
  },
  {
    jewelry: "Tongue Straight bar",
    gauges: [{ gauge: "14G", lengths: ["3/4"] }],
  },
  {
    jewelry: "Ear Stud",
    gauges: [{ gauge: "20G", lengths: [] }],
  },
  {
    jewelry: "Industrial straight bar",
    gauges: [
      { gauge: "14G", lengths: ["1 3/4 in"] },
      { gauge: "16G", lengths: [] },
    ],
  },
  {
    jewelry: "Staple Bar",
    gauges: [{ gauge: "16G", lengths: ["10mm", "12mm"] }],
  },
];
