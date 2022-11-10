import { getApiKey } from "../../utils/consts";
import cachedCabins from "../../data/cabins.json";

export type Cabin = CabinT & ExtraData & Gallery;

export interface Gallery {
  gallery: Picture[];
}

export interface Picture {
  uid: string;
  description: string | null;
  url: string;
  displayOrder: number;
  airbnbRoomId: null;
}

export interface CabinT {
  pricingRules: PricingRules | null;
  bedCount: number;
  bedTypes: { [key: string]: number };
  type: string;
  name: string;
  isActive: boolean;
  baseGuests: number;
  maximumGuests: number;
  baseDailyRate: number;
  city: string;
  state: string;
  address1: string;
  address2: string;
  postalCode: string;
  countryCode: string;
  bedrooms: number;
  bathrooms: string;
  picture: string;
  webLink: string;
  cleaningFeeAmount: number;
  minimumStay: number;
  maximumStay: number;
  securityDepositAmount: number;
  externalID: string;
  acceptInstantBook: boolean;
  acceptBookingRequest: boolean;
  availabilityCalendarUrl: string;
  rentalCondition: string | null;
  cancellationPolicy: string | null;
  floor: number;
  areaSize: number;
  areaSizeUnit: string;
  extraGuestFee: number;
  taxationRate: number;
  latitude: number;
  longitude: number;
  airBnBID: string;
  homeAwayID: null;
  currency: string;
  currencySymbol: string;
  panoramicDataUrl: null;
  propertyURL: string;
  guideBookUrl: string | null;
  weekEndRatePercentAdjustment: number;
  bookingWindow: number;
  bookingWindowAfterCheckout: number;
  turnOverDays: number;
  bookingLeadTime: number;
  defaultCheckinTime: number;
  defaultCheckoutTime: number;
  wifiNetwork: string;
  wifiPassword: string;
  rentalLicenseNumber: string;
  rentalLicenseNumberExpirationDate: null;
  minimumWeekendStay: number;
  reviews: Reviews;
  createdDate: number;
  percentUponReservation: number;
  fullPaymentTiming: number;
  listingLinks: ListingLinks;
  uid: string;
}

export interface ListingLinks {
  airbnbUrl: string | null;
  hostfullyUrl: string;
  bookingDotComUrl: string | null;
  homeAwayUrl: string | null;
  tripAdvisorUrl: null;
  hvmiUrl: null;
}

export interface PricingRules {
  increaseRate: number;
  increaseRateLowerBound: number;
  decreaseRate: number;
  decreaseRateHigherBound: number;
}

export interface Reviews {
  total: number;
  average: null | number;
}

export interface ExtraData {
  "basic-info": BasicInfo;
  description: string;
  amenities: Amenity[];
  uid: string;
}

export interface BasicInfo {
  highlight: Highlight[];
  other: Other[];
}

export interface Highlight {
  text: string;
  icon: string;
}

export interface Other {
  icon: string;
  title: string;
  text: string;
}

export interface Amenity {
  icon: string;
  title: string;
  text: string;
}

export async function getCabin({
  cached = true,
  id,
}: {
  cached?: boolean;
  id: string;
}): Promise<Cabin | undefined> {
  if (cached) {
    // find the cabin with the matching id
    const cabin = cachedCabins.find((cabin) => cabin.uid === id);
    return cabin;
  }

  const url = `https://api.hostfully.com/v2/properties/${id}`;

  const headers = {
    "Content-Type": "application/json",
    "X-HOSTFULLY-APIKEY": getApiKey(),
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  return data;
}
