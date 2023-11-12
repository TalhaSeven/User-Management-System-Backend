import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { District } from "./District";
import { Address } from "./Address";

@Entity()
export class Town {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  townName: string;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn()
  district: District;

  @OneToMany(() => Address, (address) => address.town)
  address: Address;

}
