import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { City } from "./City"
import { Address } from "./Address"

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    countryName: string

    @OneToMany(() => City, (city) => city.country)
    city: City

    @OneToMany(() => Address, (address) => address.country)
    address: Address

}
