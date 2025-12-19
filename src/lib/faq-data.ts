
export interface Faq {
    question: string;
    answer: string;
}

export interface FaqCategory {
    category: string;
    questions: Faq[];
}

export const faqData: FaqCategory[] = [
    {
        category: "General",
        questions: [
            {
                question: "How do you choose your destinations?",
                answer: "We look for places with rich culinary traditions and unique stories. We prioritize destinations that offer authentic experiences, from bustling city markets to remote natural wonders."
            },
            {
                question: "What kind of camera gear do you use?",
                answer: "We use a mix of professional and portable gear. Our primary camera is a Sony A7 IV for high-quality photos and videos, but we also love using our phones for candid shots. Good lighting and a passion for storytelling are our most important tools!"
            },
            {
                question: "How can I start my own travel and food blog?",
                answer: "Start by finding your unique niche and voice. Focus on a specific type of travel or cuisine you're passionate about. Invest in learning basic photography and writing skills, and be consistent with your content. Most importantly, have fun with it!"
            },
            {
                question: "Do you accept guest posts?",
                answer: "Currently, we don't accept guest posts as we want to maintain a consistent voice. However, we are always open to collaboration ideas. Feel free to reach out to us via our contact page."
            },
            {
                question: "How do you handle dietary restrictions when you travel?",
                answer: "We always research local cuisine in advance to understand common ingredients. We learn key phrases in the local language to communicate our needs, and we're never afraid to ask questions. We also pack some of our own snacks just in case."
            }
        ]
    },
    {
        category: "Travel",
        questions: [
            {
                question: "What's your number one travel tip?",
                answer: "Pack light! It's liberating to travel with only a carry-on. It forces you to be resourceful, makes moving around easier, and saves you money on checked baggage fees."
            },
            {
                question: "How do you find authentic local food?",
                answer: "We avoid tourist traps by walking a few blocks away from major attractions. We look for places that are busy with locals, have a small menu, and often, don't have an English menu. Asking locals for recommendations is also a great strategy."
            },
            {
                question: "How do you budget for your trips?",
                answer: "We create a daily budget for accommodation, food, and activities. We use travel credit cards to earn points, and we try to travel during the shoulder seasons to save on flights and lodging."
            },
            {
                question: "What are your must-have travel essentials?",
                answer: "A reusable water bottle, a portable power bank, a universal travel adapter, a comfortable pair of walking shoes, and an open mind!"
            },
            {
                question: "How do you stay safe while traveling?",
                answer: "We always research our destination's safety guidelines, share our itinerary with someone at home, keep copies of important documents, and trust our instincts. We also recommend getting travel insurance."
            },
        ]
    },
    {
        category: "Food",
        questions: [
            {
                question: "What's the most unusual food you've ever tried?",
                answer: "That's a tough one! It might be the fermented shark in Iceland or the deep-fried tarantulas in Cambodia. Both were surprisingly better than they sound and came with fascinating cultural stories."
            },
            {
                question: "How do you recreate recipes from your travels at home?",
                answer: "We take detailed notes, talk to the chefs or home cooks whenever possible, and visit local markets to understand the ingredients. It's a lot of trial and error, but it's a wonderful way to bring our travels home."
            },
            {
                question: "What's a simple way to start exploring international cuisine?",
                answer: "Start with a local restaurant that serves a cuisine you're curious about. Ask the staff for recommendations. At home, try a simple recipe with just a few new ingredients, like a Thai green curry or an Italian cacio e pepe."
            },
            {
                question: "Do you take cooking classes when you travel?",
                answer: "Absolutely! It's one of our favorite ways to connect with local culture. We've learned to make pasta in Italy, pho in Vietnam, and mole in Mexico. It's an immersive and delicious experience."
            },
            {
                question: "What is your favorite food and travel destination?",
                answer: "It's impossible to pick just one! Every place has its own magic. However, the vibrant street food culture of Southeast Asia, the fresh simplicity of Mediterranean cuisine, and the complex flavors of Mexico hold a special place in our hearts."
            }
        ]
    },
];
