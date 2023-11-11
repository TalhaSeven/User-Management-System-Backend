import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { City } from "../entity/City";
import { Country } from "../entity/Country";
import { Address } from "../entity/Address";

export class CityController {
  private cityRepository = AppDataSource.getRepository(City);
  private countryRepository = AppDataSource.getRepository(Country);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.cityRepository.find({
      relations: { address: true, district: { town: true }, country: true },
    });
  }

  async cityUsers(request: Request, response: Response, next: NextFunction) {
    const cityId = parseInt(request.params.cityId);
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      response.status(404);
      return "Not city found";
    }

    const address = await this.addressRepository.find({
      where: {
        city
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
    const { cityName, countryId } = request.body;
    const country = await this.countryRepository.findOneBy({ id: countryId });
    const city = Object.assign(new City(), { cityName, country });

    return this.cityRepository.save(city);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { cityName, countryId } = request.body;
    const country = await this.countryRepository.findOneBy({ id: countryId });

    if (country)
      return this.cityRepository.update({ id }, { cityName, country });
    else return false;
  }
}
