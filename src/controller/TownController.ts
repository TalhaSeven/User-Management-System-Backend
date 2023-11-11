import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Town } from "../entity/Town";
import { District } from "../entity/District";
import { Address } from "../entity/Address";

export class TownController {
  private townRepository = AppDataSource.getRepository(Town);
  private districtRepository = AppDataSource.getRepository(District);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.townRepository.find({ relations: { district: true } });
  }

  async townUsers(request: Request, response: Response, next: NextFunction) {
    const townId = parseInt(request.params.townId);
    const town = await this.townRepository.findOne({
      where: {
        id: townId,
      },
    });

    if (!town) {
      response.status(404);
      return "Not town found";
    }

    const address = await this.addressRepository.find({
      where: {
        town
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
    const { townName, districtId } = request.body;
    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });
    const town = Object.assign(new Town(), { townName, district });

    return this.townRepository.save(town);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { townName, districtId } = request.body;
    const district = await this.districtRepository.findOneBy({
      id: districtId,
    });

    if (district)
      return this.townRepository.update({ id }, { townName, district });
    else return false;
  }
}
