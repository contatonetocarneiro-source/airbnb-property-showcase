/**
 * Availability source for the date picker.
 * Phase 2: replace with dates parsed from the Airbnb iCal feed (via a server function)
 * so nights already booked elsewhere can't be requested here.
 */
export type BlockedRange = { from: Date; to: Date };

export function getBlockedRanges(): BlockedRange[] {
  return [];
}
