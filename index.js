const program = require('commander')
const generateReactClassComponent = require('./generateReactClassComponent')
const generateReactStatelessComponent = require('./generateReactStatelessComponent')
const generateReactContainerComponent = require('./generateReactContainerComponent')

program
  .version('0.0.1', '-v, --version')
  .description('Typescript based react component generator cli')

program
  .command('classComponent <componentName>')
  .alias('c')
  .description('Generate a class component')
  .action((componentName) => {
    generateReactClassComponent(componentName)
  })

program
  .command('statelessComponent <componentName>')
  .alias('s')
  .description('Generate a stateless component')
  .action((componentName) => {
    generateReactStatelessComponent(componentName)
  })

program
  .command('containerComponent <componentName>')
  .alias('r')
  .description('Generate a redux container component')
  .action((componentName) => {
    generateReactContainerComponent(componentName)
  })


program.parse(process.argv);