import { CarSharing, CAR_DEFS } from './CarSharing';
import { Moped, KickScooter, SCOOTER_DEFS } from './SharedScooters';

/**
 * INVERS shared-mobility fleet: a car-sharing hatchback, a shared moped and a
 * kick scooter, side profile, all facing right.
 *
 * All three contact the ground at y=392 in this 1200x460 viewBox - the same
 * line as the Flaschenpost van, so the fleet rolls in where the van left.
 *
 * INVERS builds the telematics that make a vehicle shareable, so each carries
 * its unit: a shark-fin antenna on the car, a pod on the moped stem, a lock
 * collar on the scooter.
 */
export function MobilityFleet({ frame }) {
  const { carWheelDeg, mopedWheelDeg, kickWheelDeg } = frame;

  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        {CAR_DEFS}
        {SCOOTER_DEFS}
      </defs>

      <CarSharing spinDeg={carWheelDeg} />
      <Moped spinDeg={mopedWheelDeg} />
      <KickScooter spinDeg={kickWheelDeg} />
    </svg>
  );
}
