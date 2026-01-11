import { DateTime } from 'luxon';
import { setUpdateCycle, updateContent } from './counter';

const fromTime = DateTime.fromISO('2025-11-11T17:20:00.00+02:00')
const containerId = '#time-data';
const updateIntervalMs = 1000;

setUpdateCycle(
  () => updateContent(containerId, fromTime),
  updateIntervalMs,
);
