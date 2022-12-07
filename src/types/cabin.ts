export type Cabin = HostfullyData & CMSData;

export type HostfullyData = HostfullyProperty &
  HostfullyPropertyGallery &
  HostfullyDescription;

export interface HostfullyDescription {
  description: {
    name: string;
    shortSummary: string;
    summary: string;
    notes: string;
    access: string;
    transit: string;
    interaction: string;
    neighbourhood: string;
    space: string;
    houseManual: string;
    locale: string;
  };
}

export interface HostfullyPropertyGallery {
  gallery: Picture[];
}

export interface Picture {
  uid: string;
  description: string | null;
  url: string;
  displayOrder: number;
  airbnbRoomId: null;
}

interface HostfullyProperty {
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

interface ListingLinks {
  airbnbUrl: string | null;
  hostfullyUrl: string;
  bookingDotComUrl: string | null;
  homeAwayUrl: string | null;
  tripAdvisorUrl: null;
  hvmiUrl: null;
}

interface PricingRules {
  increaseRate: number;
  increaseRateLowerBound: number;
  decreaseRate: number;
  decreaseRateHigherBound: number;
}

interface Reviews {
  total: number;
  average: null | number;
}

export interface CMSData {
  uid: string;
  name: string;
  "description info"?: BasicInfo[];
  amenities?: Amenities[];
  "footer info"?: FooterInfo[];
  map?: Map;
}

interface BasicInfo {
  title: string;
  description: string;
}

interface Amenities {
  title: string;
  description: string;
}

interface FooterInfo {
  icon: "people" | "bed" | "bathtub" | "map" | "highlight" | "other";
  text: string;
}

interface Map {
  label: string;
  url: string;
}
