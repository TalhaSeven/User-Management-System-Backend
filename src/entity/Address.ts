import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Country } from "./Country";
import { City } from "./City";
import { District } from "./District";
import { Town } from "./Town";

enum addressType {
  JOB = "iş",
  HOME = "ev",
  OTHER = "diğer",
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: addressType, default: addressType.HOME })
  addressType: addressType;

  @Column()
  addressLine: string;

  @Column()
  street: string;

  @Column()
  post_code: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Country, (country) => country.id, { cascade: true })
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn()
  city: City;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn()
  district: District;

  @ManyToOne(() => Town, (town) => town.id)
  @JoinColumn()
  town: Town;
}
