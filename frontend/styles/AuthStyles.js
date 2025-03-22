import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start', // Aligns everything from the top
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    marginBottom: 60,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    marginBottom: 20,
    height: 50,
    fontSize: 16,
    borderColor: '#4CAF50', // Green border for inputs
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#4CAF50', // Green button color
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    color: '#388E3C', // Green color for the signup text
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 0,
  },
});

export default styles;
