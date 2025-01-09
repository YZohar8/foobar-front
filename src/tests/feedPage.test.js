import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FeedPage from '../app/feedPage/FeedPage';
import '@testing-library/jest-dom';

// Mock all the necessary dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the API calls
jest.mock('../app/connectToDB/usersConnectToDB', () => ({
  stillLogin: jest.fn(),
}));

jest.mock('../app/connectToDB/postsConnectToDB', () => ({
  getPosts: jest.fn(),
  getSearchPosts: jest.fn(),
}));

jest.mock('../app/connectToDB/friendsConnectToDB', () => ({
  getApprovedFriends: jest.fn(),
}));

// Mock child components to prevent their full rendering
jest.mock('../app/editUser/EditUser', () => {
  return function MockEditUser() {
    return <div data-testid="mock-edit-user">Edit User Component</div>;
  };
});

jest.mock('../app/leftMenuInFeed/LeftMenuInFeed', () => {
  return function MockLeftMenu(props) {
    return <div data-testid="mock-left-menu">Left Menu Component</div>;
  };
});

jest.mock('../app/profileCard/ProfileCard', () => {
  return function MockProfileCard(props) {
    return <div data-testid="mock-profile-card">Profile Card Component</div>;
  };
});

jest.mock('../app/friendsList/FriendsList', () => {
  return function MockFriendsList(props) {
    return <div data-testid="mock-friends-list">Friends List Component</div>;
  };
});

describe('FeedPage Component', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    image: 'test-image.jpg',
  };

  const mockPosts = [
    {
      id: '1',
      author: {
        id: '1',
        name: 'Test User',
        image: 'test-image.jpg',
      },
      text: 'Test post content',
      image: 'test-post-image.jpg',
      date: '2024-01-07',
      likesCounter: 5,
      commentsCounter: 3,
    },
  ];

  const mockFriends = [
    {
      id: '2',
      name: 'Test Friend',
      image: 'friend-image.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup sessionStorage mock
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'myUser') return JSON.stringify(mockUser);
      if (key === 'myUserId') return '1';
      return null;
    });
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    // Setup successful API responses
    require('../app/connectToDB/usersConnectToDB').stillLogin.mockResolvedValue({ success: true });
    require('../app/connectToDB/postsConnectToDB').getPosts.mockResolvedValue({ success: true, posts: mockPosts });
    require('../app/connectToDB/friendsConnectToDB').getApprovedFriends.mockResolvedValue({
      success: true,
      approvedFriends: mockFriends,
    });
  });

  test('renders feed page correctly when user is logged in', async () => {
    render(
      <Router>
        <FeedPage />
      </Router>
    );

    // Wait for the page to load and verify key components
    await waitFor(() => {
      // Check if mock components are rendered
      expect(screen.getByTestId('mock-left-menu')).toBeInTheDocument();
      expect(screen.getByTestId('mock-profile-card')).toBeInTheDocument();
      expect(screen.getByTestId('mock-friends-list')).toBeInTheDocument();

      // Check if post content is rendered
      expect(screen.getByText('Test post content')).toBeInTheDocument();
    });

    // Verify API calls
    expect(require('../app/connectToDB/usersConnectToDB').stillLogin).toHaveBeenCalled();
    expect(require('../app/connectToDB/postsConnectToDB').getPosts).toHaveBeenCalledWith('1');
    expect(require('../app/connectToDB/friendsConnectToDB').getApprovedFriends).toHaveBeenCalledWith('1');

  });

  test('redirects to login page when user is not logged in', async () => {
    // Mock sessionStorage to return null
    Storage.prototype.getItem = jest.fn(() => null);

    render(
      <Router>
        <FeedPage />
      </Router>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('redirects to login page when stillLogin returns false', async () => {
    require('../app/connectToDB/usersConnectToDB').stillLogin.mockResolvedValue({ success: false });

    render(
      <Router>
        <FeedPage />
      </Router>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('shows error note when posts fetch fails', async () => {
    require('../app/connectToDB/postsConnectToDB').getPosts.mockResolvedValue({
      success: false,
      message: 'Failed to fetch posts',
    });

    render(
      <Router>
        <FeedPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch posts')).toBeInTheDocument();
    });
  });
});
