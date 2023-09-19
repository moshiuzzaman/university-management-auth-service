import initAcademicDepartmentEvent from '../modules/academicDepartment/academicDepartment.events';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemesterEvent from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvent();
  initAcademicDepartmentEvent();
  initAcademicFacultyEvents();
};

export default subscribeToEvents;
