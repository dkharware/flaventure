'use server';

import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const contactSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendContactMessage(prevState: any, formData: FormData) {
    const validatedFields = contactSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    // Here you would typically send an email or save to a database.
    // For now, we'll just simulate a successful submission.
    console.log('Contact Form Submitted:');
    console.log(validatedFields.data);

    return {
        message: "Your message has been sent successfully!",
    };
}