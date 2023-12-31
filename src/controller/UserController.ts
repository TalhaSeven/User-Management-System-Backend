import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Like } from "typeorm";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({
      relations: { phone: true, address: true, email: true },
    });
  }

  async search(request: Request, response: Response, next: NextFunction) {
    const firstName = request.query["firstName"] as string;
    const lastName = request.query["lastName"] as string;
    return this.userRepository.find({
      where: {
        firstName: Like(`%${firstName}%`),
        lastName: Like(`%${lastName}%`),
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age }: User = request.body;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.id);
    const { firstName, lastName, age }: User = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.update(
      {
        id: userId,
      },
      { firstName, lastName, age }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
