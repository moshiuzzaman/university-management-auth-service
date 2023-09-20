import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constant';
import { AcademicFacultyServices } from './academicFaculty.services';

const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
    const academicFacultyData = JSON.parse(e);
    await AcademicFacultyServices.createFacultyFromEvent(academicFacultyData);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
    const academicFacultyData = JSON.parse(e);
    await AcademicFacultyServices.updateFacultyFromEvent(academicFacultyData);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (id: string) => {
    const syncId = JSON.parse(id);
    await AcademicFacultyServices.deleteFacultyFromEvent(syncId);
  });
};

export default initAcademicFacultyEvents;
