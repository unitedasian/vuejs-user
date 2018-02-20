const isLoggedIn = state => state.isLoggedIn

const isRefreshExpired = state => state.isRefreshExpired

const isRequestPending = state => state.isRequestPending

const isSocialAuthPending = state => state.isSocialAuthPending

const locale = state => state.locale

const tokenExpiresAt = state => state.tokenExpiresAt

export default function (options) {
  const profile = state => {
    options.profileModel.init(state.user && state.user.profile)

    return options.profileModel
  }

  const user = state => {
    options.userModel.init(state.user)

    return options.userModel
  }

  return {
    isLoggedIn,
    isRefreshExpired,
    isRequestPending,
    isSocialAuthPending,
    locale,
    profile,
    tokenExpiresAt,
    user
  }
}
