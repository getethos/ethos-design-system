import {
  InfoMessageFactory,
  INFO_MESSAGE_FORMATS,
  INFO_MESSAGE_TYPES,
} from './InfoMessageFactory'
const PublicInfoMessageComponents = {
  Text: {
    Error: InfoMessageFactory(
      INFO_MESSAGE_TYPES.ERROR,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Warning: InfoMessageFactory(
      INFO_MESSAGE_TYPES.WARNING,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Info: InfoMessageFactory(
      INFO_MESSAGE_TYPES.INFO,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.TEXT
    ),
  },
  Alert: {
    Error: InfoMessageFactory(
      INFO_MESSAGE_TYPES.ERROR,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Warning: InfoMessageFactory(
      INFO_MESSAGE_TYPES.WARNING,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Info: InfoMessageFactory(
      INFO_MESSAGE_TYPES.INFO,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.ALERT
    ),
  },
}
export const InfoMessage = PublicInfoMessageComponents
