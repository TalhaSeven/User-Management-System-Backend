import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Country } from "./Country"
import { District } from "./District"
import { Address } from "./Address"

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cityName: string

    @ManyToOne(() => Country, (country) => country.id)
    @JoinColumn()
    country: Country

    @OneToMany(() => District, (district) => district.city)
    district: District

    @OneToMany(() => Address, (address) => address.city)
    address: Address

}
