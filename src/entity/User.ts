import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Phone } from "./Phone";
import { Email } from "./Email";
import { Address } from "./Address";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => Phone, (phone) => phone.user)
  phone: Phone;

  @OneToMany(() => Email, (email) => email.user)
  email: Email;

  @OneToMany(() => Address, (address) => address.user)
  address: Address;

}
