import { contactTypeList } from '../../constants/contacts.js';

export const parseContactsFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : undefined;
  const parsedIsFavourite =
    isFavourite === 'true' || isFavourite === 'false'
      ? isFavourite === 'true'
      : undefined;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
