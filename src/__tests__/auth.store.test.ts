import { useAuthStore } from '../store/auth.store';

describe('Auth Store', () => {
  beforeEach(() => {
    const { user } = useAuthStore.getState();
    if (user) {
      useAuthStore.setState({ user: null, token: null });
    }
  });

  test('should initialize with null user', () => {
    const { user } = useAuthStore.getState();
    expect(user).toBeNull();
  });

  test('should have signIn function', () => {
    const { signIn } = useAuthStore.getState();
    expect(typeof signIn).toBe('function');
  });

  test('should have signOut function', () => {
    const { signOut } = useAuthStore.getState();
    expect(typeof signOut).toBe('function');
  });

  test('should handle error state', () => {
    const { error } = useAuthStore.getState();
    expect(error).toBeNull();
  });

  test('should have updateUser function', () => {
    const { updateUser } = useAuthStore.getState();
    expect(typeof updateUser).toBe('function');
  });
});
