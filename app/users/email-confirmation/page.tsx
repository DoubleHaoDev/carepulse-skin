import Image from "next/image";
import EmailConfirmationForm from "@/components/forms/EmailConfirmationForm";


export default function EmailConfirmation({searchParams}: SearchParamProps) {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="Patient"
                        className="mb-12 h-10 w-fit"
                    />
                    <EmailConfirmationForm isRegister={false}/>
                </div>
            </section>
            <Image
                src="/assets/images/onboarding-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[50%]"
            />
        </div>
    );
}
