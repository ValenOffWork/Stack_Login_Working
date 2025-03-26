import database from '@react-native-firebase/database';

export const addUserDate = async userData => {
  try {
    const newPostKey = database().ref('/users').push().key;
    await newPostKey.set(userData);
    console.log('Data added successfully');
  } catch (error) {
    console.error('Error setting data:', error);
  }
};

export const getUserData = async () => {
  try {
    const snapshot = await database().ref('/users').once('value');
    const userData = snapshot.val()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({id, ...data}))
      : [];
    return userData;
  } catch (error) {
    console.error('Error getting data:', error);
  }
};

export const updateUserData = async (id, userUpdatedData) => {
  try {
    await database().ref(`/users/${id}`).update(userUpdatedData);
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export const deleteUserData = async (id) => {
  try {
    await database().ref(`/users/${id}`).remove();
    console.log('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};