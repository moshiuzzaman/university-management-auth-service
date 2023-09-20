import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constants';
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

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (e: string) => {
      const academicDepartmentData = JSON.parse(e);
      await AcademicDepartmentService.updateDepartmentFromEvent(
        academicDepartmentData
      );
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    async (id: string) => {
      const syncId = JSON.parse(id);
      await AcademicDepartmentService.deleteDepartmentFromEvent(syncId);
    }
  );
};

export default initAcademicDepartmentEvent;
