// Supplied BOBII BALL Chinese presentation (2026-11-11), page 13.
// Certificate images are extracted from the source PDF, without changing their content.
export const bobiiPatents = [
  { number: "ZL 2025 1 0066934.3", type: "Invention patent", asset: "2025-1-0066934-3" },
  { number: "ZL 2025 2 0655162.2", type: "Utility model patent", asset: "2025-2-0655162-2" },
  { number: "ZL 2025 2 2014729.0", type: "Utility model patent", asset: "2025-2-2014729-0" },
  { number: "ZL 2024 3 0499229.9", type: "Design patent", asset: "2024-3-0499229-9" },
  { number: "ZL 2024 3 0495889.X", type: "Design patent", asset: "2024-3-0495889-x" },
  { number: "ZL 2024 3 0499217.6", type: "Design patent", asset: "2024-3-0499217-6" },
  { number: "ZL 2024 3 0499221.2", type: "Design patent", asset: "2024-3-0499221-2" },
  { number: "ZL 2024 3 0495885.1", type: "Design patent", asset: "2024-3-0495885-1" },
] as const;

export type BobiiPatent = (typeof bobiiPatents)[number];
