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
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch'

// REMINDER! Each import must be a separate named import and use "deep import"
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons/faCircleNotch'
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle'
import { faWindowClose } from '@fortawesome/pro-solid-svg-icons/faWindowClose'

library.add(faSearch, faCircleNotch, faExclamationTriangle, faWindowClose)
