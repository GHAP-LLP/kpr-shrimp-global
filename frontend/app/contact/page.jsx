import { buildMetadata } from '@/lib/metadata';
import ContactPageContent from '@/components/pages/ContactPageContent';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Indo Aquatic UK Ltd to discuss supply requirements, arrange samples, or find out more about our frozen prawn products.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactPageContent />;
}
