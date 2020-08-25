import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('boavolta_userspermission')
class UsersPermissionModel {
  @PrimaryColumn()
  email: string;

  @Column('bit', { default: false })
  usarPlataforma: boolean;
}

export default UsersPermissionModel;
