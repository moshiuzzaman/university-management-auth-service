import initAcademicDepartmentEvent from '../modules/academicDepartment/academicDepartment.events';
import initAcademicSemesterEvent from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvent();
  initAcademicDepartmentEvent();
};

export default subscribeToEvents;
