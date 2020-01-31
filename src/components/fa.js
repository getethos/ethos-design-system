/**
 * Font Awesome
 *
 * Sets up font awesome for consumption by EDS components. Only adds
 * icons we've elected to use keeping the footprint down. If you're
 * an Ethos developer, please contact Rob for instructions to setup.
 *
 * See https://github.com/FortAwesome/react-fontawesome/issues/16#issuecomment-485281397
 */
import { library } from '@fortawesome/fontawesome-svg-core'

// We need to add any icons we want to use here on an as needed basis. This will
// hopefully help to keep the footprint small, and is the recommended approach.
// Since we aren't yet achieving treeshaking, "deep imports" is the recommendation:
// See https://fontawesome.com/how-to-use/with-the-api/other/tree-shaking

//////////////////////////////////////////////////////////////////////
// REMINDER! each import must be a separate "deep import" as below  //
//////////////////////////////////////////////////////////////////////

import { faAlignLeft } from '@fortawesome/pro-solid-svg-icons/faAlignLeft'
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons/faCircleNotch'
import { faExclamationTriangle } from '@fortawesome/pro-light-svg-icons/faExclamationTriangle'
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch'
import { faAsterisk } from '@fortawesome/pro-light-svg-icons/faAsterisk'
import { faExchange } from '@fortawesome/pro-regular-svg-icons/faExchange'
import { faClock } from '@fortawesome/pro-light-svg-icons/faClock'
import { faUserCheck } from '@fortawesome/pro-light-svg-icons/faUserCheck'
import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons/faCheckSquare'
import { faWindowClose } from '@fortawesome/pro-light-svg-icons/faWindowClose'

library.add(
  faAlignLeft,
  faAsterisk,
  faCheckSquare,
  faCircleNotch,
  faClock,
  faExchange,
  faExclamationTriangle,
  faSearch,
  faUserCheck,
  faWindowClose
)
