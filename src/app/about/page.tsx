
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const pageContent = {
    paragraph1: "Welcome to easyfreecv, your source for insightful articles on career development, technology, and design. Our mission is to provide high-quality content that informs, inspires, and empowers our readers.",
    paragraph2: "We believe that knowledge should be accessible to everyone. That's why we've created this platform to share our expertise and connect with a community of curious and ambitious individuals.",
    paragraph3: "Our blog covers a wide range of topics, from in-depth tutorials on the latest software development trends to practical advice on navigating the modern workplace. We strive to create content that is not only informative but also engaging and easy to digest.",
    paragraph4: "Thank you for visiting. We hope you'll find our articles helpful and thought-provoking. Feel free to reach out with any questions or feedback!"
};


export default async function AboutPage() {
  const pageTitle = "About Our Blog";

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <>
              <p>{pageContent.paragraph1}</p>
              <p>{pageContent.paragraph2}</p>
              <p>{pageContent.paragraph3}</p>
              <p>{pageContent.paragraph4}</p>
            </>
        </CardContent>
      </Card>
    </div>
  );
}
