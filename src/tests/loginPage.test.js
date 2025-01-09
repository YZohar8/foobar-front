import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../app/loginPage/LoginPage.js';
import { login } from '../app/connectToDB/usersConnectToDB.js';
import '@testing-library/jest-dom';

jest.mock('../app/connectToDB/usersConnectToDB.js', () => ({
  login: jest.fn(),
}));

const mockNavigate = jest.fn();

// מדמים את הook של useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate, 
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Create new account')).toBeInTheDocument();
  });

  test('shows an error if email and password are empty', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(screen.getByText('Log In'));

    expect(screen.getByText('Email and password are required.')).toBeInTheDocument();
  });

  test('shows an error for invalid email', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
  });

  test('calls login function and navigates on success', async () => {
    login.mockResolvedValueOnce({ success: true });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(login).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/loading', { state: { destination: '/feed' } });
    });
  });

  test('shows an error message on failed login', async () => {
    login.mockResolvedValueOnce({ success: false, message: 'Invalid credentials' });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(login).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});