import { SetMetadata } from '@nestjs/common';

export const SKIP_PHONE_NUMBER_CHECK = 'skipPhoneNumberCheck';

export const SkipPhoneNumberCheck = () =>
  SetMetadata(SKIP_PHONE_NUMBER_CHECK, true);
