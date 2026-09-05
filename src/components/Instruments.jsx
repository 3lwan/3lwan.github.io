/** Flight-deck readouts that track the approach. */
export function Instruments({ altitude, gear, status }) {
  return (
    <div className="hud instruments">
      <div className="readout">
        <i>Altitude</i>
        <b>{altitude}</b>
      </div>
      <div className="readout readout--optional">
        <i>Gear</i>
        <b>{gear}</b>
      </div>
      <div className="readout readout--optional">
        <i>Status</i>
        <b>{status}</b>
      </div>
    </div>
  );
}
