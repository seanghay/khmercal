export function lunar(date = new Date()) {
  const aharakoune = y => (y * 292207 + 373) % 800;
  const harakoune = (y) => Math.floor((y * 292207 + 373) / 800) + 1;
  const avomane = (y) => (11 * harakoune(y) + 650) % 692;
  const regularLeap = y => (800 - aharakoune(y)) <= 207

  function bodethey(y) {
    const ha = harakoune(y);
    return (ha + Math.floor((11 * ha + 650) / 692)) % 30;
  }

  function lunarDiffDays(end) {
    let count = 0;
    let x = 1970 - 638 + 1;
    let y = end.getFullYear() - 638;
    if (x > y) {
      let _x = x;
      x = y;
      y = _x;
    }
    while (x < y) count += daysInYear(x++);
    return count;
  }

  function daysInYear(year) {
    if (jaisLeap(year)) return 384;
    if (greatLeap(year)) return 355;
    return 354;
  }


  function jaisLeap(y) {
    const b0 = bodethey(y);
    const b1 = bodethey(y + 1);
    return b0 > 24 || b0 < 6 || (b0 === 24 && b1 === 6) || (b0 === 25 && b1 === 5)
  }

  function langSak(y) {
    const i = sakDay(y);
    return { month: 3 + (i >= 6 && i <= 29) | 0, day: i };
  }

  function sakDay(y) {
    const bo = bodethey(y)
    const bl0 = jaisLeap(y - 1);
    if (!bl0 || (bl0 && !isProtetinLeap(y - 1))) {
      if (bo < 6) return bo + 1;
      return bo;
    }
    return bo + 1;
  }

  function greatLeap(y) {
    let value = isProtetinLeap(y);
    if (jaisLeap(y) && value) value = false;
    return value;
  }

  function isProtetinLeap(y) {
    const avomane0 = avomane(y);
    const avomane1 = avomane(y + 1);
    const normal = regularLeap(y);
    let value = normal && avomane0 < 127;

    if (!normal) {
      if (avomane0 === 137 && avomane1 === 0) value = false;
      else if (avomane0 < 138) value = true;
    }

    if (!value) value = isProtetinLeap(y - 1) && jaisLeap(y - 1);
    return value
  }

  function diffDays(end) {
    return Math.abs(
      Math.round((end - 286596e5) / (1000 * 60 * 60 * 24))
    );
  }

  function monthsOfYear(year) {
    const ath = jaisLeap(year);
    const great = greatLeap(year);
    const items = [];
    for (let i = 0; i < 12 + (ath | 0); i++) {
      let j = i;
      if (ath && j >= 8) j--;
      items.push(29 + ((j % 2 != 0) | 0) + ((j == 6 && great) | 0));
    }
    return items;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  date = new Date(date - 7 * 60 * 60 * 1000);
  
  const CE = date.getFullYear();
  let y = CE - 638;

  let day = Math.abs(diffDays(date) - lunarDiffDays(date)) + 1;
  const BE = CE + 543 + (day > 162 | 0);

  const len = daysInYear(y)

  if (day > len) {
    day -= len
    y++;
  }

  let m = 0;
  const lengthOfYear = monthsOfYear(y);
  for (const month of lengthOfYear) {
    if (day <= month) break;
    day -= month;
    m++;
  }

  const sak = langSak(y - 1);
  const JE = y - 1 - ((sak.month > m || (sak.month === m && sak.day > date.getDate())) | 0)

  const yearMonths = [
    "MĬKÔSĔR",
    "BŎSS",
    "MÉAKH",
    "PHÂLKŬN",
    "CHÉTR",
    "VĬSAKH",
    "CHÉSTH",
    "ASATH",
    "BÂTHÂMSATH",
    "TŬTĔYÉASATH",
    "SRAPÔNÂ",
    "PHÔTRÔBÂT",
    "ÂSSŎCH",
    "KÂTDĔK"
  ].filter(
      (_, i) => {
        if (lengthOfYear.length == 12) return i != 8 && i != 9
        else return i != 7;
      }
    )

  
  const ZODIAC_YEARS = [
    "JUTE",
    "CHLOV",
    "KARL",
    "THOS",
    "RORNG",
    "MASAGN",
    "MOMEE",
    "MOMAY",
    "VOKE",
    "ROKA",
    "JOR",
    "KAOR",
  ];

  return {
    day,
    period: [(day - 1) % 15 + 1, day > 15 ? 'R' : 'K'],
    sequence: (((JE + 1) % 10) + 9) % 10,
    zodiac: ZODIAC_YEARS[(((JE + 1) % 12) + 10) % 12],
    years: {
      JE,
      CE,
      BE,
    },
    length: len,
    monthLength: lengthOfYear[m],
    month: { name: yearMonths[m], index: m },
    months: yearMonths,
  }
}
