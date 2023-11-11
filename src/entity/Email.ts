import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

enum emailType {
  JOB = "iş",
  HOME = "ev",
  OTHER = "diğer",
}

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: emailType, default: emailType.HOME })
  emailType: emailType;

  @Column()
  emailAddress: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
