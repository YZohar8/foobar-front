import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadPost from '../app/uploadPost/UploadPost';
import * as postsConnectToDB from '../app/connectToDB/postsConnectToDB';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the postsConnectToDB module
jest.mock('../app/connectToDB/postsConnectToDB', () => ({
  addPost: jest.fn()
}));

describe('UploadPost Component', () => {
  const mockUser = {
    id: "2",
    name: "test",
    email: "test@example.com",
    password: "password123",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...", // תמונת Base64 מקוצרת לשם הנוחות
    friends: []
  };

  const mockNewPost = {
    id: 33,
    author: "0",
    text: "my test",
    image: null,
    date: "2024-12-28T14:30:00Z",
    comments: [],
    likes: []
  };

  const mockProps = {
    myUser: mockUser,
    name: mockUser.name,
    profilePic: mockUser.image,
    whenAddPost: jest.fn(),
    setErrorNote: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful post creation with our specific post data
    postsConnectToDB.addPost.mockResolvedValue({ 
      success: true,
      post: mockNewPost
    });
  });

  test('renders upload post form correctly', () => {
    render(<UploadPost {...mockProps} />);

    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
    expect(screen.getByAltText(`${mockUser.name}'s profile`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  test('submits specific test post successfully', async () => {
    render(<UploadPost {...mockProps} />);
    
    // Fill in our specific test post content
    const textArea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textArea, { target: { value: mockNewPost.text } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // Verify addPost was called with our specific test data
      expect(postsConnectToDB.addPost).toHaveBeenCalledWith(
        {
          text: mockNewPost.text,
          image: null
        },
        mockUser.id
      );
      
      // Verify navigation and callback
      expect(mockNavigate).toHaveBeenCalledWith('/feed');
      expect(mockProps.whenAddPost).toHaveBeenCalled();
      
      // Verify form was reset
      expect(textArea.value).toBe('');
    });
  });

  test('handles text input correctly', () => {
    render(<UploadPost {...mockProps} />);
    
    const textArea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textArea, { target: { value: mockNewPost.text } });
    
    expect(textArea.value).toBe(mockNewPost.text);
  });

  test('handles post creation error', async () => {
    // Mock failed post creation
    postsConnectToDB.addPost.mockResolvedValue({ 
      success: false, 
      message: 'Failed to create post' 
    });
    
    render(<UploadPost {...mockProps} />);
    
    // Fill in post content
    const textArea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textArea, { target: { value: mockNewPost.text } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // Verify error handling
      expect(mockProps.setErrorNote).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create post')
      );
      // Verify navigation didn't occur
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('prevents submission with empty text', () => {
    render(<UploadPost {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(submitButton);
    
    // Verify addPost wasn't called
    expect(postsConnectToDB.addPost).not.toHaveBeenCalled();
  });
});