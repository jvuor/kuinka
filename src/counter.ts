import { DateTime, Duration } from 'luxon';

const getDiffFromNow = (time: DateTime): Duration => time.diffNow();

const getContainer = (id: string): Element => {
  const ref = document.querySelector(id);

  if (!ref) {
    throw new Error('Container not found');
  }

  return ref;
}

const updateContent = (containerId: string, fromDate: DateTime): void => {
  const textContainer = getContainer(containerId);
  const diff = getDiffFromNow(fromDate);
  const content = getTimeData(diff);
  writeTimeData(textContainer, content);
}

const getTimeData = (difference: Duration): string => {
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

const writeTimeData = (element: Element, data: string): void  => {
  element.textContent = data;
}

const setUpdateCycle = (updateFunction: () => void, updateTimeMs: number): void => {
  setInterval(updateFunction, updateTimeMs);
  updateFunction();
}

export { updateContent, setUpdateCycle }
