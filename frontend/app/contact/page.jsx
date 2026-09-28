import { buildMetadata } from '@/lib/metadata';
import ContactPageContent from '@/components/pages/ContactPageContent';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Indo Aquatic Ltd to discuss supply requirements or find out more about our frozen seafood range.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactPageContent />;
}
