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
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
library.add(faSearch)
