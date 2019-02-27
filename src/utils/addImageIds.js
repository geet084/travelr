const Planets = {
  Mercury: 'PIA14250',
  Venus: 'PIA00271',
  Earth: 'GSFC_20171208_Archive_e001150',
  Mars: 'PIA02181',
  Jupiter: 'PIA22425',
  Saturn: 'PIA22766',
  Uranus: 'GSFC_20171208_Archive_e000100',
  Neptune: 'PIA01492',
}

const Bodies = {
  Moon: 'PIA00404',
  Sun: 'GSFC_20171208_Archive_e001435'
}

export const addPlanetImageIds = (planets) => {

  return planets.map(planet => {
    return { ...planet, imageIDs: Planets[planet.name] }
  })
}

export const addSunMoonImageIds = (bodies) => {

  return bodies.map(body => {
    return { ...body, imageIDs: Bodies[body.name] }
  })
}

export default { addPlanetImageIds, addSunMoonImageIds };