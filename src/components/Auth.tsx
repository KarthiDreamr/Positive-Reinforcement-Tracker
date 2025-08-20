import React, { useState } from 'react';
import { Mail, Target, Clock, ListTodo, Gift, Volume2, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

type AuthStep = 'email' | 'signin' | 'signup';

export const Auth: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, createAccount, checkEmail } = useAuth();
  const [isEmailSigningIn, setIsEmailSigningIn] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<AuthStep>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailSigningIn(true);
    
    try {
      const exists = await checkEmail(email);
      setStep(exists ? 'signin' : 'signup');
    } catch (err) {
      setError('Error checking email. Please try again.');
    } finally {
      setIsEmailSigningIn(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailSigningIn(true);
    
    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid password. Try signing in with Google instead?');
      } else {
        setError('Invalid password. Please try again.');
      }
    } finally {
      setIsEmailSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsEmailSigningIn(true);
    try {
      await createAccount(email, password, displayName);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in with Google instead?');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsEmailSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups and try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // Don't show error for user-cancelled operations
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const features = [
    {
      icon: <Target className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Track Your Progress',
      description: 'Set and achieve your goals with visual progress tracking'
    },
    {
      icon: <ListTodo className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Custom Task Names',
      description: 'Name and organize your tasks your way'
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Timer Support',
      description: 'Optional timer to help you stay focused'
    },
    {
      icon: <Gift className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Reward System',
      description: 'Set rewards to motivate yourself'
    },
    {
      icon: <Volume2 className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Sound Effects',
      description: 'Satisfying audio feedback for completed tasks'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600 dark:text-emerald-400" />,
      title: 'Celebrations',
      description: 'Visual celebrations when you complete all tasks'
    }
  ];

  const renderAuthForm = () => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isEmailSigningIn}
              className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isEmailSigningIn ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Continue with Email
                </>
              )}
            </button>
          </form>
        );

      case 'signin':
        return (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white mb-4"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isEmailSigningIn}
              className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium"
            >
              {isEmailSigningIn ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
              ) : (
                'Sign In'
              )}
            </button>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleSigningIn}
                className="w-full text-sm text-indigo-600 dark:text-emerald-400 hover:underline"
              >
                Try signing in with Google instead
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-sm text-gray-500 dark:text-slate-400 hover:underline"
              >
                Use a different email
              </button>
            </div>
          </form>
        );

      case 'signup':
        return (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white mb-4"
              />
              <input
                type="text"
                placeholder="Username"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white mb-4"
                required
              />
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white mb-4"
                required
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isEmailSigningIn}
              className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium"
            >
              {isEmailSigningIn ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
              ) : (
                'Create Account'
              )}
            </button>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleSigningIn}
                className="w-full text-sm text-indigo-600 dark:text-emerald-400 hover:underline"
              >
                Try signing in with Google instead
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-sm text-gray-500 dark:text-slate-400 hover:underline"
              >
                Use a different email
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Progress Tracker
        </h1>
        <p className="text-xl text-gray-600 dark:text-slate-400">
          Stay motivated and celebrate your achievements
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <div className="space-y-4">
            {step === 'email' && (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleSigningIn}
                  className="w-full bg-white dark:bg-slate-700 text-gray-800 dark:text-white py-3 px-4 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium flex items-center justify-center gap-3"
                >
                  {isGoogleSigningIn ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-800 dark:border-white"></div>
                  ) : (
                    <>
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                      Continue with Google
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">Or</span>
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {renderAuthForm()}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm p-6 rounded-xl shadow-lg"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};