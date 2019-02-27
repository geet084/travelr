import * as func from './addImageIds';

describe('addImageIds', () => {
  it('should add image ids to planets', () => {
    const mockPlanets = [{ name: 'Mars' }, {name: 'Venus'}]
    const expected = [{ name: 'Mars', imageIDs: 'PIA02181' }, { name: 'Venus', imageIDs: 'PIA00271'}]
    const result = func.addPlanetImageIds(mockPlanets)

    expect(result).toEqual(expected)
  })

  it('should add image ids to other bodies too', () => {
    const mockBodies = [{ name: 'Sun' }, { name: 'Moon' }]
    const expected = [{ name: 'Sun', imageIDs: 'GSFC_20171208_Archive_e001435' }, { name: 'Moon', imageIDs: 'PIA00404' }]
    const result = func.addSunMoonImageIds(mockBodies)

    expect(result).toEqual(expected)
  })
})