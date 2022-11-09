import { getApiKey } from "../../utils/consts";

export interface Cabin {
  pricingRules: PricingRules;
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
  rentalCondition: null;
  cancellationPolicy: null;
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
  guideBookUrl: string;
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
  airbnbUrl: string;
  hostfullyUrl: string;
  bookingDotComUrl: null;
  homeAwayUrl: string;
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
  average: number;
}

export async function getCabin(id: string): Promise<Cabin> {
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
