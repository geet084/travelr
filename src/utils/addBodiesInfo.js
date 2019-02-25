import { addSunMoonImageIds } from './addImageIds';

export const addBodiesInfo = () => {
  let bodyData = [{
    average_temperature: "5778 K",
    diameter: "1392000 km",
    distance_from_sun: "0",
    id: 11,
    length_of_day: "587 hours",
    moons: 0,
    name: "Sun",
    orbital_period: "225000000 years",
  },
  {
    average_temperature: "235 K",
    diameter: "3475 km",
    distance_from_sun: " 147,000,000 / 152,000,000 km",
    id: 12,
    length_of_day: "708 hours",
    moons: 0,
    name: "Moon",
    orbital_period: "27 days",
  }]
  return addSunMoonImageIds(bodyData)
}

export default addBodiesInfo;