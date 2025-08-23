import { useState, useEffect } from 'react';

type LocalUser = { uid?: string; email?: string; displayName?: string } | null;

export const useAuth = () => {
  const [user, setUser] = useState<LocalUser>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Local-only mode: no authentication; set loading to false immediately.
    setLoading(false);
  }, []);

  const checkEmail = async (_email: string) => {
    // Local-only mode: no email lookup
    return false;
  };

  const signInWithGoogle = async () => {
    // Local-only mode: no-op
    return;
  };

  const signInWithEmail = async (_email: string, _password: string) => {
    // Local-only mode: no-op
    return;
  };

  const createAccount = async (_email: string, _password: string, _displayName: string) => {
    // Local-only mode: no-op
    return;
  };

  const signOutUser = async () => {
    // Local-only mode: ensure user is null
    setUser(null);
  };

  return {
    user,
    loading,
    checkEmail,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    signOutUser
  };
};