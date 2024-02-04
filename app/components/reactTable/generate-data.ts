import { faker } from "@faker-js/faker";

interface RowData {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
}

const generateData = (
  totalRows = 5
): { data: RowData[]; columns: string[] } => {
  let rows: RowData[] = [];
  for (let i = 0; i < totalRows; i++) {
    rows.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int(40),
      visits: faker.number.int(1000),
    });
  }

  return {
    data: rows,
    columns: Object.keys(rows[0]),
  };
};

export default generateData;
