# Khmer Lunar Calendar

A simple and lightweight Khmer luar calendar.

```
npm install khmercal
```

```js
import { lunar } from 'khmercal';

lunar(new Date())
// {
//   day: 18,
//   period: [ 3, 'R' ],
//   sequence: 3,
//   animal: 'KARL',
//   years: { JE: 1383, CE: 2022, BE: 2566 },
//   length: 354,
//   monthLength: 30,
//   month: { name: 'KÂTDĔK', index: 11 },
//   months: [
//     'MĬKÔSĔR', 'BŎSS',
//     'MÉAKH',   'PHÂLKŬN',
//     'CHÉTR',   'VĬSAKH',
//     'CHÉSTH',  'ASATH',
//     'SRAPÔNÂ', 'PHÔTRÔBÂT',
//     'ÂSSŎCH',  'KÂTDĔK'
//   ]
// }
```