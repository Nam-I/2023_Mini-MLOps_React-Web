import withAuthRedirect from "../components/withAuthRedirect";
import Data from "./Data";
import UserLog from "./UserLog";
import DashBoard from "./DashBoard";
import ModelTrain from "./ModelTrain";
import ModelDeploy from "./ModelDeploy";

const AuthProtectedDashBoard = withAuthRedirect(DashBoard);
const AuthProtectedData = withAuthRedirect(Data);
const AuthProtectedModelTrain = withAuthRedirect(ModelTrain);
const AuthProtectedModelDeploy = withAuthRedirect(ModelDeploy);
const AuthProtectedUserLog = withAuthRedirect(UserLog);

export {
  AuthProtectedDashBoard,
  AuthProtectedData,
  AuthProtectedModelDeploy,
  AuthProtectedModelTrain,
  AuthProtectedUserLog,
};
