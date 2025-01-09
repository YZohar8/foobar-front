// utils.test.js
import { validatePostContent, formatPostDate } from '../app/utils/postUtils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadPost from '../app/uploadPost/UploadPost';
import * as postsConnectToDB from '../app/connectToDB/postsConnectToDB';

// --- Pure JavaScript Function Tests ---

// Test 1: Complex validation function
describe('validatePostContent', () => {
  const mockPost = {
    text: "Hello World",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    userId: "123"
  };

  test('validates post content with complex rules', () => {
    const validatePostContent = (post) => {
      const errors = [];
      
      // Text validation
      if (!post.text) errors.push("Text is required");
      if (post.text && post.text.length > 500) errors.push("Text too long");
      if (post.text && post.text.trim().length === 0) errors.push("Text cannot be empty");
      
      // Image validation
      if (post.image) {
        if (!post.image.startsWith('data:image/')) errors.push("Invalid image format");
        if (post.image.length > 5000000) errors.push("Image too large"); // ~5MB in base64
      }
      
      // User validation
      if (!post.userId) errors.push("User ID is required");
      
      return {
        isValid: errors.length === 0,
        errors
      };
    };

    const result = validatePostContent(mockPost);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);

    // Test invalid cases
    const invalidPost = {
      text: "",
      image: "invalid-image",
      userId: ""
    };
    const invalidResult = validatePostContent(invalidPost);
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.errors).toContain("Text cannot be empty");
    expect(invalidResult.errors).toContain("Invalid image format");
    expect(invalidResult.errors).toContain("User ID is required");
  });
});

// Test 2: Date formatting function
describe('formatPostDate', () => {
  test('formats post date with various conditions', () => {
    const formatPostDate = (date) => {
      const now = new Date();
      const postDate = new Date(date);
      const diffTime = Math.abs(now - postDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 1) {
        const hours = Math.ceil(diffTime / (1000 * 60 * 60));
        if (hours < 1) {
          const minutes = Math.ceil(diffTime / (1000 * 60));
          return `${minutes} minutes ago`;
        }
        return `${hours} hours ago`;
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return postDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    };

    // Test various date scenarios
    const now = new Date();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now - 7 * 24 * 60 * 60 * 1000);
    
    expect(formatPostDate(now)).toMatch(/minutes ago/);
    expect(formatPostDate(yesterday)).toBe('Yesterday');
    expect(formatPostDate(lastWeek)).toMatch(/\w+ \d{1,2}, \d{4}/);
  });
});

// --- Component Tests ---

// Mock the router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the API
jest.mock('../app/connectToDB/postsConnectToDB', () => ({
  addPost: jest.fn()
}));

// Test 3: Complex component test - Full post creation flow
describe('UploadPost Component - Complex Flow', () => {
  const mockUser = {
    id: "2",
    name: "test",
    email: "test@example.com",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
  };

  const mockProps = {
    myUser: mockUser,
    name: mockUser.name,
    profilePic: mockUser.image,
    whenAddPost: jest.fn(),
    setErrorNote: jest.fn()
  };

  test('handles complete post creation flow with image', async () => {
    render(<UploadPost {...mockProps} />);
    
    // Simulate text input
    const textArea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textArea, { target: { value: 'my test' } });
    
    // Simulate file upload
    const file = new File(['test image'], 'test.png', { type: 'image/png' });
    const input = screen.getByAcceptingImage();
    
    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/png;base64,testimage',
      onloadend: null
    };
    global.FileReader = jest.fn(() => mockFileReader);
    
    fireEvent.change(input, { target: { files: [file] } });
    mockFileReader.onloadend();
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(postsConnectToDB.addPost).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'my test',
          image: 'data:image/png;base64,testimage'
        }),
        mockUser.id
      );
      expect(mockNavigate).toHaveBeenCalledWith('/feed');
      expect(mockProps.whenAddPost).toHaveBeenCalled();
      expect(textArea.value).toBe('');
    });
  });
});

// Test 4: Complex component test - Error handling and UI feedback
test('handles errors with appropriate UI feedback', async () => {
  postsConnectToDB.addPost.mockRejectedValue(new Error('Network error'));
  
  render(<UploadPost {...mockProps} />);
  
  // Simulate multiple user actions
  const textArea = screen.getByPlaceholderText("What's on your mind?");
  fireEvent.change(textArea, { target: { value: 'my test' } });
  
  const submitButton = screen.getByRole('button', { name: /post/i });
  
  // First attempt - trigger error
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(mockProps.setErrorNote).toHaveBeenCalledWith(
      expect.stringContaining('Network error')
    );
  });
  
  // Reset mocks and try again
  jest.clearAllMocks();
  postsConnectToDB.addPost.mockResolvedValue({ success: true });
  
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/feed');
    expect(mockProps.setErrorNote).not.toHaveBeenCalled();
  });
});

// Test 5: Simple component test
test('displays user information correctly', () => {
  render(<UploadPost {...mockProps} />);
  
  expect(screen.getByAltText(`${mockProps.name}'s profile`)).toHaveAttribute('src', mockProps.profilePic);
  expect(screen.getByText(mockProps.name)).toBeInTheDocument();
});