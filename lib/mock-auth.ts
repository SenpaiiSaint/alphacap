export const mockUser = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  image: "/avatars/demo.png",
  role: "admin",
  permissions: ["view", "edit", "admin"],
};

export const mockSession = {
  user: mockUser,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

export const useMockAuth = () => {
  return {
    data: mockSession,
    status: "authenticated",
    error: null,
    loading: false,
  };
};
