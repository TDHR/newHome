import Explorer from './explorer/index';
import Login from './platform/login';
import Signup from './platform/signup';
import Reset from './platform/reset';
import Profile from './platform/profile';
import VerifyId from './platform/verify-id';
import ChangePassword from './platform/change-password';
import Dividend from './platform/dividend';
import ChangePhone from './platform/change-phone';
import VerifyBankCard from './platform/verify-bank-card';
import RiskTolerance from './platform/risk-tolerance';
import GetRewards from './platform/get-rewards';

export default {
  explorer: Explorer,
  login: Login,
  signup: Signup,
  reset: Reset,
  profile: Profile,
  verifyId: VerifyId,
  changePassword: ChangePassword,
  dividend: Dividend,
  changePhone: ChangePhone,
  verifyBankCard: VerifyBankCard,
  riskTolerance: RiskTolerance,
  getRewards: GetRewards
};