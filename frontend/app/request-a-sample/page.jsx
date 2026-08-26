import { buildMetadata } from '@/lib/metadata';
import RequestSampleContent from '@/components/pages/RequestSampleContent';

export const metadata = buildMetadata({
  title: 'Request a Sample',
  description: 'Request frozen prawn samples from Indo Aquatic. Tell us your sector and the products you want to assess — we\'ll arrange samples within 5 working days.',
  path: '/request-a-sample',
});

export default function RequestSamplePage() {
  return <RequestSampleContent />;
}
