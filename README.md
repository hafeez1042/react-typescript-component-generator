# React Typescript Component Generator

React Typescript Component Generator is a cli for generating react component for typescript based architucture.

## Install
* Global installation
  ```bash
  # Using yarn package manager
  $ yarn global add react-typescript-component-generator

  # Using npm package manager
  $ npm install --global react-typescript-component-generator
  ```
* Local installation
  ```bash
  # Using yarn package manager
  $ yarn add --dev react-typescript-component-generator

  # Using npm package manager
  $ npm install --save-dev react-typescript-component-generator
  ```

## Usage
`<componentName>` is the name of component that can be with or without directory

eg:
- `src/webparts/webpartName/components/ComponentName`

  this will generate component named *`ComponentName`* in the directory *`./src/webparts/webpartName/components/ComponentName`*

- `ComponentName`

  this will generate component named *`ComponentName`* in the directory *`./ComponentName`*
### Generate React Stateless Component

```bash
$ grc statelessComponent <componentName>
# or
$ grc s <componentName>
```

### Generate React Class Component

```bash
$ grc classComponent <componentName>
# or
$ grc c <componentName>
```

  ### Generate React Redux Container Component

```bash
$ grc containerComponent <componentName>
# or
$ grc r <componentName>
```
## License

React Typescript Component Generator is MIT licensed.