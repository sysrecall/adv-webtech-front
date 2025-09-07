import RegisterForm from "../components/RegisterForm";

export default function Register() {
    return (
        <div className="h-screen grid content-center justify-center gap-2">
                <div className="text-center font-bold text-4xl">
                    <p>REGISTER</p>
                </div>
                <div className="bg-accent">
                    <RegisterForm />
                </div>
        </div>
    );
}