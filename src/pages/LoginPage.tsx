import LoginForm from "../components/LoginForm";

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  return <LoginForm onLogin={onLogin} />;
}