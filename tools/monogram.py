"""Geometry for the ME monogram in public/icon.svg and brand/.

Prints the two filled outlines. Re-run and paste the paths in if the
construction ever changes:

    python3 tools/monogram.py

The mark is two strokes of one width. The M runs up the stem, down to the
vertex and up to the right, where it stops - its right leg is also the top arm
of the E. The E is a Z: top arm, spine, bottom arm. Every diagonal is 3:2.
"""

import math

# ---- construction constants, in the source image's pixel space -------------
W   = 21.0          # stroke width, one value for every stroke
HW  = W / 2.0
S   = 1.5           # dx/dy of every diagonal: one angle, 3:2
XR  = 237.0         # the vertical face all three right-hand terminals cut on
XST = 103.0         # M stem centreline
XSP = 178.5         # E spine centreline
Y1  = 113.0         # centreline y at XR: M's right leg / top of the ligature
P   = 43.25         # vertical pitch between the three arms
Y2, Y3 = Y1 + P, Y1 + 2 * P
YFOOT = 220.5       # M stem foot, centreline

# M vertex: where the right leg, run down-left from (XR, Y1), meets the stem's
# mirror diagonal. Both legs now share |S|, so the M is symmetric.
CX, CY = 165.0, Y1 + (XR - 165.0) / S
BY = CY - (CX - XST) / S                      # top of the stem
M = [(XST, YFOOT), (XST, BY), (CX, CY), (XR, Y1)]

# E: one stroke - top arm, spine, bottom arm. Its arms are parallel to the M's
# right leg, and the spine's length falls out of the pitch.
E = [(XR, Y2), (XSP, Y2 + (XR - XSP) / S), (XSP, Y3 + (XR - XSP) / S), (XR, Y3)]

M_CUTS = [(S, -1.0), (0.0, 1.0)]   # foot cut at the arms' angle; terminal vertical
E_CUTS = [(0.0, 1.0), (0.0, 1.0)]

# ---- stroke outlining ------------------------------------------------------
def unit(v):
    l = math.hypot(*v); return (v[0] / l, v[1] / l)

def inter(p, dp, q, dq):
    den = dp[0] * dq[1] - dp[1] * dq[0]
    if abs(den) < 1e-9: return p
    t = ((q[0] - p[0]) * dq[1] - (q[1] - p[1]) * dq[0]) / den
    return (p[0] + t * dp[0], p[1] + t * dp[1])

def side(pts, cuts, sign):
    dirs = [unit((b[0] - a[0], b[1] - a[1])) for a, b in zip(pts, pts[1:])]
    lines = [((v[0] - u[1] * sign * HW, v[1] + u[0] * sign * HW), u)
             for v, u in zip(pts, dirs)]
    out = [inter(lines[0][0], lines[0][1], pts[0], cuts[0])]
    for (p, dp), (q, dq) in zip(lines, lines[1:]):
        out.append(inter(p, dp, q, dq))
    out.append(inter(lines[-1][0], lines[-1][1], pts[-1], cuts[1]))
    return out

outline = lambda pts, cuts: side(pts, cuts, 1) + side(pts, cuts, -1)[::-1]

mo, eo = outline(M, M_CUTS), outline(E, E_CUTS)
allp = mo + eo
x0, x1 = min(p[0] for p in allp), max(p[0] for p in allp)
y0, y1 = min(p[1] for p in allp), max(p[1] for p in allp)

def emit(height_frac, name):
    """Scale the mark to height_frac of a 512 box and centre it there."""
    k = 512.0 * height_frac / (y1 - y0)
    dx = 256.0 - (x0 + x1) / 2.0 * k
    dy = 256.0 - (y0 + y1) / 2.0 * k
    f = lambda pts: "M" + " L".join("%.1f,%.1f" % (p[0] * k + dx, p[1] * k + dy)
                                    for p in pts) + " Z"
    print("%s  (mark %.0f%% of the box, %.1f x %.1f)" %
          (name, height_frac * 100, (x1 - x0) * k, (y1 - y0) * k))
    print("  M: " + f(mo))
    print("  E: " + f(eo))
    print()

print("slope 1.5 everywhere; stroke %.0f; raw bbox %.1f x %.1f\n" % (W, x1 - x0, y1 - y0))
emit(0.64, "TILE")     # inside a rounded tile, as in the source
emit(0.78, "FULLBLEED")  # no tile - favicon wants the extra size at 16px
