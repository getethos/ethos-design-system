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

import { faHamburger } from '@fortawesome/pro-regular-svg-icons/faHamburger'
import { faSort } from '@fortawesome/pro-solid-svg-icons/faSort'
import { faSortDown } from '@fortawesome/pro-solid-svg-icons/faSortDown'
import { faSortUp } from '@fortawesome/pro-solid-svg-icons/faSortUp'

// Nora Icons
import { faAlignLeft } from '@fortawesome/pro-solid-svg-icons/faAlignLeft'
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons/faCircleNotch'
import { faExclamationTriangle as faExclamationTriangleLight } from '@fortawesome/pro-light-svg-icons/faExclamationTriangle'
import { faExclamationTriangle as faExclamationTriangleSolid } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle'
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch'
import { faAsterisk } from '@fortawesome/pro-light-svg-icons/faAsterisk'
import { faExchange } from '@fortawesome/pro-regular-svg-icons/faExchange'
import { faClock } from '@fortawesome/pro-light-svg-icons/faClock'
import { faUserCheck } from '@fortawesome/pro-light-svg-icons/faUserCheck'
import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons/faCheckSquare'
import { faCheckSquare as faCheckSquareSolid } from '@fortawesome/pro-solid-svg-icons/faCheckSquare'
import { faWindowClose } from '@fortawesome/pro-light-svg-icons/faWindowClose'
import { faOctagon } from '@fortawesome/pro-light-svg-icons/faOctagon'
import { faExternalLink } from '@fortawesome/pro-regular-svg-icons/faExternalLink'
import { faCheck as faCheckLight } from '@fortawesome/pro-light-svg-icons/faCheck'
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck'
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes'
import { faLayerPlus } from '@fortawesome/pro-light-svg-icons/faLayerPlus'
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons/faChevronLeft'
import { faFileMedicalAlt } from '@fortawesome/pro-light-svg-icons/faFileMedicalAlt'
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons/faTimesCircle'
import { faTimesSquare } from '@fortawesome/pro-solid-svg-icons/faTimesSquare'
import { faAward } from '@fortawesome/pro-regular-svg-icons/faAward'
import { faAddressCard } from '@fortawesome/pro-regular-svg-icons/faAddressCard'
import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil'
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus'
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons/faTrashAlt'
import { faTrashAlt as faTrashAltLight } from '@fortawesome/pro-light-svg-icons/faTrashAlt'
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons/faCaretDown'
import { faInfoCircle as faInfoCircleLight } from '@fortawesome/pro-light-svg-icons/faInfoCircle'
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle'
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus'
import { faQuestionCircle } from '@fortawesome/pro-regular-svg-icons/faQuestionCircle'
import { faStethoscope } from '@fortawesome/pro-regular-svg-icons/faStethoscope'
import { faLockAlt } from '@fortawesome/pro-regular-svg-icons/faLockAlt'
import { faEdit } from '@fortawesome/pro-regular-svg-icons/faEdit'
import { faMinusCircle } from '@fortawesome/pro-regular-svg-icons/faMinusCircle'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons/faSpinnerThird'
import { faMoneyCheckEditAlt } from '@fortawesome/pro-regular-svg-icons/faMoneyCheckEditAlt'

library.add(
  faHamburger,
  faSort,
  faSortDown,
  faSortUp,
  faAddressCard,
  faAlignLeft,
  faAsterisk,
  faAward,
  faCaretDown,
  faCheck,
  faCheckLight,
  faCheckSquare,
  faCheckSquareSolid,
  faChevronLeft,
  faCircleNotch,
  faClock,
  faEdit,
  faExchange,
  faExclamationTriangleLight,
  faExclamationTriangleSolid,
  faExternalLink,
  faFileMedicalAlt,
  faFilePlus,
  faInfoCircle,
  faInfoCircleLight,
  faLayerPlus,
  faLockAlt,
  faMoneyCheckEditAlt,
  faMinusCircle,
  faOctagon,
  faPencil,
  faPlus,
  faQuestionCircle,
  faSearch,
  faSpinnerThird,
  faStethoscope,
  faTimes,
  faTimesCircle,
  faTimesSquare,
  faTrashAlt,
  faTrashAltLight,
  faUserCheck,
  faWindowClose
)
