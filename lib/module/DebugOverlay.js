"use strict";

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
function computeAbsoluteEntries(entries, scrollOffsets) {
  return entries.map(entry => {
    let absX = entry.x;
    let absY = entry.y;
    let parentIdx = entry.parentIndex;
    while (parentIdx >= 0 && parentIdx < entries.length) {
      const parent = entries[parentIdx];
      const parentScroll = scrollOffsets[parentIdx] ?? {
        x: 0,
        y: 0
      };
      absX += parent.x - parentScroll.x;
      absY += parent.y - parentScroll.y;
      parentIdx = parent.parentIndex;
    }
    return {
      ...entry,
      absX,
      absY
    };
  });
}
function getColor(entry) {
  if (entry.receptive && entry.draggable) return '#e07a52'; // orange — both
  if (entry.receptive) return '#22c55e'; // green — receiver
  if (entry.draggable) return '#3b82f6'; // blue — draggable
  if (entry.monitoring) return '#eab308'; // yellow — monitor
  return '#888888'; // grey — passive
}
function getLabel(entry) {
  const parts = [];
  if (entry.draggable) parts.push('D');
  if (entry.receptive) parts.push('R');
  if (entry.monitoring) parts.push('M');
  return parts.join('+') || '?';
}

/**
 * Debug overlay that visualizes all registered Drax views.
 * Reads the spatial index SharedValue and renders colored borders
 * showing view bounds, roles (draggable/receptive/monitoring), and IDs.
 *
 * Rendered as an absolute-fill sibling in DraxProvider when debug={true}.
 */
export const DebugOverlay = ({
  spatialIndexSV,
  scrollOffsetsSV
}) => {
  const [entries, setEntries] = useState([]);

  // Poll the spatial index periodically (SharedValues update on UI thread,
  // reading .value on JS thread gives the latest committed value).
  useEffect(() => {
    const update = () => {
      const raw = spatialIndexSV.value;
      const scrolls = scrollOffsetsSV.value;
      if (raw.length > 0) {
        setEntries(computeAbsoluteEntries(raw, scrolls));
      } else {
        setEntries([]);
      }
    };
    update();
    const interval = setInterval(update, 500);
    return () => clearInterval(interval);
  }, [spatialIndexSV, scrollOffsetsSV]);
  if (entries.length === 0) return null;
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    pointerEvents: "none",
    children: entries.map(entry => {
      const color = getColor(entry);
      const label = getLabel(entry);
      return /*#__PURE__*/_jsx(View, {
        style: [styles.overlay, {
          left: entry.absX,
          top: entry.absY,
          width: entry.width,
          height: entry.height,
          borderColor: color
        }],
        children: /*#__PURE__*/_jsx(Text, {
          style: [styles.label, {
            backgroundColor: color
          }],
          children: label
        })
      }, entry.id);
    })
  });
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999
  },
  overlay: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed'
  },
  label: {
    position: 'absolute',
    top: -1,
    left: -1,
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=DebugOverlay.js.map