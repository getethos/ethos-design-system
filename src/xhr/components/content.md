The section houses Xhr components for making HTTP requests and handling server errors gracefully.

**_NOTE: Consumers will need to install wathwg-fetch pollyfill to work in IE_**

Also note that `core-js` does [not supply this polyfill](https://github.com/zloirock/core-js#missing-polyfills)

Here's how a consumer of the EDS may wish to set that up:

```shell
npm install whatwg-fetch --save # or yarn equivalent
```

Then import in your app's bootstrap:

```javascript
import 'whatwg-fetch'
```

It appears that `whatwg-fetch` takes care of [conditionally polyfilling](https://github.com/github/fetch/blob/master/fetch.js#L511)
for free.
