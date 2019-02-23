const Planets = {
  Mercury: ['PIA14250', 'PIA16341'],
  Venus: ['PIA00271', 'PIA01544'],
  Earth: ['PIA00342', 'PIA18033'],
  Mars: ['PIA13163', 'PIA18595', 'PIA17305', 'PIA07269'],
  Jupiter: ['PIA21390','PIA00343', 'PIA01370'],
  Saturn: ['PIA22766','PIA01464', 'PIA07538'],
  Uranus: ['GSFC_20171208_Archive_e000100','PIA00034', 'PIA17306'],
  Neptune: ['PIA01492','PIA01142','PIA02210', 'PIA01142'],
}

export const addImageIds = (planets) => {

  return planets.map(planet => {
    return { ...planet, imageIDs: Planets[planet.name] }
  })
}

export default addImageIds;