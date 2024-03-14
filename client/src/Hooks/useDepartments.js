import { useState, useEffect } from "react";
import { FETCH_DEPARTMENT_DATA_ERROR } from "../constants/constants";
import { getAllDepartments } from "../services/departmentApi";

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      const allDepartments = await getAllDepartments();

      if (allDepartments !== FETCH_DEPARTMENT_DATA_ERROR) {
        setDepartments(allDepartments);
      } else {
        setError(true);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, error };
};

export { useDepartments };
