export const handleObjectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_OBJECTS_SUCCESS':
      return action.objects;
    default:
      return state;
  }
}