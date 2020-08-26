import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserQuestionModel from './UserQuestionModel';

@Entity('boavolta_users')
class UserModel {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('bit', { default: false })
  covidSuspect: boolean;

  @Column('datetime', { nullable: true })
  lastTimeAnswered: Date;

  @Column({ default: 'Sem Acompanhamento' })
  userStatus: string;

  @Column('int', { default: 'SEM_SINTOMAS' })
  userSymptoms: number;

  @Column('bit', { default: false })
  showDashboard: boolean;

  @Column('bit', { default: false })
  allowUseBooking: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    type => UserQuestionModel,
    question => question.user,
  )
  questions: UserQuestionModel[];
}

export default UserModel;
