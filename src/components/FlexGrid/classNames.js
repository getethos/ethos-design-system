import styles from './flexboxgrid2-customized.css'

/**
 * Note we exclude node_modules in our
 * [webpack.config.js](https://github.com/getethos/ethos-design-system/blob/master/webpack.config.js)
 * for our main CSS Modules rules. Then, we've added flexbox2css
 * with include on the next css loader webpack rule. See:
 * https://github.com/roylee0704/react-flexbox-grid#css-modules
 */
export default function getClass(className) {
  return styles && styles[className] ? styles[className] : className
}
