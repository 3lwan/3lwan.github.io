import { useRef } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useViewportWidth } from './hooks/useViewportWidth';
import { frameAt } from './scroll/choreography';
import { experiences, profile } from './data/career';
import { Aircraft } from './illustrations/Aircraft';
import { Van } from './illustrations/Van';
import { MobilityFleet } from './illustrations/MobilityFleet';
import { CerecUnit } from './illustrations/CerecUnit';
import { SkyWorld, CloudDeck, AirportHorizon } from './illustrations/SkyWorld';
import { StreetSky, StreetHorizon } from './illustrations/StreetWorld';
import { MobilitySky, MobilityHorizon } from './illustrations/MobilityWorld';
import { ClinicSky, ClinicHorizon } from './illustrations/ClinicWorld';
import { Instruments } from './components/Instruments';
import { ProgressRail } from './components/ProgressRail';
import { SceneCopy } from './components/SceneCopy';

const byId = (id) => experiences.find((job) => job.id === id);
const SCENE_COPY = [
  byId('eurowings'),
  byId('flaschenpost'),
  byId('invers'),
  byId('conze-lead'),
];

const MARKS = Array.from({ length: 24 }, (_, i) => i);
const LIGHTS = Array.from({ length: 20 }, (_, i) => i);

/** A full-bleed scene: sky, horizon, ground plane and the object on it. */
function Scene({ id, opacity, groundClass, sky, horizon, marks, children }) {
  return (
    <div className="scene" data-scene={id} style={{ opacity }} aria-hidden="true">
      {sky}
      {horizon}
      <div className={`ground ${groundClass}`}>
        {marks}
      </div>
      {children}
    </div>
  );
}

/** Positions one object on the shared ground line and moves it horizontally. */
function Vehicle({ className, offsetPx, scale, opacity, children }) {
  return (
    <div className={`vehicle ${className}`}>
      <div
        className="vehicle__move"
        style={{ opacity, transform: `translateX(${offsetPx}px)` }}
      >
        <div className="vehicle__inner" style={scale ? { transform: scale } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function ScrollStory() {
  const trackRef = useRef(null);
  const progress = useScrollProgress(trackRef);
  const viewportWidth = useViewportWidth();
  const frame = frameAt(progress, viewportWidth);

  return (
    <div className="track" ref={trackRef}>
      <div className="stage">
        {/* ---------------- 01 Eurowings Digital ---------------- */}
        <Scene
          id="eurowings"
          opacity={frame.sceneOpacity.eurowings}
          groundClass="ground--runway"
          sky={<SkyWorld />}
          horizon={
            <>
              <CloudDeck
                opacity={frame.cloudDeckOpacity}
                shiftVh={frame.cloudDeckShiftVh}
                scale={frame.cloudDeckScale}
              />
              <AirportHorizon />
            </>
          }
          marks={
            <>
              <div className="edgelights" style={{ transform: `translateX(${frame.edgeLightShiftPx}px)` }}>
                {LIGHTS.map((i) => <i key={i} />)}
              </div>
              <div className="stripes stripes--runway" style={{ transform: `translateX(${frame.runwayShiftPx}px)` }}>
                {MARKS.map((i) => <i key={i} />)}
              </div>
            </>
          }
        >
          <div className="vehicle vehicle--plane">
            <div
              className="vehicle__move"
              style={{
                transform: `translateY(${frame.planeOffsetVh}vh) rotate(${frame.planePitchDeg}deg)`,
              }}
            >
              <div className={`vehicle__inner${frame.isGrounded ? ' is-grounded' : ''}`}>
                <Aircraft frame={frame} />
              </div>
            </div>
          </div>
        </Scene>

        {/* ---------------- 02 Flaschenpost ---------------- */}
        <Scene
          id="flaschenpost"
          opacity={frame.sceneOpacity.flaschenpost}
          groundClass="ground--street"
          sky={<StreetSky />}
          horizon={<StreetHorizon />}
          marks={
            <div className="stripes stripes--road" style={{ transform: `translateX(${frame.roadShiftPx}px)` }}>
              {MARKS.map((i) => <i key={i} />)}
            </div>
          }
        >
          <Vehicle className="vehicle--van" offsetPx={frame.vanOffsetPx}>
            <Van frame={frame} />
          </Vehicle>
        </Scene>

        {/* ---------------- 03 INVERS ---------------- */}
        <Scene
          id="invers"
          opacity={frame.sceneOpacity.invers}
          groundClass="ground--city"
          sky={<MobilitySky />}
          horizon={<MobilityHorizon />}
          marks={
            <div className="stripes stripes--road" style={{ transform: `translateX(${frame.streetShiftPx}px)` }}>
              {MARKS.map((i) => <i key={i} />)}
            </div>
          }
        >
          <Vehicle className="vehicle--fleet" offsetPx={frame.fleetOffsetPx}>
            <MobilityFleet frame={frame} />
          </Vehicle>
        </Scene>

        {/* ---------------- 04 Conze Informatik ---------------- */}
        <Scene
          id="conze"
          opacity={frame.sceneOpacity.conze}
          groundClass="ground--clinic"
          sky={<ClinicSky />}
          horizon={<ClinicHorizon />}
          marks={
            <div className="stripes stripes--floor" style={{ transform: `translateX(${frame.floorShiftPx}px)` }}>
              {MARKS.map((i) => <i key={i} />)}
            </div>
          }
        >
          <Vehicle className="vehicle--cerec" offsetPx={frame.cerecOffsetPx}>
            <CerecUnit frame={frame} />
          </Vehicle>
        </Scene>

        {/* ---------------- chrome ---------------- */}
        <div className="hud brandmark">
          <b>{profile.name}</b>
          <span>
            {profile.role} · {profile.location}
          </span>
          <a className="quickview" href="#/cv">
            Quick view ↗
          </a>
        </div>

        <Instruments rows={frame.instruments} />

        <div className="copy-deck">
          {SCENE_COPY.map((scene) => (
            <SceneCopy key={scene.id} scene={scene} opacity={frame.copyOpacity[scene.id.split('-')[0]]} />
          ))}
        </div>

        <ProgressRail activeIndex={frame.activeSceneIndex} />

        <div className="scrollcue" style={{ opacity: frame.cueOpacity }}>
          <span>Scroll to land</span>
          <u />
        </div>
      </div>
    </div>
  );
}
