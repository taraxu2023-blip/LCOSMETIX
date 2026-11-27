import { company } from "./company";

// Coordinates are approximate contact-region markers, not building-level geocoding.
// Guangzhou and Hong Kong: supplied previous-site screenshot.
// Singapore: newer confirmed workbook address, shared with the company record.
// South Korea replaces London at the user's request; city and address are unknown.
export const companyLocations = [
  {
    id: "guangzhou", city: "Guangzhou", country: "China", countryCode: "CN", scope: "city",
    address: "Room 1424, Poly Clover Plaza, Huasui Road No. 406, Tianhe District, Guangzhou, China",
    postalCode: "510600", longitude: 113.2644, latitude: 23.1291,
    labelX: 720, labelY: 115,
  },
  {
    id: "hong-kong", city: "Hong Kong", country: "Hong Kong", countryCode: "HK", scope: "city",
    address: "Unit 2A, 17/F, Glenealy Tower, No. 1 Glenealy, Central, Hong Kong",
    postalCode: null, longitude: 114.1694, latitude: 22.3193,
    labelX: 850, labelY: 260,
  },
  {
    id: "singapore", city: "Singapore", country: "Singapore", countryCode: "SG", scope: "city",
    address: company.address,
    postalCode: "169874", longitude: 103.8198, latitude: 1.3521,
    labelX: 700, labelY: 432,
  },
  {
    id: "south-korea", city: "South Korea", country: "South Korea", countryCode: "KR", scope: "country",
    address: null,
    postalCode: null, longitude: 127.75, latitude: 36.5,
    labelX: 900, labelY: 60,
  },
] as const;

export function projectLocation(longitude: number, latitude: number) {
  return { x: (longitude + 180) / 360 * 1000, y: (85 - latitude) / 145 * 520 };
}
