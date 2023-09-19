import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvent = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const academicSemesterData = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(academicSemesterData);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const academicSemesterData = JSON.parse(e);
    await AcademicSemesterService.updateSemesterFromEvent(academicSemesterData);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    await AcademicSemesterService.deleteSemesterFromEvent(e);
  });
};

export default initAcademicSemesterEvent;
