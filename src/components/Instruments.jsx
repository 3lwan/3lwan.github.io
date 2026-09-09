/**
 * The readout panel. Rows are supplied by the choreography and re-labelled per
 * scene, so the instruments always describe the world currently on screen -
 * altitude in the air, route on the road, telemetry for the fleet.
 */
export function Instruments({ rows }) {
  return (
    <div className="hud instruments">
      {rows.map((row, index) => (
        <div key={row.label} className={`readout${index > 0 ? ' readout--optional' : ''}`}>
          <i>{row.label}</i>
          <b>{row.value}</b>
        </div>
      ))}
    </div>
  );
}
