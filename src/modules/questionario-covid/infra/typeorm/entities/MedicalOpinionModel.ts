import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserQuestionModel from './UserQuestionModel';

@Entity('boavolta_medicalopinion')
class MedicalOpinionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionId: string;

  @Column()
  userStatus: string;

  @Column()
  opinion: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => UserQuestionModel)
  @JoinColumn({ name: 'questionId' })
  question: UserQuestionModel;
}

export default MedicalOpinionModel;
