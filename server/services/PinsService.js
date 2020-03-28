import { dbContext } from "../db/DbContext";

class PinsService {
  async delete(pinId) {
    let pin = await dbContext.Pins.findById(pinId);
    // @ts-ignore
    pin.isDeleted = true;
    await pin.save();
  }
  async getAll(query = {}) {
    // TODO BL goes here
    return await dbContext.Pins.find({ ...query, isDeleted: false }).populate(
      "creator",
      "name picture -email"
    );
  }
  async getOne(id) {
    // TODO BL goes here
    return await dbContext.Pins.findById(id).populate(
      "creator",
      "name picture -email"
    );
  }
  async create(pin) {
    return await dbContext.Pins.create(pin);
  }
}

export const pinsService = new PinsService();
