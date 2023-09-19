import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_DEPARTMENT_CREATED } from './academicDepartment.constants';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvent = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const academicDepartmentData = JSON.parse(e);
      await AcademicDepartmentService.createDepartmentFromEvent(
        academicDepartmentData
      );
    }
  );
};

export default initAcademicDepartmentEvent;
