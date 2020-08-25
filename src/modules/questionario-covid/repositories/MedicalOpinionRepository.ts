import MedicalOpinionModel from '@modules/questionario-covid/infra/typeorm/entities/MedicalOpinionModel';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MedicalOpinionModel)
class MedicalOpinionRepository extends Repository<MedicalOpinionModel> {}

export default MedicalOpinionRepository;
