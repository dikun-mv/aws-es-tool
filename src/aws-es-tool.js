#!/usr/bin/env node

const cli = require('commander');
const metadata = require('../package.json');
const commands = require('./commands');

const bind = (fn, ...args) => (...pass) => fn(...args, ...pass);

cli
  .version(metadata.version, '-v, --version')
  .description(metadata.description)
  .option('-H, --host <URL>', 'AWS Elasticsearch Service URL');

cli
  .command('list')
  .description('List available snapshots')
  .action(bind(commands.list, cli));

cli
  .command('restore <ID>')
  .description('Restore snapshot with given ID')
  .action(bind(commands.restore, cli));

cli.parse(process.argv);
if (!cli.args.length) cli.help();
