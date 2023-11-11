import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

enum phoneType {
    JOB = "iş",
    HOME = "ev",
    OTHER = "diğer",
  }

@Entity()
export class Phone {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: "enum", enum: phoneType, default: phoneType.HOME})
    phoneType: phoneType
    
    @Column()
    phoneNumber: string
    
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}
