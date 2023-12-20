export enum EAuthenticatePageType {
  LOGIN = 'login',
  SET_PASSWORD = 'setPassword',
  SUPER_ADMIN_SET_PASSWORD = 'superAdminSetPassword',
  SUPER_ADMIN_RESET_PASSWORD = 'superAdminResetPassword',
  RESET_PASSWORD = 'resetPassword',
  FORGOT_PASSWORD = 'forgotPassword',
  FORGOT_PASSWORD_CONFIRM = 'forgotPasswordConfirm',
  EXPIRED_LINK = 'expiredLink',
  SELECT_FLEET = 'setFleet'
}

export enum EAuthenticatePageName {
  LOGIN = 'Login',
  SET_PASSWORD = 'Set Password',
  SUPER_ADMIN_SET_PASSWORD = 'Super Admin Set Password',
  SUPER_ADMIN_RESET_PASSWORD = 'Super Admin Reset Password',
  RESET_PASSWORD = 'Reset Password',
  FORGOT_PASSWORD = 'Forgot Password',
  FORGOT_PASSWORD_CONFIRM = 'Forgot Password Confirm',
  EXPIRED_LINK = 'Expired Link',
  SELECT_FLEET = 'Select the fleet'
}

export enum EAuthenticatePageTitle {
  LOGIN = 'Log in to your account',
  SET_PASSWORD = 'Set password',
  SUPER_ADMIN_SET_PASSWORD = 'Set password',
  SUPER_ADMIN_RESET_PASSWORD = 'Create new password',
  RESET_PASSWORD = 'Create new password',
  FORGOT_PASSWORD = 'Reset your password',
  FORGOT_PASSWORD_CONFIRM = 'Link sent',
  EXPIRED_LINK = 'Link has expired',
  SELECT_FLEET = 'Select the fleet'
}

export enum EAuthenticatePageGuide {
  LOGIN = 'Welcome back! Please enter your details.',
  SET_PASSWORD = 'Your password must be between 6 and 12 characters long.',
  SUPER_ADMIN_SET_PASSWORD = `Choose a password that's secure and easy to remember. Your password must be between 6 and 12 characters long, 1 number, 1 uppercase letter, 1 lowercase letter, 1 symbol.`,
  SUPER_ADMIN_RESET_PASSWORD = `Choose a password that's secure and easy to remember. Your password must be between 6 and 12 characters long, 1 number, 1 uppercase letter, 1 lowercase letter, 1 symbol.`,
  RESET_PASSWORD = 'Your password must be between 6 and 12 characters long.',
  FORGOT_PASSWORD = `Enter your email and we'll send a reset password link to your inbox.`,
  FORGOT_PASSWORD_CONFIRM = 'If your email in the system, we will send you a reset password link shortly. Please check your inbox.',
  EXPIRED_LINK = 'Sorry, the link to reset your password has expired. Please request a new link to reset your password.',
  SELECT_FLEET = 'Please select the fleet you want to log in'
}
