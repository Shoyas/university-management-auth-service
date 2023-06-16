import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty>;

// service a jkhn amra getFaculties banai...tokhn searchTerm er type lage

export type IAcademicFacultyFilter = {
  searchTerm: string;
};
