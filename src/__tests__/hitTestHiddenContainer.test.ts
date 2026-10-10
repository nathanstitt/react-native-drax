import { hitTestWorklet } from '../math';
import type { SpatialEntry } from '../types';

function entry(id: string, overrides: Partial<SpatialEntry>): SpatialEntry {
  return {
    id,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    parentIndex: -1,
    receptive: false,
    monitoring: false,
    draggable: false,
    rejectOwnChildren: false,
    collisionAlgorithm: 'center',
    ...overrides,
  };
}

const offsets = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

describe('hitTestWorklet', () => {
  it('hits a receiver inside a measured container', () => {
    const entries = [
      entry('container', { width: 400, height: 400, monitoring: true }),
      entry('target', { x: 10, y: 10, parentIndex: 0, receptive: true }),
    ];
    expect(hitTestWorklet({ x: 50, y: 50 }, entries, offsets, 'dragged').receiverId).toBe(
      'target'
    );
  });

  it('skips a receiver whose container measures empty', () => {
    // The container is hidden (an inactive screen kept mounted): it re-measured
    // to 0×0, while the target inside it kept its last size.
    const entries = [
      entry('container', { width: 0, height: 0, monitoring: true }),
      entry('target', { x: 10, y: 10, parentIndex: 0, receptive: true }),
    ];
    expect(hitTestWorklet({ x: 50, y: 50 }, entries, offsets, 'dragged').receiverId).toBe('');
  });
});
