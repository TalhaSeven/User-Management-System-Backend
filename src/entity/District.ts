import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { City } from "./City"
import { Town } from "./Town"

@Entity()
export class District {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    districtName: string

    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn()
    city: City

    @OneToMany(() => Town, (town) => town.district) 
    town: Town
    
}
