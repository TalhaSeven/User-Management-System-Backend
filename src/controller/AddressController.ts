import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { City } from "../entity/City";
import { Country } from "../entity/Country";
import { Address } from "../entity/Address";
import { User } from "../entity/User";
import { District } from "../entity/District";
import { Town } from "../entity/Town";

export class AddressController {
  private addressRepository = AppDataSource.getRepository(Address);
  private userRepository = AppDataSource.getRepository(User);
  private countryRepository = AppDataSource.getRepository(Country);
  private cityRepository = AppDataSource.getRepository(City);
  private districtRepository = AppDataSource.getRepository(District);
  private townRepository = AppDataSource.getRepository(Town);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.addressRepository.find({
      relations: {
        user: true,
        country: true,
        city: true,
        district: true,
        town: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const addressId = parseInt(request.params.id);
    const address = await this.addressRepository.findOne({
      where: {
        id: addressId,
      },
      relations: {
        user: true,
      },
    });

    if (!address) {
      response.status(404);
      return "Not address found";
    }

    return address;
  }

  async userOne(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.userId);
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      response.status(404);
      return "Not user found";
    }

    const address = await this.addressRepository.findOne({
      where: {
        user: user,
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
    const {
      addressType,
      addressLine,
      street,
      post_code,
      location,
      userId,
      countryId,
      cityId,
      districtId,
      townId,
    } = request.body;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });
    const city = await this.cityRepository.findOne({ where: { id: cityId } });
    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });
    const town = await this.townRepository.findOne({ where: { id: townId } });

    const address = Object.assign(new Address(), {
      addressType,
      addressLine,
      street,
      post_code,
      location,
      user,
      country,
      city,
      district,
      town,
    });

    return this.addressRepository.save(address);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const addressId = parseInt(request.params.id);
    const {
      addressType,
      addressLine,
      street,
      post_code,
      location,
      userId,
      countryId,
      cityId,
      districtId,
      townId,
    } = request.body;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });
    const city = await this.cityRepository.findOne({ where: { id: cityId } });
    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });
    const town = await this.townRepository.findOne({ where: { id: townId } });

    return this.addressRepository.update(
      { id: addressId },
      {
        addressType,
        addressLine,
        street,
        post_code,
        location,
        user,
        country,
        city,
        district,
        town,
      }
    );
  }
}
