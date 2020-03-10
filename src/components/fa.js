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
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'
import { faExchange } from '@fortawesome/pro-regular-svg-icons/faExchange'
import { faClock } from '@fortawesome/pro-light-svg-icons/faClock'
import { faUserCheck } from '@fortawesome/pro-light-svg-icons/faUserCheck'
import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons/faCheckSquare'
import { faCheckSquare as faCheckSquareSolid } from '@fortawesome/pro-solid-svg-icons/faCheckSquare'
import { faWindowClose } from '@fortawesome/pro-light-svg-icons/faWindowClose'
import { faOctagon } from '@fortawesome/pro-light-svg-icons/faOctagon'
import { faExternalLink } from '@fortawesome/pro-regular-svg-icons/faExternalLink'
import { faCheck } from '@fortawesome/pro-light-svg-icons/faCheck'
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes'
import { faLayerPlus } from '@fortawesome/pro-light-svg-icons/faLayerPlus'
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons/faChevronLeft'
import { faFileMedicalAlt } from '@fortawesome/pro-light-svg-icons/faFileMedicalAlt'
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons/faTimesCircle'

library.add(
  faAlignLeft,
  faAsterisk,
  faCheck,
  faCheckSquare,
  faCheckSquareSolid,
  faChevronLeft,
  faCircleNotch,
  faClock,
  faExchange,
  faExclamationTriangle,
  faExternalLink,
  faFileMedicalAlt,
  faInfoCircle,
  faLayerPlus,
  faOctagon,
  faSearch,
  faTimes,
  faTimesCircle,
  faUserCheck,
  faWindowClose
)
