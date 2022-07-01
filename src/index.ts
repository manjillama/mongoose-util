import { Document, Model } from "mongoose";
import { StringMap } from "./types";
import APIFeatures, { parseQueryFilter } from "./utils/APIFeatures";

type GetAll<T> = {
  populate: (options: string | StringMap | StringMap[]) => GetAll<T>;
  exec: () => Promise<[T[], number, number]>;
};
/**
 * @param  {Model<T>} model
 * @param  {any} query i.e. { price: { gte: 500, lte: 3000 }, page: 2, size: 30, type: 'clothing', sort: '-price' }
 * @param {object | string} populate populate query field
 */
export function getAll<T extends Document>(
  model: Model<T>,
  query: any
): GetAll<T> {
  const { limit } = query;

  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate(size);

  const totalCountFilter = parseQueryFilter(query);

  return {
    populate(options: any) {
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
