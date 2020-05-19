// https://github.com/iamkun/dayjs/issues/480
import * as dayjs_ from 'dayjs'
const dayjs = dayjs_.default || dayjs_

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

// Adds the UTC plugin
import dayjsPluginUTC from 'dayjs-plugin-utc'
dayjs.extend(dayjsPluginUTC)

export default dayjs
