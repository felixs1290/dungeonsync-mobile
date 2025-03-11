import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Shared Styles (used across multiple screens)
  screenContainer: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Cinzel_700Bold',
    color: '#FBBF24',
    marginBottom: 24,
  },
  text: {
    color: '#D1D5DB',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#374151',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#4B5563',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    marginVertical: 8,
    fontFamily: 'Montserrat_400Regular',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 48,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B5563',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    marginVertical: 8,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 40,
    fontFamily: 'Montserrat_400Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#FBBF24',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
  },
  message: {
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    marginVertical: 12,
  },
  headerContainer: {
    paddingTop: 40,
    padding: 0,
    alignItems: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontFamily: 'Cinzel_700Bold',
    color: '#FBBF24',
    marginVertical: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 24,
    fontFamily: 'Cinzel_700Bold',
    color: '#FBBF24',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    color: '#FBBF24',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    width: '40%',
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#374151',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: '#FBBF24',
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
  },

  // LoginScreen Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  signupSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
  signupButton: {
    backgroundColor: '#FBBF24',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
  },

  // SignupScreen Styles
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  roleButton: {
    backgroundColor: '#6B7280',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#FBBF24',
  },
  roleText: {
    color: '#FFFFFF',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
  },

   // PlayerScreen Styles
   listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding to prevent list from overlapping footer
  },
  footerContainer: {
    backgroundColor: '#1F2937',
    alignItems: 'center', // Center contents horizontally
  },
  promptText: {
    color: '#D1D5DB',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  characterCardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  characterCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  characterCardName: {
    fontSize: 18,
    color: '#FBBF24',
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 4,
  },
  characterCardLevel: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
  },
  characterList: {
    paddingBottom: 20,
  },
  touchableBox: {
    backgroundColor: '#374151',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '90%', // Consistent width
    alignSelf: 'center', // Center the button
  },
  touchableText: {
    color: '#FBBF24',
    fontSize: 18,
    fontFamily: 'Cinzel_700Bold',
  },

  // CharacterScreen Styles
  detailContainer: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  characterDetailImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 12,
    alignSelf: 'center',
  },
  detailText: {
    color: '#D1D5DB',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    marginVertical: 4,
  },
  abilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  abilityBox: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 8,
  },
  abilityLabel: {
    color: '#FBBF24',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 4,
  },
  abilityInput: {
    backgroundColor: '#4B5563',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  backpackButton: {
    backgroundColor: '#FBBF24',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },

  // BackpackScreen Styles
  backpackContainer: {
    flex: 1,
    paddingTop: 80,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  itemSubText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // BackButton Styles
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  backButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FBBF24',
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
  },

  // DMHomeScreen Styles
  headerDMScreen: {
    fontSize: 30,
    fontFamily: 'Cinzel_700Bold',
    color: '#FBBF24',
    marginBottom: 24,
  },
  environmentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    width: '100%',
  },
  environmentLeft: {
    flex: 1,
  },
  environmentName: {
    fontSize: 18,
    color: '#FBBF24',
    fontFamily: 'Montserrat_600SemiBold',
  },
  environmentCode: {
    fontSize: 16,
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#FBBF24',
    fontFamily: 'Montserrat_600SemiBold',
    marginRight: 8,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginRight: 8,
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  manageButton: {
    backgroundColor: '#FBBF24',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  manageButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
  },
  environmentList: {
    paddingBottom: 80,
  },

  // DMCreateEnvironmentScreen Styles
  uploadButton: {
    backgroundColor: '#FBBF24',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  addItemsButton: {
    backgroundColor: '#FBBF24',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  merchantList: {
    marginVertical: 10,
    maxHeight: 300,
  },

  // CreateMerchantScreen Styles
  inputRight: {
    backgroundColor: '#4B5563',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    flex: 1,
    fontFamily: 'Montserrat_400Regular',
  },
  picker: {
    flex: 1,
    color: '#D1D5DB',
    backgroundColor: '#4B5563',
    borderRadius: 8,
    padding: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  currencyLabel: {
    color: '#FBBF24',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    marginLeft: 8,
  },
  preBuiltButtonContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  orText: {
    textAlign: 'center',
    color: '#FBBF24',
    fontSize: 18,
    fontFamily: 'Cinzel_700Bold',
    marginVertical: 10,
  },
  fullWidthContentContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B5563',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  categoryIcon: {
    marginLeft: 5,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  stockItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  stockList: {
    maxHeight: 150,
    marginVertical: 8,
  },

  // PreBuiltMerchantsScreen Styles
  merchantBox: {
    width: '45%',
    height: 180,
    margin: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
  },
  merchantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  merchantInfo: {
    marginTop: 8,
    alignItems: 'center',
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    color: '#FBBF24',
    fontFamily: 'Montserrat_600SemiBold',
  },
  characterLevel: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#374151',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    maxHeight: '80%',
    alignSelf: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  buttonRowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    minWidth: 80,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  modalCloseButtonFull: {
    padding: 5,
  },
  modalFullContent: {
    padding: 10,
    paddingBottom: 80,
  },

  // EquipmentList Styles
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  categoryButton: {
    backgroundColor: '#6B7280',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#FBBF24',
  },
  categoryText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat_600SemiBold',
  },
  flatList: {
    flexGrow: 0,
    maxHeight: 400,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  equipmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },

  // Miscellaneous (less commonly used or transitional)
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 1,
  },
  environmentCard: {
    marginVertical: 8,
    padding: 12,
  },
  environmentGrid: {
    paddingVertical: 8,
  },

  // Under DMManageEnvironmentScreen Styles
  shareButton: {
    marginLeft: 10,
  },
  codeContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  codeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qrCode: {
    marginVertical: 10,
  },
});