import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MedicalOpinionModel from './MedicalOpinionModel';
import UserModel from './UserModel';

@Entity('boavolta_userquestion')
class UserQuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(type => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column()
  email: string;

  @Column('bit', { default: false })
  userFeelingGood: boolean;

  @Column()
  userSymptomStatus: string;

  @Column()
  questions: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    type => MedicalOpinionModel,
    opinion => opinion.question,
  )
  @JoinColumn({ name: 'id' })
  opinion: MedicalOpinionModel[];
}

export default UserQuestionModel;
