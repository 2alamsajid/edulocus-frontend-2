import { TCreateSubscriptionRequest } from "./schema";

export const createSubscriptionRequest = async (formData: TCreateSubscriptionRequest): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/create-subscription-request`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while creating the membership request!" };
    }
};