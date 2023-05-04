#!/usr/bin/env node
import { lunar } from './index.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import template from 'lodash.template';

yargs(hideBin(process.argv))
  .scriptName('khmercal')
  .command('$0 [date]', 'Convert', (yargs) => {
    return yargs.positional('date', {
      type: 'string',
      default: () => new Date().toISOString(),
      describe: "ISO Date string"
    })
  }, ({ date, json }) => {
    const result = lunar(date);

    if (json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    const SAK = [
      'I ឯកស័ក',
      'II ទោស័ក',
      'III ត្រីស័ក',
      'IV ចត្វាស័ក',
      'V បញ្ចស័ក',
      'VI ឆស័ក',
      'VII សប្តស័ក',
      'VIII អដ្ឋស័ក',
      'IX នព្វស័ក',
      'X សំរឹទ្ធិស័ក'
    ]

    const _t = template(
      'Day: <%= period[0] %><%= period[1] %> (<%= day%> of <%= monthLength %>)\n' +
      'Month: <%= month.name %>\n' +
      'Years: <%= years.BE %> B.E, <%= years.JE %> J.E, <%= years.CE %> C.E\n' +
      'Days: <%= length %> days \n' +
      'Zodiac: <%= zodiac %>\n' +
      'Sequence: <%= sak %>'
    );

    console.log(_t({ ...result, sak: SAK[result.sequence] }));
  })
  .option('json', {
    alias: 'j', 
    description: "JSON output", 
    type: 'boolean', 
    default: false
  })
  .parse()
