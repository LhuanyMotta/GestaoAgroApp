export const colors = {
  primary: '#2E7D32',
  secondary: '#4CAF50',
  lightGreen: '#8BC34A',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  error: '#D32F2F',
  textSecondary: '#666',
};

export const fonts = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
};

export const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  homeContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  homeTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginTop: 10,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 5,
  },
  contactSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  contactTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  inputError: {
    borderColor: colors.error,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: colors.lightGray,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  error: {
    color: colors.error,
    marginBottom: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
};