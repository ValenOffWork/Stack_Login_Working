import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/users';

const ApiCallsScreen = () => {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  const [users, setUsers] = useState<User[]>([]);

  // 🔹 GET Users (Fetch users on screen load)
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data.users); // Store users in state
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
      console.error(error);
    }
  };

  // 🔹 POST (Create a new user)
  const handleCreateUser = async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };

    try {
      const response = await axios.post(`${API_URL}/add`, newUser);
      setUsers((prev) => [response.data, ...prev]); // Add new user to list
    } catch (error) {
      Alert.alert('Error', 'Failed to create user');
      console.error(error);
    }
  };

  // 🔹 PUT (Update user)
  const handleUpdateUser = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { firstName: 'Updated Name' });
      fetchUsers(); // Refresh users
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
      console.error(error);
    }
  };

  // 🔹 DELETE User
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id)); // Remove user from list
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
      console.error(error);
    }
  };

  // 🔹 Fetch users when the screen loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        API Calls with Axios
      </Text>

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Name: {item.firstName} {item.lastName}</Text>
            <Text>Email: {item.email}</Text>

            <TouchableOpacity onPress={() => handleUpdateUser(item.id)}>
              <Text style={{ color: 'blue' }}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add User Button */}
      <TouchableOpacity
        onPress={handleCreateUser}
        style={{
          backgroundColor: '#007BFF',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{ color: '#fff' }}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApiCallsScreen;
