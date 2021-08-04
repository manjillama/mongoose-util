import { Document, Model } from 'mongoose';
import { StringMap } from './types';
import { omit } from './utils';
import APIFeatures from './utils/APIFeatures';

type GetAll<T> = {
  populate: (options: string | StringMap) => GetAll<T>;
  exec: () => Promise<[T[], number, number]>;
};

/**
 * @param  {Model<T>} model
 * @param  {StringMap} query
 */
export function getAll<T extends Document>(
  model: Model<T>,
  query: StringMap
): GetAll<T> {
  const { limit } = query;

  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate(size);

  const totalCountFilter = omit(query, ['page', 'sort', 'limit', 'fields']);

  return {
    populate(options: string | StringMap) {
      features.query.populate(options);
      return this;
    },
    async exec() {
      const [data, totalCount] = await Promise.all([
        features.query,
        model.countDocuments(totalCountFilter as any),
      ]);
      return [data, totalCount, size];
    },
  };
}
