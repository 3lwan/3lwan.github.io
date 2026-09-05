import { useRef } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useViewportWidth } from './hooks/useViewportWidth';
import { frameAt } from './scroll/choreography';
import { experiences, profile } from './data/career';
import { Aircraft } from './illustrations/Aircraft';
import { Van } from './illustrations/Van';
import { SkyWorld, CloudDeck, AirportHorizon } from './illustrations/SkyWorld';
import { StreetSky, StreetHorizon } from './illustrations/StreetWorld';
import { Instruments } from './components/Instruments';
import { ProgressRail } from './components/ProgressRail';
import { SceneCopy } from './components/SceneCopy';

const [eurowings, flaschenpost] = experiences;
const RUNWAY_STRIPES = Array.from({ length: 24 }, (_, i) => i);
const EDGE_LIGHTS = Array.from({ length: 20 }, (_, i) => i);

export function ScrollStory() {
  const trackRef = useRef(null);
  const progress = useScrollProgress(trackRef);
  const viewportWidth = useViewportWidth();
  const frame = frameAt(progress, viewportWidth);

  return (
    <div className="track" ref={trackRef}>
      <div className="stage">
        {/* ---------------- Scene 01 - Eurowings ---------------- */}
        <div className="scene">
          <SkyWorld />
          <CloudDeck
            opacity={frame.cloudDeckOpacity}
            shiftVh={frame.cloudDeckShiftVh}
            scale={frame.cloudDeckScale}
          />
          <AirportHorizon />
          <div className="ground ground--runway">
            <div className="edgelights" style={{ transform: `translateX(${frame.edgeLightShiftPx}px)` }}>
              {EDGE_LIGHTS.map((i) => (
                <i key={i} />
              ))}
            </div>
            <div className="stripes stripes--runway" style={{ transform: `translateX(${frame.runwayShiftPx}px)` }}>
              {RUNWAY_STRIPES.map((i) => (
                <i key={i} />
              ))}
            </div>
          </div>

          <div className="vehicle vehicle--plane">
            <div
              className="vehicle__move"
              style={{
                opacity: frame.planeOpacity,
                transform: `translateY(${frame.planeOffsetVh}vh) rotate(${frame.planePitchDeg}deg)`,
              }}
            >
              <div
                className={`vehicle__inner${frame.isGrounded ? ' is-grounded' : ''}`}
                style={{ transform: `scale(${frame.planeScaleX}, ${frame.planeScaleY})` }}
              >
                <Aircraft frame={frame} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Scene 02 - Flaschenpost ---------------- */}
        <div className="scene" style={{ opacity: frame.streetOpacity }}>
          <StreetSky />
          <StreetHorizon />
          <div className="ground ground--street">
            <div className="stripes stripes--road" style={{ transform: `translateX(${frame.roadShiftPx}px)` }}>
              {RUNWAY_STRIPES.map((i) => (
                <i key={i} />
              ))}
            </div>
          </div>

          <div className="vehicle vehicle--van">
            <div className="vehicle__move" style={{ transform: `translateX(${frame.vanEntryPx}px)` }}>
              <div
                className="vehicle__inner"
                style={{ transform: `scale(${frame.vanScaleX}, ${frame.vanScaleY})` }}
              >
                <Van frame={frame} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Chrome ---------------- */}
        <div className="hud brandmark">
          <b>{profile.name}</b>
          <span>
            {profile.role} · {profile.location}
          </span>
          {/* Visible in the first frame, so the fast path is found without
              having to scroll the story to discover it. */}
          <a className="quickview" href="#/cv">
            Quick view ↗
          </a>
        </div>

        <Instruments altitude={frame.altitude} gear={frame.gear} status={frame.status} />

        <div className="copy-deck">
          <SceneCopy scene={eurowings} opacity={frame.copyOutOpacity} />
          <SceneCopy scene={flaschenpost} opacity={frame.copyInOpacity} />
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
