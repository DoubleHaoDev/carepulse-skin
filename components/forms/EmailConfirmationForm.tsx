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


const EmailConfirmationForm = ({isRegister}: {isRegister: boolean}) => {

    //TODO Load user's email when entering this page. Only logged in user can view this page.
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
       async function resendEmailAction() {
           //TODO user can changed email upon resend, thus we need to check in DB if 1. Email belongs to the user. 2. If not, is there a duplicate email in DB

        //    const userData = {username:email,password: password};
        //    console.log(userData);
        //     const res = await fetch('http://localhost:8080/v1/authentication/signup', {
        //         method: "post",
        //         headers: { 'Content-Type': 'application/json' },
        //         mode: 'cors',
        //         body: JSON.stringify(userData)
        //     })
        //     return res;
        }
        // const signUpResponse: Response = await userSignUpAction();
        // if(!signUpResponse.ok){
        //     //Signup failed
        // }
        // setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Thanks for registering CareFusion</h1>
                    <p className="text-dark-700">We've sent an registration confirmation email.
                        <br /> Please check your mail box or resend confirmation email.</p>
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
                <SubmitButton isLoading={isLoading} >Resend Email</SubmitButton>
            </form>
        </Form>
    )
}

export default EmailConfirmationForm;
