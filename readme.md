# Khmer Lunar Calendar

A simple and lightweight Khmer lunar calendar.

```
npm install khmercal
```

```js
import { lunar } from 'khmercal';

lunar(new Date())

// output
({
  day: 18,
  period: [ 3, 'R' ],
  sequence: 3,
  animal: 'KARL',
  years: { JE: 1383, CE: 2022, BE: 2566 },
  length: 354,
  monthLength: 30,
  month: { name: 'KÂTDĔK', index: 11 },
  months: [
    'MĬKÔSĔR', 'BŎSS',
    'MÉAKH',   'PHÂLKŬN',
    'CHÉTR',   'VĬSAKH',
    'CHÉSTH',  'ASATH',
    'SRAPÔNÂ', 'PHÔTRÔBÂT',
    'ÂSSŎCH',  'KÂTDĔK'
  ]
})
```

## CLI

```
npm install -g khmercal
```


1. Basic output

```shell
khmercal "2022-11-11T10:11:54.654Z"
```

> The date defaults to current date!

Result

```
Day: 3R (18 of 30)
Month: KÂTDĔK
Years: 2566 B.E, 1383 J.E, 2022 C.E
Days: 354 days 
Animal: KARL
Sequence: IV ចត្វាស័ក
```

2. JSON output

```shell
khmercal "2022-11-11T10:11:54.654Z" --json
```

```json
{
  "day": 18,
  "period": [
    3,
    "R"
  ],
  "sequence": 3,
  "animal": "KARL",
  "years": {
    "JE": 1383,
    "CE": 2022,
    "BE": 2566
  },
  "length": 354,
  "monthLength": 30,
  "month": {
    "name": "KÂTDĔK",
    "index": 11
  },
  "months": [
    "MĬKÔSĔR",
    "BŎSS",
    "MÉAKH",
    "PHÂLKŬN",
    "CHÉTR",
    "VĬSAKH",
    "CHÉSTH",
    "ASATH",
    "SRAPÔNÂ",
    "PHÔTRÔBÂT",
    "ÂSSŎCH",
    "KÂTDĔK"
  ]
}
```

## Related

- [khmerword](https://github.com/seanghay/khmerword)
- [khmernumber](https://github.com/seanghay/khmernumber)