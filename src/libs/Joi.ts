import DateExtension from '@joi/date';
import * as external from 'joi';

export const joi = <typeof external>external.extend(DateExtension);
