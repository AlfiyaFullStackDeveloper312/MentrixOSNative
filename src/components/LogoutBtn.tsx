import React from 'react';
import LogoutButtonStyle from '../styles/logoutButtonStyle';
import {Text, TouchableOpacity, Modal, Pressable} from 'react-native';

const LogoutButton = ({
  visible,
  onCancel,
  onLogout,
}: {
  visible: boolean;
  onCancel: () => void;
  onLogout: () => void;
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={LogoutButtonStyle.overlay} onPress={onCancel}>
        <Pressable style={LogoutButtonStyle.box}>
          <Text style={LogoutButtonStyle.title}>
            Are you sure you want to logout?
          </Text>

          <Text style={LogoutButtonStyle.subtitle}>
            You will be signed out of your account.
          </Text>

          <TouchableOpacity
            style={LogoutButtonStyle.logoutBtn}
            onPress={onLogout}>
            <Text style={LogoutButtonStyle.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel}>
            <Text style={LogoutButtonStyle.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LogoutButton;
