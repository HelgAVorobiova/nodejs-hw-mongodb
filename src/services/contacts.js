import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  console.log('Filters: ', filters);

  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();

  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }

  if (filters.isFavourite !== undefined) {
    console.log('by isFavourite: ', filters.isFavourite);
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const paginationData = calcPaginationData({ page, perPage, totalItems });
  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  ContactCollection.findOne({ _id: contactId });

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await ContactCollection.findByIdAndUpdate(
    { _id },
    payload,
    {
      upsert,
      includeResultMetadata: true,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
