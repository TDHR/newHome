import Explorer from './explorer/index';
import Login from './platform/login';
import Signup from './platform/signup';
import Reset from './platform/reset';
import Info from './platform/info';
import VerifyId from './platform/verify-id';
import ModifyPassword from './platform/modify-password';
import Dividend from './platform/dividend';
import ModifyPhone from './platform/modify-phone';
import VerifyBankCard from './platform/verify-bank-card';
import RiskTolerance from './platform/risk-tolerance';

export default {
  explorer: Explorer,
  login: Login,
  signup: Signup,
  reset: Reset,
  info: Info,
  verifyId: VerifyId,
  modifyPassword: ModifyPassword,
  dividend: Dividend,
  modifyPhone: ModifyPhone,
  verifyBankCard: VerifyBankCard,
  riskTolerance: RiskTolerance
};