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
      const containerFile = `${name}/${componentName}Container.ts`
      const propsInterfaceFile = `${name}/I${componentName}Props.ts`
      const stateInterfaceFile = `${name}/I${componentName}State.ts`
      const stylesFile = `${name}/${componentName}.module.scss`
      const styleDeclarationsFile = `${name}/${componentName}.module.scss.ts`

      fs.appendFile(componentFile, component(componentName), (err) => {
        if (err)
          errorLog(err.message)
        else
          successLog(`'${componentFile}' created.`)
      })

      fs.appendFile(containerFile, container(componentName), (err) => {
        if (err)
          errorLog(err.message)
        else
          successLog(`'${containerFile}' created.`)
      })


      fs.appendFile(stateInterfaceFile, stateInterface(componentName), (err) => {
        if (err)
          errorLog(err.message)
        else
          successLog(`'${stateInterfaceFile}' created.`)
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
          fs.appendFile(styleDeclarationsFile, styleDeclarations(componentName), (err) => { })
        }
      })
    }
  })
}

const component = (componentName) =>
  `import * as React from 'react';
import { I${componentName}State } from './I${componentName}State';
import {
  I${componentName}StateProps,
  I${componentName}DispatchProps,
  I${componentName}Props
} from './I${componentName}Props';
import styles from './${componentName}.module.scss';

export type propsType = I${componentName}StateProps & I${componentName}DispatchProps & I${componentName}Props;

class ${componentName} extends React.Component<
  propsType,
  I${componentName}State
  > {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className={\`\${styles.${toCamelCase(componentName)}}\`}>
        <h3>${componentName} Component!</h3>
      </div>
    );
  }
}

export default ${componentName};
`

const container = (componentName) =>
  `import { MapStateToPropsParam, MapDispatchToPropsParam, connect } from "react-redux";
import IState from "path-to-redux-state-interface";
import ${componentName} from "./${componentName}";
import { I${componentName}Props, I${componentName}DispatchProps, I${componentName}StateProps } from "./I${componentName}Props";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const mapStateToProps: MapStateToPropsParam<
  I${componentName}StateProps,
  I${componentName}Props,
  IState
> = (state: IState) => {
  return {};
};

const mapDispatchToProps: MapDispatchToPropsParam<I${componentName}DispatchProps, I${componentName}Props> =
  (dispatch: ThunkDispatch<IState, undefined, AnyAction>) => ({
    // dispatch actions
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(${componentName});
`

const stateInterface = (componentName) =>
  `export interface I${componentName}State {}
`

const propsInterface = (componentName) =>
  `export interface I${componentName}Props {}

export interface I${componentName}StateProps {}

export interface I${componentName}DispatchProps {}

type PropsType = I${componentName}Props & I${componentName}StateProps & I${componentName}DispatchProps;

export default PropsType;
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
