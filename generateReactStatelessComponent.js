const fs = require('fs')
const chalk = require('chalk')

const { toCamelCase, errorLog, warningLog, successLog, infoLog } = require('./helpers')

module.exports = (name) => {
  fs.mkdir(name, (err) => {
    if (err && err.code !== 'EEXIST') {
      errorLog(err.message)
    } else {
      if (err && err.code === 'EEXIST')
        warningLog(err.message)
      else
        successLog(`Directory '${chalk.italic(name)}' created.`)

      const componentName = name.slice(name.lastIndexOf('/') + 1)

      const componentFile = `${name}/${componentName}.tsx`
      const propsInterfaceFile = `${name}/I${componentName}Props.ts`
      const stylesFile = `${name}/${componentName}.module.scss`
      const styleDeclarationsFile = `${name}/${componentName}.module.scss.ts`

      fs.appendFile(componentFile, component(componentName), (err) => {
        if (err)
          errorLog(err.message)
        else
          successLog(`'${componentFile}' created.`)
      })
      fs.appendFile(propsInterfaceFile, propsInterface(componentName), (err) => {
        if (err)
          errorLog(err.message)
        else
          successLog(`'${propsInterfaceFile}' created.`)
      })
      fs.appendFile(stylesFile, styles(componentName), (err) => {
        if (err) { errorLog(err.message) }
        else {
          successLog(`'${stylesFile}' created.`)
          fs.appendFile(styleDeclarationsFile, styleDeclarations(componentName), (err) => {})
        }
      })
    }
  })
}

const component = (componentName) =>
  `import * as React from 'react';
import { I${componentName}Props } from './I${componentName}Props';
import styles from './${componentName}.module.scss';

const ${componentName}: React.FC<I${componentName}Props> = (props) => {
  return (
    <div className={\`\${styles.${toCamelCase(componentName)}}\`}>
      <h3>${componentName} Stateless Component!</h3>
    </div>
  );
};

export default ${componentName};
`

const propsInterface = (componentName) =>
  `export interface I${componentName}Props {}
`

const styles = (componentName) =>
  `.${toCamelCase(componentName)} {
  display: block;
}
`
const styleDeclarations = (componentName) =>
  `/* tslint:disable */
  require('./${componentName}.module.scss');
  const styles = {
    ${toCamelCase(componentName)}: '${toCamelCase(componentName)}_613d8040',
  };

  export default styles;
  /* tslint:enable */
`
