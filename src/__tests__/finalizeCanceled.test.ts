import { isFinalizeCanceled } from '../compat/finalizeCanceled';
import type { DraxPanEvent } from '../compat/types';

function event(canceled?: boolean): DraxPanEvent {
  return { x: 0, y: 0, absoluteX: 0, absoluteY: 0, canceled };
}

describe('isFinalizeCanceled', () => {
  it('reads event.canceled on released gesture-handler v3', () => {
    expect(isFinalizeCanceled(event(true))).toBe(true);
    expect(isFinalizeCanceled(event(false))).toBe(false);
    // event.canceled wins even if a stray second argument is present.
    expect(isFinalizeCanceled(event(false), false)).toBe(false);
  });

  it('falls back to the legacy success parameter on v2 and v3 betas', () => {
    expect(isFinalizeCanceled(event(), true)).toBe(false);
    expect(isFinalizeCanceled(event(), false)).toBe(true);
  });

  it('treats no signal at all as not cancelled', () => {
    // Reading the removed parameter used to make every normal end look
    // cancelled on released v3 — the regression this helper exists to fix.
    expect(isFinalizeCanceled(event())).toBe(false);
  });
});
