const { faker } = require("@faker-js/faker");
const { BANGLADESH_CITIES } = require("./constant");
const { connect } = require("./mongo");

function createRandomUser() {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const phone = faker.phone.number('01#########');
  const age = faker.datatype.number({ min: 20, max: 100 });
  const city = faker.helpers.arrayElement(BANGLADESH_CITIES);
  const name = `${firstName} ${lastName}`;

  return {
    name,
    phone,
    age,
    city,
  };
}

(async () => {
  await connect();
  const { insert } = require("./students.service");
  console.time("dbsave");
  for (let index = 0; index < 1000000; index++) {
    const user = createRandomUser();
    console.log(user.phone);
    await insert(user);
  }
  console.timeEnd("dbsave");
})();
