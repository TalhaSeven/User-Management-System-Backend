import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { District } from "../entity/District";
import { City } from "../entity/City";
import { Address } from "../entity/Address";

export class DistrictController {
  private districtRepository = AppDataSource.getRepository(District);
  private cityRepository = AppDataSource.getRepository(City);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.districtRepository.find({ relations: { city: true } });
  }

  async districtUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const districtId = parseInt(request.params.districtId);
    const district = await this.districtRepository.findOne({
      where: {
        id: districtId,
      },
    });

    if (!district) {
      response.status(404);
      return "Not district found";
    }

    const address = await this.addressRepository.find({
      where: {
        district,
      },
      relations: {
        user: true,
        country: true,
        city: true,
        district: true,
        town: true,
      },
    });

    if (!address) {
      response.status(404);
      return "Not address found";
    }

    return address;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { districtName, cityId } = request.body;

    const city = await this.cityRepository.findOneBy({ id: cityId });

    const district = Object.assign(new City(), { districtName, city });

    return this.districtRepository.save(district);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { districtName, cityId } = request.body;
    const city = await this.cityRepository.findOneBy({ id: cityId });

    if (city)
      return this.districtRepository.update({ id }, { districtName, city });
    else return false;
  }
}
