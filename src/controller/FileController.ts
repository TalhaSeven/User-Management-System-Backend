import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Country } from "../entity/Country";
import { City } from "../entity/City";
import { District } from "../entity/District";
import { Town } from "../entity/Town";
import { User } from "../entity/User";
import { Phone } from "../entity/Phone";
import { Email } from "../entity/Email";
import { Address } from "../entity/Address";

export class FileController {
  private countryRepository = AppDataSource.getRepository(Country);
  private cityRepository = AppDataSource.getRepository(City);
  private districtRepository = AppDataSource.getRepository(District);
  private townRepository = AppDataSource.getRepository(Town);
  private userRepository = AppDataSource.getRepository(User);
  private phoneRepository = AppDataSource.getRepository(Phone);
  private emailRepository = AppDataSource.getRepository(Email);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    const fs = require("fs");
    const file = await fs.promises.readFile(
      "./public/address.json",
      "utf8",
      (err: any, data: any) => {
        if (err) return false;
        return true;
      }
    );

    const fileJson = JSON.parse(file);

    await fileJson.map(async (k: any) => {
      const country = Object.assign(new Country(), {
        countryName: k.name,
      });
      const insertCountry = await this.countryRepository.save(country);

      k.sub.map(async (l: any) => {
        const city = Object.assign(new City(), {
          cityName: l.name,
          country: insertCountry,
        });
        const insertCity = await this.cityRepository.save(city);

        l.sub.map(async (t: any) => {
          const district = Object.assign(new District(), {
            districtName: t.name,
            city: insertCity,
          });
          const insertDistrict = await this.districtRepository.save(district);

          t.sub.map(async (v: any) => {
            const town = Object.assign(new Town(), {
              townName: v,
              district: insertDistrict,
            });
            const insertTown = await this.townRepository.save(town);
          });
        });
      });
    });

    const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let x of users) {
      const user = Object.assign(new User(), {
        firstName: "Test" + x,
        lastName: "User" + x,
        age: x,
      });
      await this.userRepository.save(user);

      const phone = Object.assign(new Phone(), {
        phoneType: "home",
        phoneNumber: "500 000 00 0" + x,
        user,
      });
      await this.phoneRepository.save(phone);

      const email = Object.assign(new Email(), {
        emailType: "home",
        emailAddress: `abc${x}@xyz.com`,
        user,
      });
      await this.emailRepository.save(email);
    }

    for (let x of users) {
      const user = await this.userRepository.findOne({ where: { id: x } });
      const country = await this.countryRepository.findOne({
        where: { id: 1 },
      });
      const city = await this.cityRepository.findOne({ where: { id: x } });
      const district = await this.districtRepository.findOne({
        where: { id: x },
      });
      const town = await this.townRepository.findOne({ where: { id: x } });

      const address = Object.assign(new Address(), {
        addressType: "home",
        addressLine: "1204" + x + " SK",
        street: "1204" + x,
        post_code: "2000" + x,
        location: "123,45" + x,
        user,
        country,
        city,
        district,
        town,
      });
      await this.addressRepository.save(address);
    }

    return true;
  }
}
