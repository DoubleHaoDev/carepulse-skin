"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod";
import {Form} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {UserRegisterFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {FormFieldType} from "@/components/forms/PatientForm";


const UserRegisterForm = ({isRegister}: {isRegister: boolean}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] =useState(false);
    const form = useForm<z.infer<typeof UserRegisterFormValidation>>({
        resolver: zodResolver(UserRegisterFormValidation),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit({email, password, confirmPassword}: z.infer<typeof UserRegisterFormValidation>) {
        setIsLoading(true);
       async function userSignUpAction() {
           const userData = {username:email,password: password};
           console.log(userData);
            const res = await fetch('http://localhost:8080/v1/authentication/signup', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(userData)
            })
            return res;
        }
        const signUpResponse: Response = await userSignUpAction();
        if(!signUpResponse.ok){
            //Signup failed
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi There</h1>
                    <p className="text-dark-700">Schedule your first appointment.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    iconSrc="/assets/icons/password.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    iconSrc="/assets/icons/password.svg"
                    iconAlt="user"
                />
                <SubmitButton isLoading={isLoading} >Register</SubmitButton>
            </form>
        </Form>
    )
}

export default UserRegisterForm;
