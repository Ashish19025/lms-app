import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/auth.store';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  // user - The user data to display in the profile header, including avatar, username, and email
  user: any;
}


/* ProfileHeader - A component to display the user's profile information at the top of the profile screen
   Props:
     - user: The user data to display, including avatar, username, and email
    Features:
      - Displays user's avatar with option to change it by picking a new image from the library
      - Shows username and email below the avatar
      - Includes an "Edit Profile" button for future profile editing functionality
*/
export function ProfileHeader({ user }: Props) {
  // Access the updateUser function from the auth store to update user information locally
  const updateUser = useAuthStore(state => state.updateUser);
  // Local state to manage the uploading status of the profile picture
  const [isUploading, setIsUploading] = useState(false);


  // Handle the process of picking a new profile image from the user's library
  const handlePickImage = async () => {
    try {
      // Request permission to access the media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      // If permission is not granted, show an alert and exit the function
      if (permissionResult.granted === false) {
        Alert.alert('Permission needed', 'You need to grant camera roll permissions to change your avatar.');
        return;
      }

      // Launch the image library to allow the user to pick a new profile picture
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      // If the user picked an image and did not cancel, update the user's avatar with the new image URI
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIsUploading(true);
        const newAvatarUri = result.assets[0].uri;
        
        // In a real app we'd upload to backend first, but we simulate it here by saving purely locally
        updateUser({ avatar: newAvatarUri });
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
      Alert.alert('Error', 'Failed to update profile picture');
      setIsUploading(false);
    }
  };

  return (
    <View className="px-6 pt-6 pb-8 bg-white rounded-b-3xl shadow-sm">
      {/* Profile picture section with option to change the avatar */}
      <View className="items-center">
        <View className="relative">
          <Image
            source={{
              uri:
                user?.avatar?.url ||
                (typeof user?.avatar === 'string' && user.avatar.trim() !== '' ? user.avatar : `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=2563EB&color=fff&size=300`)
            }}
            className="w-28 h-28 rounded-full border-4 border-blue-100 bg-gray-200"
            resizeMode="cover"
            style={{ opacity: isUploading ? 0.5 : 1 }}
          />
          <TouchableOpacity 
            onPress={handlePickImage}
            className="absolute bottom-0 right-0 bg-blue-600 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
          >
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        {/* Display user's username and email below the avatar, with fallback values if not available */}
        <Text className="mt-4 text-2xl font-bold text-gray-900">
          {user?.username || 'Guest User'}
        </Text>
        {/* Display user's email with a fallback value if not available, styled as a smaller, gray text below the username */}
        <Text className="mt-1 text-sm text-gray-500">
          {user?.email || 'guest@example.com'}
        </Text>        
        {/* Edit Profile button for future profile editing functionality, styled as a blue button with white text */}    
        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-5 px-5 py-3 bg-blue-600 rounded-2xl"
        >
          <Text className="text-white font-semibold">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}