import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Town } from "../entity/Town";
import { Like } from "typeorm";

export class SearchController {
  private townRepository = AppDataSource.getRepository(Town);

  async all(request: Request, response: Response, next: NextFunction) {
    const search = request.query["search"] as string;

    return this.townRepository.find({
      where: [
        { townName: Like(`%${search}%`) },
        { district: { districtName: Like(`%${search}%`) } },
        { district: { city: { cityName: Like(`%${search}%`) } } },
        {
          district: { city: { country: { countryName: Like(`%${search}%`) } } },
        },
      ],
      relations: {
        district: { city: { country: true } },
        address: { user: { email: true, phone: true } },
      },
    });
  }
}
