'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "../../lib/supabaseClient"
import logo from "../../assets/logo.png"

import FormInputField from "../../components/FormInputField"

import "../Forms.css"
import RequireGuest from "../../routes/RequireGuest"
import type { InputType } from "../../Types"

const fields = [
    {
        fieldName: "Email",
        fieldId: "email",
        fieldType: "email",
        inputType: "text"
    },
    {
        fieldName: "Password",
        fieldId: "password",
        fieldType: "password",
        inputType: "password",
        minLength: 10
    }
];

const Login = () => {

    const router = useRouter();
    const [fieldValidity, setFieldValidity] = useState<Record<string, boolean>>({});
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleValueChange = (fieldId: string, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleValidate = (fieldId: string, isValid: boolean) => {
        setFieldValidity(prev => ({ ...prev, [fieldId]: isValid }))
    }

    const formValid = fields.every(f => fieldValidity[f.fieldId] === true)

    const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
       e.preventDefault();

        if (!formValid) return;

        const { email, password } = formValues;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error.message);
            return;
        }

        console.log("Logged in:", data);

        router.push("/dashboard");

    }

    return <><RequireGuest>
        <main className="forms">

        <section>
            <form onSubmit={handleLogin}>

                <div className="header">
                    <div className="icon">
                        <Image src={logo} alt="Drachma logo" fill />
                    </div>
                    <h1>Log In</h1>
                    <hr/>
                </div>

                {fields.map(field => (
                    <FormInputField
                    key={field.fieldId}
                    fieldName={field.fieldName}
                    fieldId={field.fieldId}
                    fieldType={field.fieldType}
                    inputType={field.inputType as InputType}
                    minLength={field.minLength}
                    value={formValues[field.fieldId] || ""}
                    onChangeValue={handleValueChange}
                    onValidate={handleValidate}
                    />
                ))}

                <p id="forgot_password">
                    <span onClick={() => {alert("WORK IN PROGRESS")}} className="link">Forgot Password</span>
                </p>

                <button type="submit" id="submit" disabled={!formValid}>Log In</button>

                <hr/>

                <p>Don't have an account? <span onClick={() => {router.push("/signup")}} className="link">Create account</span>.</p>

            </form>
        </section>

        <section className="banner">
            <div className="title">
                <h1>
                    Welcome back to Drachma!
                </h1>
            </div>
        </section>

        </main>
    </RequireGuest></>

}

export default Login
