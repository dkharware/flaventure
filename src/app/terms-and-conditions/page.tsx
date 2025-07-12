import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground prose">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the ResumeFlow website (the "Service") operated by ResumeFlow ("us", "we", or "our").
          </p>
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h3 className="text-xl font-headline text-foreground">Accounts</h3>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          
          <h3 className="text-xl font-headline text-foreground">Intellectual Property</h3>
          <p>
            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of ResumeFlow and its licensors.
          </p>

          <h3 className="text-xl font-headline text-foreground">User Content</h3>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
          </p>

          <h3 className="text-xl font-headline text-foreground">Termination</h3>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h3 className="text-xl font-headline text-foreground">Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.
          </p>

          <h3 className="text-xl font-headline text-foreground">Changes</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
