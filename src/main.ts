import { DateTime, Duration, DurationLikeObject } from 'luxon';

import './style.css';

const fromTime = DateTime.fromISO('2025-11-11T17:20:00.00+02:00')

const calcDiff = (time: DateTime) => time.diffNow();
const getDiffData = (): Duration => calcDiff(fromTime);


function updateContent(): void {
  const textContainer = document.querySelector('#time-data');
  const diff = getDiffData();

  if (!textContainer) {
    return;
  }

  const content = getTimeData(diff);
  writeTimeData(textContainer, content);
}

function getTimeData(difference: Duration): string {
  const rtf = new Intl.RelativeTimeFormat("fi", { numeric: "always", style: 'long' });
  const rtfFi = (unit: Intl.RelativeTimeFormatUnit, dropDecimals = false): string => { 
    let diffNumber = difference.as(unit);
    return rtf.format(dropDecimals ? Math.floor(diffNumber) : diffNumber, unit);
  };

  const data = [
    rtfFi('seconds', true),
    rtfFi('minutes'),
    rtfFi('hours'),
    rtfFi('days'),
    rtfFi('weeks'),
    rtfFi('months'),
    rtfFi('years'),
  ];

  return data.join('\n');
}

function writeTimeData(element: Element, data: string): void {
  element.textContent = data;
}

updateContent();

setInterval(() => updateContent(), 1000);
